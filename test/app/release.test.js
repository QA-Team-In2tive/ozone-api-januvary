const constants = require("../../config/constants");
const common = require("../../utility/common");
const logs = require("../../utility/logs");
const param = require("../../paramaters/param");
const elementHandler = require("../../utility/elementHandler");
const login = require("../../collections/login");
const app = require("../../collections/app");
const query = require("../../config/query");
const checkSuccess = require("../../schemaValidate/check.success");
const addContext = require("mochawesome/addContext");
const webhook = require("../../collections/webhook");

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

describe("Release custom app test case", () => {
    it("GET /app/releasesteptypes", function (done) {
        app.releaseStapType(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === "Pipeline") {
                        common.readOrWriteJsonFile("release", "step", "id", obj.id);
                        common.readOrWriteJsonFile("release", "step", "name", obj.name);

                        console.log("Release stap type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Release stap type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /app/pipelines", function (done) {
        const app_id = common.searchOfEnv("app", "custom_app", "id");

        webhook.pipelines(query.queryParam + "&application_id=" + app_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                let id = res.body[0].id;
                let name = res.body[0].name;

                common.readOrWriteJsonFile("release", "pipeline", "id", id);
                common.readOrWriteJsonFile("release", "pipeline", "name", name);

                console.log("Release pipeline id and name: ", [id, name]);
                addContext(this, "Release pipeline id and name: " + [id, name]);

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

                        common.readOrWriteJsonFile("app", "env", "id", obj.id);
                        common.readOrWriteJsonFile("app", "env", "name", obj.name);

                        console.log("Release env id and name: ", [obj.id, obj.name]);
                        addContext(this, "Release env id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET / cluster", function (done) {
        const env_id = common.searchOfEnv("app", "env", "id");

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

                        console.log("Release cluster id and name: ", [obj.id, obj.name]);
                        addContext(this, "Release cluster id and name: " + [obj.id, obj.name]);
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

                common.readOrWriteJsonFile("app", "branch", "id", id);
                common.readOrWriteJsonFile("app", "branch", "name", name);

                console.log("Release branch id and name: ", [id, name]);
                addContext(this, "Release branch id and name: " + [id, name]);

                done();
            });
    });

    it("POST /app/releases", function (done) {
        app.createRelease(param.release())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                common.readOrWriteJsonFile("release", "release_creation", "id", res.body.id);
                common.readOrWriteJsonFile("release", "release_creation", "name", res.body.name);

                console.log("Custom release creation id and name: ", [res.body.id, res.body.name]);
                addContext(this, "Custom release creation id and name: " + [res.body.id, res.body.name]);

                done();
            });
    });
});