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

const accessType = "Ldap Config";

describe("Create LDAP provider test case", () => {
    it("GET /provider/types", function (done) {
        providers.types("?id=23")
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, typeSuccess);

                for (const obj of res.body) {
                    if (obj.name === constants.LDAP) {
                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.LDAP);

                        //set provider type id and name in the env variable
                        common.readOrWriteJsonFile("provider", "provider_type", "id", obj.id);
                        common.readOrWriteJsonFile("provider", "provider_type", "name", obj.name);

                        console.log("LDAP provider type id and name: ", [obj.id, obj.name]);
                        addContext(this, "LDAP provider type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /provider/access_types", function (done) {
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

                        console.log("LDAP access type id and name: ", [obj.id, obj.name]);
                        addContext(this, "LDAP access type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("POST /provider", function (done) {
        const param = {
            "name": "ldap-" + common.getRandomString(2),
            "bind_password": process.env.ldap_password,
            "url": process.env.ldap_url,
            "bind_dn": process.env.ldap_username,
            "user_query_attr": process.env.user_query_attr,
            "group_query_attr": process.env.group_query_attr,
            "base_dn": process.env.base_dn,
            "bind_dn": process.env.bind_dn
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

                    console.log("LDAP create provider id and name: ", [res.body.id, res.body.name]);
                    addContext(this, "LDAP create provider id and name: " + [res.body.id, res.body.name]);
                }
                done();
            });
    });
});
