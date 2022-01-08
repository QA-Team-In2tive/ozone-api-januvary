const clusters = require("../../collections/clusters");
const logs = require("../../utility/logs");
const elementHandler = require("../../utility/elementHandler");
const addContext = require("mochawesome/addContext");
const common = require("../../utility/common");
const constants = require("../../config/constants");
const query = require("../../config/query");

describe("Cluster pods running status", () => {
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

                        console.log("Get cluster id and name: ", [obj.id, obj.name]);
                        addContext(this, "Get cluster id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it("LIST /kube/dynamicresources/namespaces", function (done) {
        const cluster_id = common.searchOfEnv("cluster", "cluster_details", "id");

        clusters.namespaces(query.queryParam + "&cluster_id=" + cluster_id)
            .end((err, res) => {
                if (err)
                    console.log(err);

                if (res.statusCode !== constants.STATUS_CODE_200) {
                    logs.getApiResponse(res);
                }

                elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toArray(res.body, "Get namespace response type should be array");

                for (const obj of res.body) {
                    if (obj.name == constants.NAMESPACE_NAME_1) {
                        elementHandler.toObject(obj, "Get namespace response type should be object")
                        elementHandler.toString(obj.id, "Get namespace id type should be string");
                        elementHandler.toString(obj.name, "Get namespace name type should be string");
                        elementHandler.toBeEqual(obj.name, constants.NAMESPACE_NAME_1);

                        common.readOrWriteJsonFile("cluster", "cluster_details", "ns_id", obj.id);

                        console.log("Get namespace id and name: ", [obj.id, obj.name]);
                        addContext(this, "Get namespace id and name: " + [obj.id, obj.name]);
                    }
                }
                done();
            });

        afterEach(function (done) {
            const ns_id = common.searchOfEnv("cluster", "cluster_details", "ns_id");

            clusters.namespaces("?id=" + ns_id)
                .end((err, res) => {
                    if (err)
                        console.log(err);

                    if (res.statusCode !== constants.STATUS_CODE_200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toArray(res.body, "Get namespace response type should be array");

                    for (const obj of res.body) {
                        if (obj.name == constants.NAMESPACE_NAME_1) {
                            elementHandler.toObject(obj, "Get namespace response type should be object")
                            elementHandler.toString(obj.id, "Get namespace id type should be string");
                            elementHandler.toString(obj.name, "Get namespace name type should be string");
                            elementHandler.toBeEqual(obj.name, constants.NAMESPACE_NAME_1);
                        }
                    }
                    done();
                });
        });
    });

    it("GET /kube/dynamicresources", function (done) {
        const cluster_id = common.searchOfEnv("cluster", "cluster_details", "id");
        const ns_id = common.searchOfEnv("cluster", "cluster_details", "ns_id");

        const value = "&cluster_id=" + cluster_id + "&group=&groupkind&kind=Pod&namespace=" + ns_id;
        clusters.dynamicSesources(query.queryParam + value)
            .end((err, res) => {
                if (err)
                    console.log(err);

                if (res.statusCode !== constants.STATUS_CODE_200) {
                    logs.putApiResponse(res);
                    addContext(this, logs.getApiResponse(res));
                }

                elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toArray(res.body, "Get resource response type should be array")

                for (let obj of res.body) {
                    if (obj.object.status.phase == constants.POD_STATUS) {
                        elementHandler.toString(obj.id, "Get pod id type should be string");
                        elementHandler.toString(obj.name, "Get pod name type should be string");
                        elementHandler.toBeEqual(obj.object.status.phase, constants.POD_STATUS);

                        console.log("Cluster pod: ", [obj.name, obj.object.status.phase]);
                    }
                }
                done();
            });
    });
});