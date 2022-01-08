const webhook = require("../../collections/webhook");
const query = require("../../config/query");
const logs = require("../../utility/logs");
const elementHandler = require("../../utility/elementHandler");
const constants = require("../../config/constants");
const common = require("../../utility/common");
const login = require("../../collections/login");
const checkSuccess = require("../../schemaValidate/check.success");
const app = require("../../collections/app");
const addContext = require("mochawesome/addContext");
const path = require("path");

beforeEach(function (done) {
    const token = common.searchOfEnv("login", "login", "token");

    login.check()
        .end((err, res) => {
            if (res.statusCode !== 200)
                logs.getApiResponse(res);

            elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
            elementHandler.toBeEqual(res.body.email_verified, constants.email_verified);
            elementHandler.schemaValidate(res.body, checkSuccess);
            elementHandler.toBeEqual(res.body.token, token);

            done();
        });
});


describe("Webhook incoming requests test case", () => {
    it("GET /webhooks/incomings", function (done) {
        let web_id = common.searchOfEnv("webhook", "webhook_creation", "id");

        webhook.incomeRequest(query.queryParam + "&id=" + web_id)
            .end((err, res) => {
                if (res.statusCode !== 200) {
                    logs.getApiResponse(res);
                }

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                let obj = res.body[0];
                //Set in env variable on pipeline run id 
                common.readOrWriteJsonFile("webhook", "incoming_request", "pipelineRunID", obj.status.application.pipeline.pipelineRunID);

                console.log("Webhook incoming request status: ", [obj.status.status]);
                console.log("Webhook incoming request message: ", [obj.status.message]);
                addContext(this, "Webhook incoming request status and message: " + [obj.status.status, obj.status.message])

                done();
            });
    });

    it("GET /app/pipelineruns", function (done) {
        let id = common.searchOfEnv("webhook", "incoming_request", "pipelineRunID");

        webhook.pipelinerun("?id=" + id)
            .end((err, res) => {
                if (res.statusCode !== 200) {
                    logs.getApiResponse(res);
                }

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.id === id) {
                        console.log("Webhook pipeline run triggerResourceKind and pipelineID: ", [obj.triggerResourceKind, obj.pipelineID]);

                        addContext(this, "Webhook pipeline run triggerResourceKind and pipelineID: " + [obj.triggerResourceKind, obj.id])
                    }
                }
                done();
            });
    });

    it("GET / pipelineruns", async () => {
        let id = common.searchOfEnv("webhook", "incoming_request", "pipelineRunID");

        let count = 1;
        const file = path.join(path.resolve(), "/resource/pipeline.json");

        for (let index = 0; index < count; index++) {
            await app.pipelineRun("/" + id)
                .then((res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    // Add delay time 5s
                    common.tryDelay(5000);
                    let status = res.body.tektonPipelineRun.object.status;

                    // get the pipeline start time
                    let flag = 1, startTime = "";
                    if (flag) {
                        startTime = status.startTime instanceof Date ? status.startTime : new Date(status.startTime);
                        flag = 0;
                    }

                    // Set running pipeline status response in json file
                    common.writeJsonFlie(file, status);

                    // get pipeline response in json file through
                    const pipelineResponse = common.readJsonFile(file);
                    const cTime = pipelineResponse.completionTime;

                    // set value param in completion time
                    const value = cTime ? cTime : null;
                    if (value) {
                        const completionTime = cTime instanceof Date ? cTime : new Date(cTime);
                        seconds = Math.abs(completionTime - startTime) / 1000;

                        console.log("StartTime: ", startTime);
                        console.log("CompletionTime: ", cTime);

                        console.log("Webhook pipeline completion time: ", seconds + "s");
                        console.log("Webhook pipeline status: ", pipelineResponse.conditions[0].reason);

                    } else {
                        count += 1;
                        console.log("Webhook pipeline still running.......");
                    }
                });
        }
    });
});