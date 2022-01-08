const login = require("../../../collections/login");
const elementHandler = require("../../../utility/elementHandler");
const logs = require("../../../utility/logs");
const clusters = require("../../../collections/clusters");
const addContext = require("mochawesome/addContext");
const common = require("../../../utility/common");
const constants = require("../../../config/constants");
const query = require("../../../config/query");
const checkSuccess = require("../../../schemaValidate/check.success");

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

describe("Cluster GET and DELETE test case", () => {
    describe("Get Cluster", () => {
        it("List /cluster", function (done) {
            clusters.get(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    common.readOrWriteJsonFile("cluster", "get_cluster", "id", res.body[0].id);

                    console.log("Get cluster id: ", [res.body[0].id]);
                    addContext(this, "Get cluster id: " + [res.body[0].id])
                    done();
                });
        });

        it("GET /cluster", function (done) {
            const id = common.searchOfEnv("cluster", "get_cluster", "id");

            clusters.get("/" + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.id, id);

                    console.log("Get cluster id and name: ", [res.body.id, res.body.name]);
                    addContext(this, "Get cluster id and name: " + [res.body.id, res.body.name]);
                    done();
                });
        });
    });

    describe("Delete Cluster", () => {
        const param = { "id": common.searchOfEnv("cluster", "get_cluster", "id") }

        it("DELETE /cluster/clusterworkspace", function (done) {
            clusters.deleteClusterWorkspace()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.deleteApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log("Delete cluster message: ", [res.body.message]);
                    addContext(this, "Delete cluster message: " + [res.body.message]);
                    done();
                });
        });
    });

    describe("Add Clsuter To Project", () => {
        const cluster_id = common.searchOfEnv("cluster", "get_cluster", "id");

        it("GET /cluster/allclusters", function (done) {
            clusters.allclusters(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === cluster_id) {
                            console.log("All cluster list id and name: ", [obj.id, obj.name]);
                            addContext(this, "All cluster list id and name: " + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        const param = { "id": common.searchOfEnv("cluster", "get_cluster", "id") }

        it("POST /cluster/clusterworkspace", function (done) {
            clusters.postClusterWorkspace(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log("Add cluster to project message: ", [res.body.message]);
                    addContext(this, "Add cluster to project message: " + [res.body.message]);
                    done();
                });
        });
    });
});