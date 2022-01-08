const ldapGroup = require("../../../collections/ldapGroup");
const roles = require("../../../collections/roles");
const query = require("../../../config/query");
const logs = require("../../../utility/logs");
const elementHandler = require("../../../utility/elementHandler");
const addContext = require('mochawesome/addContext');
const constants = require("../../../config/constants");
const common = require("../../../utility/common");

describe('Ldap Group GET, POST and PUT test case', () => {
    describe('Create LdapGroup', () => {
        it('GET /ldap_groups/groups', function (done) {
            ldapGroup.groups(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                        addContext(this, res.body.message);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toArray(res.body, "Member response should be array.");

                    let group = common.randomList(res.body);
                    elementHandler.toObject(group, "Group response should be object.");
                    elementHandler.toNumber(group.id, "Group id type should be number.");
                    elementHandler.toString(group.name, "Group name type should be string.");

                    common.readOrWriteJsonFile("governance", "ldap_group", "group_id", group.id);
                    common.readOrWriteJsonFile("governance", "ldap_group", "group_name", group.name);

                    console.log("Get ldap group id and name: ", [group.id, group.name]);
                    addContext(this, "Get ldap group id and name: " + [group.id, group.name]);

                    done();
                });
        });

        it('GET /role', function (done) {
            roles.get(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let role = common.randomList(res.body);
                    elementHandler.toObject(role, "Role response should be object.");
                    elementHandler.toString(role.id, "Role id type should be string.");
                    elementHandler.toString(role.name, "Role name type should be string.");

                    common.readOrWriteJsonFile("governance", "ldap_group", "role_id", role.id);
                    common.readOrWriteJsonFile("governance", "ldap_group", "role_name", role.name);

                    console.log("Get role id and name: ", [role.id, role.name]);
                    addContext(this, "Get role id and name: " + [role.id, role.name]);

                    done();
                });
        });

        it('POST /ldap_groups', function (done) {
            const name = common.searchOfEnv("governance", "ldap_group", "group_name");
            const param = {
                "name": name,
                "roles": [common.searchOfEnv("governance", "ldap_group", "role_id")]
            }

            ldapGroup.post(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                        addContext(this, res.body.message);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body, "Ldap group response should be object.");
                    elementHandler.toString(res.body.id, "Ldap group id type should be string.");
                    elementHandler.toString(res.body.name, "Ldap group name type should be string.");

                    if (res.body.name === name) {
                        common.readOrWriteJsonFile("governance", "ldap_group", "id", res.body.id);
                        common.readOrWriteJsonFile("governance", "ldap_group", "name", res.body.name);

                        console.log("Create ldap group id and name: ", [res.body.id, res.body.name]);
                        addContext(this, "Create ldap group id and name: " + [res.body.id, res.body.name]);
                    }
                    done();
                });
        });
    });

    describe('Edit LdapGroup', () => {
        it('GET /ldap_groups', function (done) {
            let ldap_group_id = common.searchOfEnv("governance", "ldap_group", "id");

            ldapGroup.get("/" + ldap_group_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                        addContext(this, res.body.message);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    if (res.body.id === ldap_group_id) {
                        elementHandler.toObject(res.body, "Ldap group response should be object.");
                        elementHandler.toString(res.body.id, "Ldap group id type should be string.");
                        elementHandler.toString(res.body.name, "Ldap group name type should be string.");
                        elementHandler.toBeEqual(res.body.id, ldap_group_id);

                        console.log("Get adap group id and name: ", [res.body.id, res.body.name]);
                        addContext(this, "Get ldap group id and name: " + [res.body.id, res.body.name]);
                    } else {
                        console.log("Ldap group id doesn't match");
                    }
                    done();
                });
        });

        it('PUT /ldap_groups', function (done) {
            let ldap_group_id = common.searchOfEnv("governance", "ldap_group", "id");

            const name = common.searchOfEnv("governance", "ldap_group", "group_name");
            const param = {
                "id": ldap_group_id,
                "name": name,
                "roles": []
            }


            ldapGroup.put(param, "/" + ldap_group_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.putApiResponse(res);
                        addContext(this, res.body.message);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    if (res.body.id === ldap_group_id) {
                        elementHandler.toObject(res.body, "Ldap group response should be object.");
                        elementHandler.toString(res.body.id, "Ldap group id type should be string.");
                        elementHandler.toString(res.body.name, "Ldap group name type should be string.");
                        elementHandler.string(res.body.name, name);
                        console.log("Edit ldap group: ", [res.body.id, res.body.name]);
                        addContext(this, "Edit ldap group: " + [res.body.id, res.body.name]);
                    }
                    done();
                });
        });
    });
});