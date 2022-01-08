const webhook = require("../../collections/webhook");
const query = require("../../config/query");
const logs = require("../../utility/logs");
const elementHandler = require("../../utility/elementHandler");
const constants = require("../../config/constants");
const common = require("../../utility/common");
const login = require("../../collections/login");
const checkSuccess = require("../../schemaValidate/check.success");
const app = require("../../collections/app");
const param = require("../../paramaters/param");
const addContext = require("mochawesome/addContext");
const config = require("../../config/config");
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

describe("Generic pipeline webhook test case", () => {
    it("GET /webhooks/types", function (done) {
        webhook.types(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.GENERIC_TYPE_NAME) {
                        common.readOrWriteJsonFile("webhook", "type", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "type", "name", obj.name);

                        console.log("Generic pipeline webhook type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic pipeline webhook type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /webhooks/actiontypes", function (done) {
        const type_id = common.searchOfEnv("webhook", "type", "id");

        webhook.actionTypes(query.queryParam + "&webhook_type_id=" + type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.ACTION_TYPE) {
                        common.readOrWriteJsonFile("webhook", "actiontype", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "actiontype", "name", obj.name);

                        console.log("Generic pipeline webhook action type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic pipeline webhook action type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /app", function (done) {
        const app_id = common.searchOfEnv("app", "custom_app", "id");

        app.get("?id=" + app_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.id === app_id) {
                        console.log("Generic pipeline webhook app id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic pipeline webhook app id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /webhooks/apptypes", function (done) {
        webhook.appTypes(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.PIPELINE_APP_TYPE) {
                        common.readOrWriteJsonFile("webhook", "triggerType", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "triggerType", "name", obj.name);

                        console.log("Generic pipeline webhook trigger type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic pipeline webhook trigger type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /app/pipelines", function (done) {
        const app_id = common.searchOfEnv("app", "custom_app", "id");

        webhook.pipelines(query.queryParam + "&application_id=" + app_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                common.readOrWriteJsonFile("webhook", "pipeline", "id", res.body[0].id);
                common.readOrWriteJsonFile("webhook", "pipeline", "name", res.body[0].name);

                console.log("Generic pipeline webhook pipeline id and name: ", [res.body[0].id, res.body[0].name]);
                addContext(this, "Generic pipeline webhook pipeline id and name: " + [res.body[0].id, res.body[0].name]);

                done();
            });
    })

    it("GET /app/env", function (done) {
        const id = common.searchOfEnv("app", "custom_app", "env_id");

        webhook.env("?id=" + id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.id === id) {
                        elementHandler.toBeEqual(obj.id, id);

                        console.log("Generic pipeline webhook env id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic pipeline webhook env id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET / cluster", function (done) {
        const env_id = common.searchOfEnv("app", "custom_app", "env_id");

        app.cluster(query.queryParam + "&env_id=" + env_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body))
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.CLUSTER_NAME) {
                        elementHandler.toBeEqual(obj.name, constants.CLUSTER_NAME);
                        common.readOrWriteJsonFile("app", "cluster", "id", obj.id);
                        common.readOrWriteJsonFile("app", "cluster", "name", obj.name);

                        console.log("Generic pipeline webhook cluster id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic pipeline webhook cluster id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /repository/branches", function (done) {
        const id = common.searchOfEnv("app", "custom_app", "repository_id");

        app.branchs(query.queryParam + "&repository_id=" + id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                let id = res.body[0].id;
                let name = res.body[0].name;

                console.log("Generic pipeline webhook branch id and name: ", [id, name]);
                addContext(this, "Generic pipeline webhook branch id and name: " + [id, name]);

                done();
            });
    });

    it("POST /webhooks", function (done) {
        webhook.webhooks(param.genericPipeline())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                common.readOrWriteJsonFile("webhook", "webhook_creation", "id", res.body.id);
                common.readOrWriteJsonFile("webhook", "webhook_creation", "name", res.body.name);

                console.log("Generic pipeline webhook creation id and name: ", [res.body.id, res.body.name]);
                addContext(this, "Generic pipeline webhook creation id and name: " + [res.body.id, res.body.name]);

                done();
            });
    });

    it("GET /webhooks", function (done) {
        const id = common.searchOfEnv("webhook", "webhook_creation", "id");

        webhook.get("/" + id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                if (id === res.body.id) {
                    let id = res.body.example.url.split("POST request to : " + config.baseUrl + "/api/webhooks");
                    common.readOrWriteJsonFile("webhook", "webhook_creation", "post_request", id[1]);

                    console.log("Generic pipeline webhook post request url: ", id[1]);
                    addContext(this, "Generic pipeline webhook post request url: " + id[1]);
                }
                done();
            });
    });

    it("POST /request to", function (done) {
        const url = common.searchOfEnv("webhook", "webhook_creation", "post_request");

        webhook.webhookRequest(url, param.overrideParam())
            .end((err, res) => {

                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                console.log("Reponse: ", res.body.message);
                addContext(this, "Webhook post request url response: " + res.body.message);
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
});