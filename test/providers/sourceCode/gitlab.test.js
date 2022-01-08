const login = require("../../../collections/login");
const providers = require("../../../collections/providers");
const constants = require("../../../config/constants");
const common = require("../../../utility/common");
const logs = require("../../../utility/logs");
const query = require("../../../config/query");
const elementHandler = require("../../../utility/elementHandler");
const checkSuccess = require("../../../schemaValidate/check.success");
const typeSuccess = require("../../../schemaValidate/type.success");
const accessTypeSuccess = require("../../../schemaValidate/accesstype.success");
const createProSuccess = require("../../../schemaValidate/create.success");
const workerSuccess = require("../../../schemaValidate/worker.success");
const loggingSuccess = require("../../../schemaValidate/logging.success");
const addContext = require("mochawesome/addContext");
const { queryParam } = require("../../../config/query");

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

const accessType = "Gitlab Token";

describe("Create Gitlab provider test case", () => {
    it("GET / provider/types", function (done) {
        providers.types("?id=6")
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, typeSuccess);

                for (const obj of res.body) {
                    if (obj.name === constants.GL) {
                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.GL);

                        //set provider type id and name in the env variable
                        common.readOrWriteJsonFile("provider", "provider_type", "id", obj.id);
                        common.readOrWriteJsonFile("provider", "provider_type", "name", obj.name);

                        console.log("Gitlab provider type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Gitlab provider type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET / provider/access_types", function (done) {
        const provider_type_id = "?provider_type_id=" + common.searchOfEnv("provider", "provider_type", "id");

        providers.accessType(provider_type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, accessTypeSuccess);

                for (const obj of res.body) {
                    if (obj.name === accessType) {
                        elementHandler.toBeEqual(obj.name, accessType);

                        //set access type id and name in env variable
                        common.readOrWriteJsonFile("provider", "access_type", "id", obj.id);
                        common.readOrWriteJsonFile("provider", "access_type", "name", obj.name);

                        console.log("Gitlab access type id and name: ", [obj.id, obj.name]);
                        addContext(this, "Gitlab access type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET / repo/orgs", function (done) {
        const pro_id = common.searchOfEnv("provider", "provider_type", "id");
        const query =
            '&password=' + process.env.token_gitlab +
            '&provider_type_id=' + pro_id +
            '&user_name=' + process.env.user_gitlab;

        providers.orgs(queryParam + query)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.ORGSLAB) {
                        common.readOrWriteJsonFile("provider", "orgs", "id", obj.id);
                        common.readOrWriteJsonFile("provider", "orgs", "name", obj.name);
                        common.readOrWriteJsonFile("provider", "orgs", "org_img_url", obj.org_img_url);

                        console.log("Gitlab orgs name and url: ", [obj.id, obj.name, obj.org_img_url]);
                        addContext(this, "Gitlab orgs name and url: " + [obj.id, obj.name, obj.org_img_url]);
                    }
                }
                done();
            });
    });

    it("POST / provider", function (done) {
        const param = {
            "name": "gitlab-" + common.getRandomString(2),
            "user_name": process.env.user_gitlab,
            "password": process.env.token_gitlab,
            "vcs_org_ids": [common.searchOfEnv("provider", "orgs", "id")],
            "sync_user_repos": true,
            "self_hosted": false,
            "url": null,
        }

        providers.create()
            .send(param)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log("response body: ", res.body);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, createProSuccess);

                    // create provider id and name set in env file
                    common.readOrWriteJsonFile("provider", "provider_details", "id", res.body.id);
                    common.readOrWriteJsonFile("provider", "provider_details", "name", res.body.name);

                    console.log("Gitlab create provider id and name: ", [res.body.id, res.body.name]);
                    addContext(this, "Gitlab create provider id and name: " + [res.body.id, res.body.name]);
                }
                done();
            });
    });

    describe('Sync provider test case', () => {
        it('POST / provider/sync', function (done) {
            providers.sync()
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, 'published');

                    console.log('Sync provider: ', [res.body.message]);
                    addContext(this, 'Sync provider: ' + res.body.message);

                    done();
                });
        });
    });

    describe('Sync logs provider test case', () => {
        it('GET / worker_requests', function () {
            const pro_id = common.searchOfEnv('provider', 'provider_details', 'id');

            return providers.worker(query.worker + pro_id)
                .then((res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, workerSuccess);

                    for (var i = 0; i < res.body.length; i++) {
                        if (i === 0) {
                            list = res.body[i];

                            elementHandler.toBeEqual(list.provider_id, pro_id);
                            common.readOrWriteJsonFile('provider', 'worker_requests', 'logs_id', list.id)

                            return;
                        }
                    }
                });
        });

        it('GET / worker_request', function (done) {
            const log_id = common.searchOfEnv('provider', 'worker_requests', 'logs_id');

            providers.worker('/' + log_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    if (res.body.id === log_id) {
                        elementHandler.toBeEqual(res.body.id, log_id);

                        console.log('Worker requests id: ', [res.body.id]);
                        addContext(this, 'Worker requests id: ' + res.body.id);
                    }

                    done();
                });
        });

        it('GET / logging', function (done) {
            const log_id = common.searchOfEnv('provider', 'worker_requests', 'logs_id');

            providers.logging(log_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, loggingSuccess);

                    common.tryDelay(5000);
                    for (const obj of res.body) {
                        if (obj.id === log_id) {
                            elementHandler.toBeEqual(obj.id, log_id);

                            console.log('Logging id and status: ', [obj.id, obj.status]);
                            addContext(this, 'Logging id and status: ' + [obj.id, obj.status]);
                        }
                    }
                    done();
                });
        });
    });
});