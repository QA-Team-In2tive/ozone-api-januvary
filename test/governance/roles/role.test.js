const roles = require("../../../collections/roles");
const query = require("../../../config/query");
const logs = require("../../../utility/logs");
const elementHandler = require("../../../utility/elementHandler");
const addContext = require('mochawesome/addContext');
const constants = require("../../../config/constants");
const common = require("../../../utility/common");

describe('Role GET, POST and PUT test case', () => {
    describe('Create Role', () => {
        it('GET /role/permissions', function (done) {
            roles.getPermission(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let permission = common.randomList(res.body);

                    elementHandler.toArray(res.body);
                    elementHandler.toObject(permission);
                    elementHandler.toNumber(permission.id, "Permission id type should be number");
                    elementHandler.toString(permission.name, "Permission name type should be string");

                    common.readOrWriteJsonFile("governance", "role", "premission_id", permission.id);
                    common.readOrWriteJsonFile("governance", "role", "premission_name", permission.name);

                    console.log("Get all role persmission list after select a single role persmission id and name: ", [permission.id, permission.name]);
                    addContext(this, "Get all role persmission list after select a single role persmission id and name: " + [permission.id, permission.name]);

                    done();
                });
        });

        it('POST /role', function (done) {
            const param = {
                "permissions": [common.searchOfEnv("governance", "role", "premission_id")],
                "name": "role-" + common.getSmallCharStr(2),
                "description": "Create permission"
            }

            roles.post(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                        addContext(this, logs.postApiResponse(res));
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body);
                    elementHandler.toString(res.body.id, "Role id type should be string");
                    elementHandler.toString(res.body.name, "Role name type should be string");

                    common.readOrWriteJsonFile("governance", "role", "id", res.body.id);
                    common.readOrWriteJsonFile("governance", "role", "name", res.body.name);

                    console.log("Create role id and name: ", [res.body.id, res.body.description]);
                    addContext(this, "Create role id and name: " + [res.body.id, res.body.description]);

                    done();
                });
        });
    });

    describe('Edit Role', () => {
        it('GET /role', function (done) {
            const role_id = common.searchOfEnv("governance", "role", "id");
            roles.get("/" + role_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body);
                    elementHandler.toString(res.body.id, "Role id type should be string");
                    elementHandler.toString(res.body.name, "Role name type should be string");

                    if (res.body.id === role_id) {
                        elementHandler.toBeEqual(res.body.id, role_id);
                        console.log("Get role id and name: ", [res.body.id, res.body.name]);
                        addContext(this, "Get role id and name: " + [res.body.id, res.body.name]);
                    } else {
                        console.log("Get role id doesn't match");
                    }
                    done();
                });
        });

        it('PUT /role', function (done) {
            const role_id = common.searchOfEnv("governance", "role", "id");
            const name = common.searchOfEnv("governance", "role", "name");
            const param = {
                "id": role_id,
                "name": name,
                "description": "Update permission",
                "permissions": [common.searchOfEnv("governance", "role", "premission_id")]
            }

            roles.put(param, "/" + role_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.putApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body);
                    elementHandler.toString(res.body.id, "Role id type should be string");
                    elementHandler.toString(res.body.name, "Role name type should be string");

                    if (res.body.id === role_id) {
                        elementHandler.toBeEqual(res.body.name, name);
                        console.log("Edit role: ", [res.body.id, res.body.description]);
                        addContext(this, "Edit role: " + [res.body.id, res.body.description]);
                    }
                    done();
                });
        });
    });

    describe('Clone role', () => {
        it('Clone /role/clone', function (done) {
            const name = common.searchOfEnv("governance", "role", "name");
            const param = { "id": common.searchOfEnv("governance", "role", "id") }

            roles.clone(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body);
                    elementHandler.toString(res.body.id, "Role id type should be string");
                    elementHandler.toString(res.body.name, "Role name type should be string");
                    elementHandler.string(res.body.name, name);

                    console.log("Clone role id and name: ", [res.body.id, res.body.name]);
                    addContext(this, "Clone role id and name: " + [res.body.id, res.body.name]);
                    done();
                });
        });
    });
});