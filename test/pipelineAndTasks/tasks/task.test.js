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

describe("Task GET, POST, PUT and DELETE test case", () => {
    describe("Create Task", () => {
        it("GET /templates/types", function (done) {
            pipelinesAndTasks.templatestypes(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.TASK_TYPE) {
                            elementHandler.toBeEqual(obj.name, constants.TASK_TYPE);
                            common.readOrWriteJsonFile("pipeline_and_task", "task", "type_id", obj.id);

                            console.log("Template type id and name: ", [obj.id, obj.name]);
                            addContext(this, "Template type id and name: " + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it("GET /templates/format", function (done) {
            pipelinesAndTasks.format(query.queryParam + "&template_type_id=2")
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.FORMAT) {
                            elementHandler.toBeEqual(obj.name, constants.FORMAT);
                            common.readOrWriteJsonFile("pipeline_and_task", "task", "format_id", obj.id);

                            console.log("Template format id and name: ", [obj.id, obj.name]);
                            addContext(this, "Template format id and name: " + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it("POST /templates", function (done) {
            const param = {
                "templateTypeID": common.searchOfEnv("pipeline_and_task", "task", "type_id"),
                "templateFormatID": common.searchOfEnv("pipeline_and_task", "task", "format_id"),
                "name": "task-" + common.getSmallCharStr(2),
                "stringData": "apiVersion: tekton.dev/v1beta1\nkind: Task\nmetadata:\n  name: ozone-login-test\n  labels:\n    app.kubernetes.io/version: \"0.1\"\n  annotations:\n    tekton.dev/pipelines.minVersion: \"0.12.1\"\n    tekton.dev/tags: test\n    tekton.dev/displayName: \"Login client\"\nspec:\n  description: >-\n    A task for testing for login client in ozone\n  workspaces:\n  - name: source\n  params:\n  - name: PROJECT_DIR\n    type: string\n  - name: REPO_USER\n    type: string\n  - name: REPO_PASSWORD\n    type: string\n  - name: REPO_URL\n    type: string\n  - name: REPO_BRANCH\n    type: string\n  - name: DOCKER_NETRC\n    type: string\n  steps:\n  - image: gcr.io/andromeda-288104/alpine/git:latest\n    ",
            }

            pipelinesAndTasks.postTemplates(param)
                .expect(200)
                .end((err, res) => {
                    if (res.statusCode !== 201) {
                        logs.postApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 201, res.res.statusMessage, constants.STATUS_TEXT_CREATED, res.ok);
                    common.readOrWriteJsonFile("pipeline_and_task", "task", "id", res.body.id);
                    common.readOrWriteJsonFile("pipeline_and_task", "task", "name", res.body.name);

                    console.log("Create task id and name: ", [res.body.id, res.body.name]);
                    addContext(this, "Create task id and name: " + [res.body.id, res.body.name]);

                    done();
                });
        });
    });

    describe("Edit Task", () => {
        it("GET /templates", function (done) {
            const task_id = common.searchOfEnv("pipeline_and_task", "task", "id");

            pipelinesAndTasks.getTemplates(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === task_id) {
                            elementHandler.toBeEqual(obj.id, task_id);
                            console.log("Get task id and name: ", [obj.id, obj.name]);
                            addContext(this, "Get task id and name: " + [obj.id, obj.name]);
                        }
                    }
                    done();
                })
        });

        it("PUT /templates", function (done) {
            const task_id = common.searchOfEnv("pipeline_and_task", "task", "id");
            const param = {
                "id": task_id,
                "templateTypeID": common.searchOfEnv("pipeline_and_task", "task", "type_id"),
                "templateFormatID": common.searchOfEnv("pipeline_and_task", "task", "format_id"),
                "name": common.searchOfEnv("pipeline_and_task", "task", "name"),
                "stringData": "apiVersion: tekton.dev/v1beta1\nkind: Task\nmetadata:\n  name: ozone-login-test\n  labels:\n    app.kubernetes.io/version: \"0.1\"\n  annotations:\n    tekton.dev/pipelines.minVersion: \"0.12.1\"\n    tekton.dev/tags: test\n    tekton.dev/displayName: \"Login client\"\nspec:\n  description: >-\n    A task for testing for login client in ozone\n  workspaces:\n  - name: source\n  params:\n  - name: PROJECT_DIR\n    type: string\n  - name: REPO_USER\n    type: string\n  - name: REPO_PASSWORD\n    type: string\n  - name: REPO_URL\n    type: string\n  - name: REPO_BRANCH\n    type: string\n  - name: DOCKER_NETRC\n    type: string\n  steps:\n  - image: gcr.io/andromeda-288104/alpine/git:latestv.1\n    "
            }

            pipelinesAndTasks.putTemplates(param, "/" + task_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.putApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    if (res.body.id === task_id) {
                        elementHandler.toBeEqual(res.body.id, task_id);
                        console.log("Edit task id and name: ", [res.body.id, res.body.name]);
                        addContext(this, "Edit task id and name: " + [res.body.id, res.body.name]);
                    }

                    done();
                });
        });
    });

    describe("Delete Task", () => {
        it("DELETE /templates/templatesworkspace", function (done) {
            const param = { "id": common.searchOfEnv("pipeline_and_task", "task", "id") }

            pipelinesAndTasks.deleteTemplatesWorkspace()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.deleteApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log("Delete task message: ", [res.body.message]);
                    addContext(this, "Delete task message: " + [res.body.message]);

                    done();
                })
        });
    });

    describe("Add Task To Project", () => {
        it("GET /templates/alltemplates", function (done) {
            const task_id = common.searchOfEnv("pipeline_and_task", "task", "id");

            pipelinesAndTasks.alltemplates(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === task_id) {
                            elementHandler.toBeEqual(obj.id, task_id);
                            console.log("Get task id and name: ", [obj.id, obj.name]);
                            addContext(this, "Get task id and name: " + [obj.id, obj.name]);
                        }
                    }
                    done();
                })
        });

        it("POST /templates/templatesworkspace", function (done) {
            const param = { "id": common.searchOfEnv("pipeline_and_task", "task", "id") }

            pipelinesAndTasks.postTemplatesWorkspace(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log("Add task to project message: ", [res.body.message]);
                    addContext(this, "Add task to project message: " + [res.body.message]);
                    done();
                })
        });
    });
});