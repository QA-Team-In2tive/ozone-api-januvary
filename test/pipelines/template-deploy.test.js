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

describe('ozone-git-pull-docker-image-build-and-template-deploy-v-1 test case', () => {
    context('Pipeline Environment', () => {
        it('GET /env', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id');
            const env_id = common.searchOfEnv('app', 'custom_app', 'env_id');
            app.appEnv(query.queryParam + '&application_id=' + app_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toArray(res.body, 'Pipeline env response type should be array.');

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.id === env_id) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline env single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline env id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline env name type should be string.');
                            elementHandler.toBeEqual(obj.id, env_id);

                            addContext(this, 'Pipeline env id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        addContext(this, 'Environment name not found.');
                        elementHandler.toBeTrueMsg(flag, 'Environment name not found.');
                    }
                    done();
                });
        });

        after(function (done) {
            const env_id = common.searchOfEnv('app', 'custom_app', 'env_id');
            app.appEnv('?id=' + env_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toArray(res.body, 'Pipeline env response type should be array.');

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.id === env_id) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline env single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline env id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline env name type should be string.');
                            elementHandler.toBeEqual(obj.id, env_id);

                            console.log('Pipeline env id and name: ', [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        elementHandler.toBeTrueMsg(flag, 'Environment not found..');
                    }
                    done();
                });
        });
    });

    context('Pipeline Cluster', () => {
        it('GET /cluster', function (done) {
            const env_id = common.searchOfEnv('app', 'custom_app', 'env_id');
            app.cluster(query.queryParam + '&env_id=' + env_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.name === constants.CLUSTER_NAME) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline cluster single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline cluster id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline cluster name type should be string.');
                            elementHandler.toBeEqual(obj.name, constants.CLUSTER_NAME);

                            common.readOrWriteJsonFile('app', 'cluster', 'id', obj.id);
                            common.readOrWriteJsonFile('app', 'cluster', 'name', obj.name);

                            addContext(this, 'Pipeline cluster id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        addContext(this, 'Cluster name not found.' + [constants.CLUSTER_NAME]);
                        elementHandler.toBeTrueMsg(flag, 'Cluster name not found: ' + constants.CLUSTER_NAME);
                    }
                    done();
                });
        });
        after(function (done) {
            const id = common.searchOfEnv('app', 'cluster', 'id');
            app.cluster('?id=' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.id === id) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline cluster single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline cluster id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline cluster name type should be string.');
                            elementHandler.toBeEqual(obj.id, id);

                            console.log('Pipeline cluster id and name: ', [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        elementHandler.toBeTrueMsg(flag, 'Cluster name not found.');
                    }
                    done();
                });
        });
    });

    context('Pipeline Tamplate', () => {
        it('GET /app/templates', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id');
            app.appTemplate(query.queryParam + '&application_id=' + app_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toArray(res.body, 'Pipeline templates response type should be array.');

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.name === constants.NAMESPACE_NAME) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline env single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline env id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline env name type should be string.');
                            elementHandler.toBeEqual(obj.name, constants.NAMESPACE_NAME);

                            common.readOrWriteJsonFile('app', 'template', 'id', obj.id);
                            common.readOrWriteJsonFile('app', 'template', 'name', obj.name);

                            addContext(this, 'Pipeline template id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        addContext(this, 'Template name not found: ' + [constants.NAMESPACE_NAME]);
                        elementHandler.toBeTrueMsg(flag, 'Template name not found: ' + constants.NAMESPACE_NAME);
                    }
                    done();
                });
        });

        after(function (done) {
            const id = common.searchOfEnv('app', 'template', 'id');
            app.appTemplate('?id=' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toArray(res.body, 'Pipeline templates response type should be array.');

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.id === id) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline env single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline env id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline env name type should be string.');
                            elementHandler.toBeEqual(obj.name, constants.NAMESPACE_NAME);

                            console.log('Pipeline template id and name: ', [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        elementHandler.toBeTrueMsg(flag, 'Templates name not found: ' + constants.NAMESPACE_NAME);
                    }
                    done();
                });
        });
    });
    
    context('Pipeline Branch', () => {
        it('GET /repository/branches', function (done) {
            const repo_id = common.searchOfEnv('app', 'custom_app', 'repository_id');
            app.branchs(query.queryParam + '&repository_id=' + repo_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.name === constants.MASTER) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline branch single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline branch id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline branch name type should be string.');
                            elementHandler.toBeEqual(obj.name, constants.MASTER);

                            common.readOrWriteJsonFile('app', 'branch', 'id', obj.id);
                            common.readOrWriteJsonFile('app', 'branch', 'name', obj.name);

                            addContext(this, 'Pipeline branch id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        addContext(this, 'Branch name not found: ' + [constants.GITHUB_BRANCH_NAME]);
                        elementHandler.toBeTrueMsg(flag, 'Branch name not found: ' + constants.GITHUB_BRANCH_NAME);
                    }

                    done();
                });
        });

        after(function (done) {
            const id = common.searchOfEnv('app', 'branch', 'id');
            app.branchs('?id=' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let flag = false;
                    for (const obj of res.body) {
                        if (obj.id === id) {
                            flag = true;
                            elementHandler.toObject(obj, 'Pipeline branch single response type should be object.');
                            elementHandler.toString(obj.id, 'Pipeline branch id type should be string.');
                            elementHandler.toString(obj.name, 'Pipeline branch name type should be string.');
                            elementHandler.toBeEqual(obj.id, id);

                            console.log('Pipeline branch id and name: ', [obj.id, obj.name]);
                        }
                    }
                    if (!flag) {
                        elementHandler.toBeTrueMsg(flag, 'Branch name not found.');
                    }

                    done();
                });
        });
    });

    context('Create Pipeline', () => {
        it('POST /newdeploy', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id');
            const pipe_id = common.searchOfEnv('app', 'pipelines', '2');

            app.newdeploy(param.templateDeploy())
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    let obj = res.body;
                    elementHandler.responseExpect(obj, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toObject(obj, 'Pipeline response type should be object.');

                    if (obj.applicationID === app_id) {
                        elementHandler.toBeEqual(obj.pipelineID, pipe_id);
                        elementHandler.toString(obj.id, 'Pipeline id type should be string.');
                        common.readOrWriteJsonFile('app', 'run', 'id', obj.id);

                        console.log('New deploy id: ', [obj.id]);
                        addContext(this, 'New deploy id: ' + obj.id);
                    }

                    done();
                });
        });
    });

    context('Pipeline Run', function () {
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

                            console.log('Pipeline completion time in second: ', seconds + 's');
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