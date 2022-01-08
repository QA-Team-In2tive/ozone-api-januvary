const projects = require("../../../collections/projects");
const logs = require("../../../utility/logs");
const elementHandler = require("../../../utility/elementHandler");
const addContext = require('mochawesome/addContext');
const constants = require("../../../config/constants");
const common = require("../../../utility/common");

describe('Project GET, POST and PUT test case', () => {
    describe('Create Project', () => {
        it('POST /project', function (done) {
            const param = { "name": "project-" + common.getSmallCharStr(2), }

            projects.post(param)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.postApiResponse(res);
                        addContext(this, res.body.message);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body, "Project response should be object.");
                    elementHandler.toNumber(res.body.id, "Project id type should be number.");
                    elementHandler.toString(res.body.name, "Project name type should be string.");

                    common.readOrWriteJsonFile("governance", "project", "id", res.body.id);
                    common.readOrWriteJsonFile("governance", "project", "name", res.body.name);

                    console.log("Create project id and name: ", [res.body.id, res.body.name]);
                    addContext(this, "Create project id and name: " + [res.body.id, res.body.name]);

                    done();
                });
        });
    });

    describe('Edit Project', () => {
        it('GET /project', function (done) {
            const project_id = common.searchOfEnv("governance", "project", "id");

            projects.get("/" + project_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.getApiResponse(res);
                        addContext(this, "Response: " + [res.request.url, res.body, res.res.statusMessage]);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body, "Project response should be object.");
                    elementHandler.toNumber(res.body.id, "Project id type should be number.");
                    elementHandler.toString(res.body.name, "Project name type should be string.");

                    if (res.body.id === project_id) {
                        elementHandler.toBeEqual(res.body.id, project_id);
                        console.log("Get project id and name: ", [res.body.id, res.body.name]);
                        addContext(this, "Get project id and name: " + [res.body.id, res.body.name]);
                    } else {
                        console.log("Get project id doesn't match");
                    }
                    done();
                });
        });

        it('PUT /project', function (done) {
            const name = common.searchOfEnv("governance", "project", "name");
            const project_id = common.searchOfEnv("governance", "project", "id");

            const param = {
                "id": project_id,
                "name": name + "test",
            }

            projects.put(param, "/" + project_id)
                .end((err, res) => {
                    if (res.statusCode !== 200) {
                        logs.putApiResponse(res);
                        addContext(this, res.body.message);
                    }

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(res.body, "Project response should be object.");
                    elementHandler.toNumber(res.body.id, "Project id type should be number.");
                    elementHandler.toString(res.body.name, "Project name type should be string.");

                    if (res.body.id === project_id) {
                        elementHandler.string(res.body.name, name);
                        console.log("Edit project: ", [res.body.id, res.body.name]);
                        addContext(this, "Edit project: " + [res.body.id, res.body.name]);
                    }
                    done();
                });
        });
    });
});