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

describe("Generic release webhook test case", () => {
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

                        console.log("Generic release webhook type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic release webhook type id and name: " + [obj.id, obj.name]);
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

                        console.log("Generic release webhook action type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic release webhook action type id and name: " + [obj.id, obj.name]);
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
                        console.log("Generic release webhook app id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic release webhook app id and name: " + [obj.id, obj.name]);
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
                    if (obj.name === constants.RELEASE_APP_TYPE) {
                        common.readOrWriteJsonFile("webhook", "triggerType", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "triggerType", "name", obj.name);

                        console.log("Generic release webhook trigger type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic release webhook trigger type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /app/releases", function (done) {
        const app_id = common.searchOfEnv("app", "custom_app", "id");
        const name = common.searchOfEnv("release", "release_creation", "name");

        webhook.release(query.queryParam + "&application_id=" + app_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === name) {
                        elementHandler.toBeEqual(obj.name, name);
                        console.log("Generic release webhook release id and name: ", [obj.id, obj.name]);
                        addContext(this, "Generic release webhook release id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("POST /webhooks", function (done) {
        webhook.webhooks(param.genericRelease())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                common.readOrWriteJsonFile("webhook", "webhook_creation", "id", res.body.id);
                common.readOrWriteJsonFile("webhook", "webhook_creation", "name", res.body.name);

                console.log("Generic release webhook creation id and name: ", [res.body.id, res.body.name]);
                addContext(this, "Generic release webhook creation id and name: " + [res.body.id, res.body.name]);

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

                    console.log("Generic release webhook post request url: ", id[1]);
                    addContext(this, "Generic release webhook post request url: " + id[1]);
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

                console.log("Generic release webhook post request url response: " + res.body.message);
                addContext(this, "Generic release webhook post request url response: " + res.body.message);
                done();
            });
    });
});