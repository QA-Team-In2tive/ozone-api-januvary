const clusters = require("../../collections/clusters");
const logs = require("../../utility/logs");
const elementHandler = require("../../utility/elementHandler");
const addContext = require("mochawesome/addContext");
const common = require("../../utility/common");
const constants = require("../../config/constants");
const query = require("../../config/query");
const path = require("path");

describe("Attach Cluster", () => {
    describe("Create Cluster", () => {
        it("GET /cluster/types", function (done) {
            clusters.clusterType(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== constants.STATUS_CODE_200) {
                        logs.getApiResponse(res);
                        addContext(this, logs.getApiResponse(res));
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toArray(res.body, "Cluster type response should be array");

                    for (const obj of res.body) {
                        if (obj.id == constants.CLUSTER_TYPE_ID) {
                            elementHandler.toNumber(obj.id, "Cluster type id should be number");
                            elementHandler.toString(obj.name, "Cluster type name should be string");

                            common.readOrWriteJsonFile("cluster", "cluster_type", "id", obj.id);
                            common.readOrWriteJsonFile("cluster", "cluster_type", "name", obj.name);

                            console.log("Cluster type id and name: ", [obj.id, obj.name]);
                            addContext(this, "Cluster type id and name: " + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it("POST /cluster/attach", function (done) {
            const name = "attach" + common.getSmallCharStr(2);
            const param = {
                "name": name,
                "cluster_type_id": common.searchOfEnv("cluster", "cluster_type", "id")
            }
            clusters.attachCluster(param)
                .end((err, res) => {
                    if (res.statusCode !== constants.STATUS_CODE_200) {
                        logs.postApiResponse(res);
                        addContext(this, logs.postApiResponse(res));
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body, "Attach cluster response type should be object");
                    elementHandler.toString(res.body.id, "Attach cluster id type should be string");
                    elementHandler.toString(res.body.name, "Attach cluster name type should be string");
                    elementHandler.toString(res.body.fileName, "Attach cluster fileName type should be string");

                    common.readOrWriteJsonFile("cluster", "attach_cluster", "id", res.body.id);
                    common.readOrWriteJsonFile("cluster", "attach_cluster", "name", res.body.name);
                    common.readOrWriteJsonFile("cluster", "attach_cluster", "content", res.body.content);
                    common.readOrWriteJsonFile("cluster", "attach_cluster", "fileName", res.body.fileName);

                    const file = path.join(path.resolve(), '/test/attachCluster/attach.yaml');
                    common.writeJsonKey(file, res.body.content);

                    console.log("Attach cluster id and name: ", [res.body.id, res.body.name]);
                    addContext(this, "Attach cluster id and name: " + [res.body.id, res.body.name]);

                    done();
                });
        });
    });
});