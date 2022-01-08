const constants = require('../../config/constants');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const param = require('../../paramaters/param');
const elementHandler = require('../../utility/elementHandler');
const login = require('../../collections/login');
const app = require('../../collections/app');
const query = require('../../config/query');
const checkSuccess = require('../../schemaValidate/check.success');
const addContext = require('mochawesome/addContext');
const path = require('path');

beforeEach(function (done) {
    const token = common.searchOfEnv('login', 'login', 'token');

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

describe('Link Gitlab CI pipeline test case', () => {
    describe('Pipeline link', () => {
        it('GET /pipelines', function (done) {
            app.pipeline(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.GITLAB_CI) {
                            common.readOrWriteJsonFile('app', 'link_pipeline', 'id', obj.id);
                            elementHandler.toBeEqual(obj.name, constants.GITLAB_CI);

                            console.log('Link gitlab-ci pipeline id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Link gitlab-ci pipeline id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /app/pipelines', function (done) {
            const param = {
                "applicationID": common.searchOfEnv('app', 'custom_app', 'id'),
                "pipelineID": common.searchOfEnv('app', 'link_pipeline', 'id')
            }

            app.appPipeline(param)
                .end((err, res) => {
                    let msg = res.body.message;
                    if (msg === constants.LINK_SUCCESS) {
                        elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                        elementHandler.toBeEqual(msg, constants.LINK_SUCCESS);
                    } else {
                        elementHandler.responseExpect(res.body, res.statusCode, 409, res.res.statusMessage, constants.STATUS_TEXT_CONFLICT, res.clientError);
                        elementHandler.toBeEqual(msg, constants.LINK_PIPELINE_MSG);
                    }

                    console.log('Link gitlab-ci pipeline message: ', [msg]);
                    addContext(this, 'Link gitlab-ci pipeline message: ' + [msg]);
                    done();
                });
        });
    });

    describe('Pipeline run details', function () {
        it('GET /app/env', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id');
            const env_id = common.searchOfEnv('app', 'custom_app', 'env_id');

            app.appEnv(query.queryParam + '&application_id=' + app_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === env_id) {
                            common.readOrWriteJsonFile('app', 'env', 'id', obj.id);
                            common.readOrWriteJsonFile('app', 'env', 'name', obj.name);

                            elementHandler.toBeEqual(obj.id, env_id);

                            console.log('Pipeline env id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Pipeline env id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /cluster', function (done) {
            const id = common.searchOfEnv('app', 'env', 'id');

            app.cluster(query.queryParam + '&env_id=' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.CLUSTER_NAME) {
                            common.readOrWriteJsonFile('app', 'cluster', 'id', obj.id);
                            common.readOrWriteJsonFile('app', 'cluster', 'name', obj.name);

                            elementHandler.toBeEqual(obj.name, constants.CLUSTER_NAME);

                            console.log('Pipeline cluster id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Pipeline cluster id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /repository/branches', function (done) {
            const id = common.searchOfEnv('app', 'custom_app', 'repository_id');

            app.branchs(query.queryParam + '&repository_id=' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body[0].id;
                    let name = res.body[0].name;

                    common.readOrWriteJsonFile('app', 'branch', 'id', id);
                    common.readOrWriteJsonFile('app', 'branch', 'name', name);

                    console.log('Pipeline branch id and name: ', [id, name]);
                    addContext(this, 'Pipeline branch id and name: ' + [id, name]);
                    done();
                });
        });

        it('POST /app/newdeploy', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id');
            const pipe_id = common.searchOfEnv('app', 'link_pipeline', 'id');

            app.newdeploy(param.gitlabci())
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    if (res.body.applicationID === app_id) {
                        elementHandler.toBeEqual(res.body.pipelineID, pipe_id);
                        common.readOrWriteJsonFile('app', 'run', 'id', res.body.id);

                        console.log('Gitlab-ci pipeline deploy id: ', [res.body.id]);
                        addContext(this, 'Gitlab-ci pipeline deploy id: ' + res.body.id);
                    }
                    done();
                });
        });
    });

    describe('Pipeline runs', function () {
        it('GET /pipelineruns', async () => {
            const id = common.searchOfEnv('app', 'run', 'id');

            let count = 1;
            const file = path.join(path.resolve(), '/resource/pipeline.json');

            for (let index = 0; index < count; index++) {
                await app.pipelineRun('/' + id)
                    .then((res) => {
                        if (res.statusCode !== 200)
                            logs.getApiResponse(res);

                        elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                        // Add delay time 5s
                        common.tryDelay(5000);
                        let status = res.body.tektonPipelineRun.object.status;

                        // get the pipeline start time
                        let flag = 1, startTime = '';
                        if (flag) {
                            startTime = status.startTime instanceof Date ? status.startTime : new Date(status.startTime);
                            flag = 0;
                        }

                        // Set running pipeline status response in json file
                        common.writeJsonFlie(file, status);

                        // get pipeline response in json file through
                        const pipelineResponse = common.readJsonFile(file);
                        const cTime = pipelineResponse.completionTime;

                        // set value param in completion time
                        const value = cTime ? cTime : null;
                        if (value) {
                            const completionTime = cTime instanceof Date ? cTime : new Date(cTime);
                            seconds = Math.abs(completionTime - startTime) / 1000;

                            console.log('StartTime: ', startTime);
                            console.log('CompletionTime: ', cTime);

                            console.log('Pipeline completion time: ', seconds + 's');
                            console.log('Pipeline status: ', pipelineResponse.conditions[0].reason);
                        } else {
                            count += 1;
                            console.log('Pipeline still running.......');
                        }
                    });
            }
        });
    });
});