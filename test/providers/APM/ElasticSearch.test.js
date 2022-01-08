const login = require("../../../collections/login");
const providers = require("../../../collections/providers");
const constants = require("../../../config/constants");
const common = require("../../../utility/common");
const logs = require("../../../utility/logs");
const query = require("../../../config/query");
const elementHandler = require("../../../utility/elementHandler");
const checkSuccess = require("../../../schemaValidate/check.success")
const accessTypeSuccess = require("../../../schemaValidate/accesstype.success")
const addContext = require("mochawesome/addContext");
//const createProSuccess = require("../../../schemaValidate/provider.success");

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

const accessType = "Elastic Auth Credentials";

describe("Create ElasticSearch provider test case", () => {
    it("GET /provider/types", function (done) {
        providers.types(query.types)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);
                //console.log(res.body)
                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                // elementHandler.schemaValidate(res.body, typeSuccess);

                for (const obj of res.body) {
                    if (obj.name === constants.ES) {
                        // console.log("body: ", obj);

                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.ES);

                        //set provider type id and name in the env variable
                        common.readOrWriteJsonFile("provider", "provider_type", "id", obj.id);
                        common.readOrWriteJsonFile("provider", "provider_type", "name", obj.name);

                        console.log("ElasticSearch provider type id and name: ", [obj.id, obj.name]);
                        addContext(this, "ElasticSearch provider type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /provider/access_types", function (done) {
        const provider_type_id = "?provider_type_id=" + common.searchOfEnv("provider", "provider_type", "id");

        providers.accessType(query.queryParam + provider_type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                //console.log(res.body)

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, accessTypeSuccess);

                for (const obj of res.body) {
                    // console.log("obj", obj);
                    if (obj.name === accessType) {
                        // console.log("name", obj);
                        elementHandler.toBeEqual(obj.name, accessType);

                        //set access type id and name in env variable
                        // console.log("id", obj.id);
                        // console.log("name", obj.name);

                        common.readOrWriteJsonFile("provider", "access_type", "id", obj.id);
                        common.readOrWriteJsonFile("provider", "access_type", "name", obj.name);

                        console.log("ElasticSearch provider access type id and name: ", [obj.id, obj.name]);
                        addContext(this, "ElasticSearch provider access type id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("POST /provider", function (done) {
        const param = {
            "url": process.env.elasticsearch_url,
            "password": process.env.elasticsearch_password,
            "name": "elasticsearch" + common.getSmallCharStr(2),
            "user_name": process.env.elasticsearch_username,

        }

        providers.create()
            .send(param)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                //console.log("pramod", res.body);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                //elementHandler.schemaValidate(res.body, createProSuccess);

                // create provider id and name set in env file
                common.readOrWriteJsonFile("provider", "provider_details", "id", res.body.id);
                common.readOrWriteJsonFile("provider", "provider_details", "name", res.body.name);

                console.log("ElasticSearch provider creation id and name: ", [res.body.id, res.body.name]);
                addContext(this, "ElasticSearch provider creation id and name: " + [res.body.id, res.body.name]);

                done();
            });
    });
});