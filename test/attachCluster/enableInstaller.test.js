const clusters = require("../../collections/clusters");
const logs = require("../../utility/logs");
const elementHandler = require("../../utility/elementHandler");
const addContext = require("mochawesome/addContext");
const common = require("../../utility/common");
const constants = require("../../config/constants");
const query = require("../../config/query");
const param = require("../../paramaters/param");
const env = require("../../collections/deploymentConfig");

describe("Edit cluster and enable installer", () => {
    it("GET /cluster", function (done) {
        const cluster_name = common.searchOfEnv("cluster", "attach_cluster", "name");
        clusters.get(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== constants.STATUS_CODE_200) {
                    logs.getApiResponse(res);
                    addContext(this, "Response: " + [res.body]);
                }

                elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toArray(res.body, "Get cluster response type should be array");

                for (const obj of res.body) {
                    if (obj.name == cluster_name) {
                        elementHandler.toObject(obj, "Get cluster response type should be object")
                        elementHandler.toString(obj.id, "Get cluster id type should be string");
                        elementHandler.toString(obj.name, "Get cluster name type should be string");
                        elementHandler.toBeEqual(obj.name, cluster_name);

                        common.readOrWriteJsonFile("cluster", "cluster_details", "id", obj.id);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "account_id", obj.account_id);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "name", obj.name);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "provider_id", obj.provider_id);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "endpoint", obj.endpoint);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "status", obj.status);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "version", obj.version);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "region_id", obj.region_id);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "node_type", obj.node_type);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "vpc_id", obj.vpc_id);
                        common.readOrWriteJsonFile("cluster", "cluster_details", "auth_token", obj.auth.token);

                        console.log("Get cluster id and name: ", [obj.id, obj.name]);
                        addContext(this, "Get cluster id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("GET /env", function (done) {
        env.getEnv(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== constants.STATUS_CODE_200) {
                    logs.getApiResponse(res);
                    addContext(this, "Response: " + [res.body]);
                }

                elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toArray(res.body, "Get env response type should be array");

                for (const obj of res.body) {
                    if (obj.name == constants.ENV_NAME) {
                        elementHandler.toObject(obj, "Get env response type should be object")
                        elementHandler.toString(obj.id, "Get env id type should be string");
                        elementHandler.toString(obj.name, "Get env name type should be string");
                        elementHandler.toBeEqual(obj.name, constants.ENV_NAME);

                        common.readOrWriteJsonFile("cluster", "cluster_details", "env_id", obj.id);

                        console.log("Get env id and name: ", [obj.id, obj.name]);
                        addContext(this, "Get env id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("PUT /cluster", function (done) {
        const cluster_id = common.searchOfEnv("cluster", "cluster_details", "id");
        clusters.put("/" + cluster_id, param.updateCluster())
            .end((err, res) => {
                if (res.statusCode !== constants.STATUS_CODE_200) {
                    logs.putApiResponse(res);
                    addContext(this, "Response: " + [res.body]);
                }

                let obj = res.body;
                elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toObject(obj, "Get cluster response type should be object")

                common.tryDelay(10000);

                if (obj.id == cluster_id) {
                    elementHandler.toBeEqual(obj.id, cluster_id);
                    elementHandler.toString(obj.id, "Get cluster id type should be string");
                    elementHandler.toString(obj.name, "Get cluster name type should be string");

                    console.log("Cluster InstalledResources: ", [obj.installedResources]);
                    addContext(this, "Cluster InstalledResources: " + [obj.installedResources]);
                }
                done();
            });
    });
});