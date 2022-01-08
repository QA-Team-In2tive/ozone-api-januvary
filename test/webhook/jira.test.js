const webhook = require("../../collections/webhook");
const query = require("../../config/query");
const logs = require("../../utility/logs");
const elementHandler = require("../../utility/elementHandler");
const constants = require("../../config/constants");
const common = require("../../utility/common");
const login = require("../../collections/login");
const checkSuccess = require("../../schemaValidate/check.success");
const param = require("../../paramaters/param");
const addContext = require("mochawesome/addContext");
const providers = require("../../collections/providers");


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

describe("Jira webhook test case", () => {
    it("GET /webhooks/types", function (done) {
        webhook.types(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.JIRA_WEBHOOK) {
                        common.readOrWriteJsonFile("webhook", "type", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "type", "name", obj.name);

                        console.log("Jira pipeline webhook type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Jira pipeline webhook type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /provider", function (done) {
        const pro_type_id = common.searchOfEnv("provider", "provider_type", "id");

        providers.get(query.queryParam + "&provider_type_id=" + pro_type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.provider_type_id === pro_type_id) {
                        console.log("Jira pipeline webhook provider id and name: ", [obj.id, obj.name]);
                        addContext(this, "Jira pipeline webhook provider id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /webhooks/actiontypes", function (done) {
        const type_id = common.searchOfEnv("webhook", "type", "id");

        webhook.actionTypes(query.queryParam + "&webhook_type_id=" + type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.JIRA_ACTION_TYPE) {
                        common.readOrWriteJsonFile("webhook", "actiontype", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "actiontype", "name", obj.name);

                        console.log("Jira pipeline webhook action type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Jira pipeline webhook action type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /jira/projects", function (done) {
        const pro_id = common.searchOfEnv("provider", "provider_details", "id");

        webhook.project(query.queryParam + "&provider_id=" + pro_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                let id = res.body[0].id;
                let name = res.body[0].name;

                common.readOrWriteJsonFile("webhook", "jira_project", "id", id);
                common.readOrWriteJsonFile("webhook", "jira_project", "name", name);

                console.log("Jira webhook app id and name: ", [id, name]);
                addContext(this, "Jira webhook app id and name: " + [id, name]);

                done();
            });
    });

    it("POST /webhooks", function (done) {
        webhook.webhooks(param.jiraWebhook())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                common.readOrWriteJsonFile("webhook", "webhook_creation", "id", res.body.id);
                common.readOrWriteJsonFile("webhook", "webhook_creation", "name", res.body.name);

                console.log("Jira pipeline webhook creation id and name: ", [res.body.id, res.body.name]);
                addContext(this, "Jira pipeline webhook creation id and name: " + [res.body.id, res.body.name]);

                done();
            });
    });
});