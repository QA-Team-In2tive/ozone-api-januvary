const login = require("../../../collections/login");
const pipelinesAndTasks = require("../../../collections/pipelinesAndTasks");
const constants = require("../../../config/constants");
const common = require("../../../utility/common");
const elementHandler = require("../../../utility/elementHandler");
const logs = require("../../../utility/logs");
const addContext = require("mochawesome/addContext");
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

describe("Pipelines GET, POST, PUT and DELETE test case", () => {
    describe("Create Pipeline", () => {
        it("POST /pipelines", function (done) {
            const param = { "yamlString": "apiVersion: tekton.dev/v1beta1\nkind: Pipeline\nmetadata:\n  creationTimestamp: null\n  name: aws\n  namespace: ozone\nspec:\n  params:\n  - description: access key\n    name: access_key\n    type: string\n  - description: secret key\n    name: secret_key\n    type: string\n  tasks:\n  - name: aws-cloud-provider\n    params:\n    - name: access_key\n      value: $(params.access_key)\n    - name: secret_key\n      value: $(params.secret_key)\n    taskSpec:\n      params:\n      - description: access_key\n        name: access_key\n        type: string\n      - description: secret_key\n        name: secret_key\n        type: string\n      steps:\n      - image: ubuntu\n        name: echo\n        script: echo \"Hello World\"\n" }

            pipelinesAndTasks.create(param)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body.id;
                    let name = res.body.tektonPipeline.metadata.name;

                    common.readOrWriteJsonFile("pipeline_and_task", "pipeline", "id", id);
                    common.readOrWriteJsonFile("pipeline_and_task", "pipeline", "name", name);

                    addContext(this, "Create pipeline id and name: " + [id, name]);
                    console.log("Create pipeline id and name: ", [id, name]);
                    done();
                });
        });
    });

    describe("Edit Piepline", () => {
        it("GET /pipelines/paramtypes", function (done) {
            const id = common.searchOfEnv("pipeline_and_task", "pipeline", "id");

            pipelinesAndTasks.paramtypes("?id=100")
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body[0].id;
                    let name = res.body[0].name;

                    addContext(this, "Get pipeline param type id and name: " + [id, name]);
                    console.log("Get pipeline param type id and name: ", [id, name]);
                    done();
                });
        });

        it("GET /pipelines", function (done) {
            const id = common.searchOfEnv("pipeline_and_task", "pipeline", "id");

            pipelinesAndTasks.get("/" + id)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    addContext(this, "Get pipeline id and name: " + [res.body.id, res.body.name]);
                    console.log("Get pipeline id and name: ", [res.body.id, res.body.name]);
                    done();
                });
        });

        it("PUT /pipelines", function (done) {
            const pipeline_id = common.searchOfEnv("pipeline_and_task", "pipeline", "id");

            const param = {
                "id": pipeline_id,
                "account_id": 1,
                "kind": "TektonPipelineType",
                "params": [{
                    "name": "access_key",
                    "type": 100,
                    "description": "access key",
                    "value": "",
                    "default": "",
                    "required": true,
                    "securelyInject": false
                },
                {
                    "name": "secret_key",
                    "type": 101,
                    "description": "secret key",
                    "value": "",
                    "default": "",
                    "required": true,
                    "securelyInject": false
                }],
                "name": "aws-provider",
                "u": { "apiVersion": "tekton.dev/v1beta1", "kind": "Pipeline", "metadata": { "creationTimestamp": null, "name": "aws-provider", "namespace": "ozone" }, "spec": { "params": [{ "description": "access key", "name": "access_key", "type": "string" }, { "description": "secret key", "name": "secret_key", "type": "string" }], "tasks": [{ "name": "aws-cloud-provider", "params": [{ "name": "access_key", "value": "$(params.access_key)" }, { "name": "secret_key", "value": "$(params.secret_key)" }], "taskSpec": { "params": [{ "description": "access_key", "name": "access_key", "type": "string" }, { "description": "secret_key", "name": "secret_key", "type": "string" }], "steps": [{ "image": "ubuntu", "name": "echo", "script": "echo \"Hello World\"" }] } }] } }, "yamlString": "apiVersion: tekton.dev/v1beta1\nkind: Pipeline\nmetadata:\n  creationTimestamp: null\n  name: aws-provider\n  namespace: ozone\nspec:\n  params:\n  - description: access key\n    name: access_key\n    type: string\n  - description: secret key\n    name: secret_key\n    type: string\n  tasks:\n  - name: aws-cloud-provider\n    params:\n    - name: access_key\n      value: $(params.access_key)\n    - name: secret_key\n      value: $(params.secret_key)\n    taskSpec:\n      params:\n      - description: access_key\n        name: access_key\n        type: string\n      - description: secret_key\n        name: secret_key\n        type: string\n      steps:\n      - image: ubuntu\n        name: echo\n        script: echo \"Hello World\"\n"
            }

            pipelinesAndTasks.update(param, "/" + pipeline_id)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.putApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body.id;
                    let name = res.body.tektonPipeline.metadata.name;

                    if (id === pipeline_id) {
                        addContext(this, "Edit pipeline id and name: " + [id, name]);
                        console.log("Edit pipeline id and name: ", [id, name]);
                    }
                    done();
                });
        });
    });

    describe("Delete Pipeline", () => {
        it("POST /pipelines/pipelinesworkspace", function (done) {
            const param = { "id": common.searchOfEnv("pipeline_and_task", "pipeline", "id") }

            pipelinesAndTasks.delete()
                .send(param)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.deleteApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    addContext(this, "Remove from project pipeline: " + [res.body.message]);
                    console.log("Remove from project pipeline: ", [res.body.message]);
                    done();
                });
        });
    });

    describe("Add Pipeline To Project", () => {
        it("GET /pipelines/allpipelines", function (done) {
            const pipeline_id = common.searchOfEnv("pipeline_and_task", "pipeline", "id");

            pipelinesAndTasks.allpipelines(query.queryParam)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === pipeline_id) {
                            elementHandler.toBeEqual(obj.id, pipeline_id);
                            addContext(this, "Get list of pipeline to project: " + [obj.id]);
                            console.log("Get list of pipeline to project: ", [obj.id]);
                        }
                    }
                    done();
                });
        });

        it("POST /pipelines/pipelinesworkspace", function (done) {
            const param = { "id": common.searchOfEnv("pipeline_and_task", "pipeline", "id") }

            pipelinesAndTasks.postPipelinesWorkspace(param)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    addContext(this, "Add pipeline to project: " + [res.body.message]);
                    console.log("Add pipeline to project: ", [res.body.message]);
                    done();
                });
        });
    });

    describe("Clone Pipeline", () => {
        it("POST /pipelines/clone", function (done) {
            const pipeline_id = common.searchOfEnv("pipeline_and_task", "pipeline", "id");

            const param = { "id": pipeline_id }

            pipelinesAndTasks.clone(param)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    addContext(this, "Clone pipeline id and name: " + [res.body.id, res.body.tektonPipeline.metadata.name]);
                    console.log("Clone pipeline id and name: ", [res.body.id, res.body.tektonPipeline.metadata.name]);
                    done();
                });
        });
    });
});