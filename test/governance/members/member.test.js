const members = require("../../../collections/members");
const roles = require("../../../collections/roles");
const query = require("../../../config/query");
const logs = require("../../../utility/logs");
const elementHandler = require("../../../utility/elementHandler");
const addContext = require('mochawesome/addContext');
const constants = require("../../../config/constants");
const common = require("../../../utility/common");

describe('Member GET, PUT And DELETE test case', () => {
    describe('Add Member To Project', () => {
        it('GET /member/allmembers', function (done) {
            members.allmembers(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let obj = common.randomList(res.body);
                    elementHandler.toObject(obj, "Member response should be object.");
                    elementHandler.toNumber(obj.id, "Member id type should be number.");
                    elementHandler.toString(obj.name, "Member name type should be string.");

                    common.readOrWriteJsonFile("governance", "member", "id", obj.id);
                    common.readOrWriteJsonFile("governance", "member", "name", obj.name);

                    console.log("Get all member list after select single member id and name: ", [obj.id, obj.name]);
                    addContext(this, "Get all member list after select single member id and name: " + [obj.id, obj.name]);

                    done();
                });
        });

        it('GET /member/memberworkspace', function (done) {
            const param = { "id": common.searchOfEnv("governance", "member", "id") }

            members.postMemberWorkspace(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    elementHandler.toString(res.body.message, "Member message type should be string.");
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log("Add member to project message: ", [res.body.message]);
                    addContext(this, "Add member to project message: " + [res.body.message]);

                    done();
                });
        });
    });

    describe('Edit Member', () => {
        it('GET /member', function (done) {
            const member_id = common.searchOfEnv("governance", "member", "id");
            const member_name = common.searchOfEnv("governance", "member", "name");

            members.get("/" + member_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                        addContext(this, logs.getApiResponse(res));
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    if (res.body.id === member_id) {
                        elementHandler.toObject(res.body, "Member response should be object.");
                        elementHandler.toNumber(res.body.id, "Member id type should be number.");
                        elementHandler.toString(res.body.name, "Member name type should be string.");
                        elementHandler.toBeEqual(res.body.name, member_name);

                        console.log("Get member id and name: ", [res.body.id, res.body.name]);
                        addContext(this, "Get member id and name: " + [res.body.id, res.body.name]);
                    } else {
                        console.log("Get member id doesn't match");
                    }

                    done();
                });
        });

        it('GET /role', function (done) {
            roles.get(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                        addContext(this, logs.getApiResponse(res));
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let obj = common.randomList(res.body);

                    elementHandler.toArray(res.body);
                    elementHandler.toObject(obj, "Role response should be object.");
                    elementHandler.toString(obj.id, "Role id type should be string.");
                    elementHandler.toString(obj.name, "Role name type should be string.");

                    common.readOrWriteJsonFile("governance", "member", "role_id", obj.id);

                    console.log("Get role id and name: ", [obj.id, obj.name]);
                    addContext(this, "Get role id and name: " + [obj.id, obj.name]);

                    done();
                });
        });

        it('PUT /member', function (done) {
            const member_id = common.searchOfEnv("governance", "member", "id");

            const param = {
                "id": member_id,
                "name": common.searchOfEnv("governance", "member", "name"),
                "admin": true,
                "roles": [common.searchOfEnv("governance", "member", "role_id")]
            }

            const member_name = common.searchOfEnv("governance", "member", "name");
            members.put(param, "/" + member_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.putApiResponse(res);
                        addContext(this, logs.getApiResponse(res));
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    if (res.body.id === member_id) {
                        elementHandler.toObject(res.body, "Member response should be object.");
                        elementHandler.toNumber(res.body.id, "Member id type should be number.");
                        elementHandler.toString(res.body.name, "Member name type should be string.");
                        elementHandler.toBeEqual(res.body.name, member_name);

                        console.log("Edit member: ", [res.body.id, res.body.name]);
                        addContext(this, "Edit member: " + [res.body.id, res.body.name]);
                    }
                    done();
                });
        });
    });

    describe('Delete Member', () => {
        it('DELETE /member/memberworkspace', function (done) {
            const param = { "id": common.searchOfEnv("governance", "member", "id") }

            members.deleteMemberWorkspace()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.deleteApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toString(res.body.message, "Member message type should be string.");
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log("Remove from project message: ", [res.body.message]);
                    addContext(this, "Remove from project message: " + [res.body.message]);

                    done();
                });
        });
    });
});