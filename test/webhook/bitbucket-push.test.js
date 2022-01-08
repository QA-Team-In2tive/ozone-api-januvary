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

describe("Bitbucket push webhook test case", () => {
    it("GET /webhooks/types", function (done) {
        webhook.types(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.BIT_TYPE_NAME) {
                        common.readOrWriteJsonFile("webhook", "type", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "type", "name", obj.name);

                        console.log("Bitbucket webhook type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /repository", function (done) {
        webhook.repository(query.queryParam + "&repository_type_id=2")
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.BIT_REPO_NAME) {
                        common.readOrWriteJsonFile("webhook", "repository", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "repository", "name", obj.name);

                        console.log("Bitbucket webhook repository id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook repository id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /webhooks/bitbucketeventtypes", function (done) {
        webhook.bitbucketEventTypes(query.queryParam + "&repository_type_id=2")
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.PUSH) {
                        common.readOrWriteJsonFile("webhook", "event_type", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "event_type", "name", obj.name);

                        console.log("Bitbucket webhook repository push id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook repository push id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    })

    it("GET /repository/branches", function (done) {
        const id = common.searchOfEnv("webhook", "repository", "id");

        webhook.branch(query.queryParam + "&repository_id=" + id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.BIT_BRANCH_NAME) {
                        common.readOrWriteJsonFile("webhook", "branch", "id", obj.id);
                        common.readOrWriteJsonFile("webhook", "branch", "name", obj.name);

                        console.log("Bitbucket webhook repository branch id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook repository branch id and name: " + [obj.id, obj.name]);
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

                        console.log("Bitbucket webhook action type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook action type id and name: " + [obj.id, obj.name]);
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
                        console.log("Bitbucket webhook app id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook app id and name: " + [obj.id, obj.name]);
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

                        console.log("Bitbucket webhook trigger type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook trigger type id and name: " + [obj.id, obj.name]);
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

                let id = res.body[2].id;
                let name = res.body[2].name;

                common.readOrWriteJsonFile("webhook", "pipeline", "id", id);
                common.readOrWriteJsonFile("webhook", "pipeline", "name", name);

                console.log("Bitbucket webhook pipeline id and name: ", [id, name]);
                addContext(this, "Bitbucket webhook pipeline id and name: " + [id, name]);

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

                        console.log("Bitbucket webhook env id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook env id and name: " + [obj.id, obj.name]);
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

                        console.log("Bitbucket webhook cluster id and name: ", [obj.id, obj.name]);
                        addContext(this, "Bitbucket webhook cluster id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });webhook
    });

    it("POST /webhooks", function (done) {
        webhook.webhooks(param.bitbucketPush())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                common.readOrWriteJsonFile("webhook", "webhook_creation", "id", res.body.id);
                common.readOrWriteJsonFile("webhook", "webhook_creation", "name", res.body.name);

                console.log("Bitbucket webhook creation id and name: ", [res.body.id, res.body.name]);
                addContext(this, "Bitbucket webhook creation id and name: " + [res.body.id, res.body.name]);

                done();
            });
    });
});