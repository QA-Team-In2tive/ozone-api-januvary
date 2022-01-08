const app = require('../../collections/app');
const elementHandler = require('../../utility/elementHandler');
const logs = require('../../utility/logs');
const constants = require('../../config/constants');
const query = require('../../config/query');
const common = require('../../utility/common');
const login = require('../../collections/login');
const checkSuccess = require('../../schemaValidate/check.success');
const addContext = require('mochawesome/addContext');
const param = require('../../paramaters/param');

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

describe('Application GET, POST, PUT and DELETE test case', () => {
    describe('Create Application', () => {
        it('GET /app/apps_types', function (done) {
            app.appType(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.CUSTOM_APP) {
                            common.readOrWriteJsonFile('app', 'custom_app', 'app_type_id', obj.id);
                            elementHandler.toBeEqual(obj.name, constants.CUSTOM_APP);

                            console.log('Application type id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Application type id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /registry', function (done) {
            const name = common.searchOfEnv('registry', 'registry_details', 'name');
            app.registries(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    for (const obj of res.body) {
                        if (obj.name === name) {
                            common.readOrWriteJsonFile('app', 'custom_app', 'registry_id', obj.id);
                            elementHandler.toBeEqual(obj.name, name);

                            console.log('Custom app registries id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Custom app registries id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /app/deploy_types', function (done) {
            app.deploy(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    for (const obj of res.body) {
                        if (obj.name === constants.DEPLOY_NAME) {
                            common.readOrWriteJsonFile('app', 'custom_app', 'deploy_id', obj.id);
                            elementHandler.toBeEqual(obj.name, constants.DEPLOY_NAME);

                            console.log('Application deploy id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Application deploy id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /app/k8servicetypes', function (done) {
            app.k8services(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    for (const obj of res.body) {
                        if (obj.name === constants.SERVICE_TYPE) {
                            common.readOrWriteJsonFile('app', 'custom_app', 'service_type', obj.id);
                            elementHandler.toBeEqual(obj.name, constants.SERVICE_TYPE);

                            console.log('Application k8services id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Application k8services id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /repository', function (done) {
            app.repositories(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    for (const obj of res.body) {
                        if (obj.name === constants.REPO_NAME) {
                            common.readOrWriteJsonFile('app', 'custom_app', 'repository_id', obj.id);
                            elementHandler.toBeEqual(obj.name, constants.REPO_NAME);

                            console.log('Application repositories id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Application repositories id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /app/build_types', function (done) {
            app.buildType(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    for (const obj of res.body) {
                        if (obj.name === constants.BUILD_NAME) {
                            common.readOrWriteJsonFile('app', 'custom_app', 'build_id', obj.id);
                            elementHandler.toBeEqual(obj.name, constants.BUILD_NAME);

                            console.log('Application build id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Application build id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /env', function (done) {
            app.env(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    for (const obj of res.body) {
                        if (obj.name === constants.ENV_NAME) {
                            common.readOrWriteJsonFile('app', 'custom_app', 'env_id', obj.id);
                            elementHandler.toBeEqual(obj.name, constants.ENV_NAME);

                            console.log('Application env id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Application env id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /app', function (done) {
            app.create(param.customApp())
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    const name = common.searchOfEnv('app', 'custom_app', 'name');
                    if (res.body.name === name) {
                        //app id set in the env variable
                        common.readOrWriteJsonFile('app', 'custom_app', 'id', res.body.id);

                        //pipelines id set in env variable
                        //push-pipeline
                        common.readOrWriteJsonFile('app', 'pipelines', '0', res.body.pipelines[0].id);
                        //push-set-deployment-image
                        common.readOrWriteJsonFile('app', 'pipelines', '1', res.body.pipelines[1].id);
                        //template-deploy
                        common.readOrWriteJsonFile('app', 'pipelines', '2', res.body.pipelines[2].id);
                        //set-deployment-image
                        common.readOrWriteJsonFile('app', 'pipelines', '3', res.body.pipelines[3].id);
                        //templates-deploy-pipeline
                        common.readOrWriteJsonFile('app', 'pipelines', '4', res.body.pipelines[4].id);

                        elementHandler.toBeEqual(res.body.name, name);

                        console.log('Application creation id or name: ', [res.body.id, res.body.name]);
                        addContext(this, 'Application creation id and name: ' + [res.body.id, res.body.name]);
                    }
                    done();
                });
        });
    });

    describe('Get Application', () => {
        it('GET /app', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id');
            app.get(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === app_id) {
                            elementHandler.toBeEqual(obj.id, app_id);

                            console.log('Application get id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Application get id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });
    });

    describe('Delete Application', () => {
        it('DELETE /app/appworkspace', function (done) {
            const param = { "id": common.searchOfEnv('app', 'custom_app', 'id') }
            app.deleteAppWorkspace()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.deleteApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Application delete message: ', [res.body.message]);
                    addContext(this, 'Application delete message: ' + [res.body.message]);

                    done();
                });
        });
    });

    describe('Add Application To Project', () => {
        it('GET /app/allapps', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id')
            app.allapps(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === app_id) {
                            elementHandler.toBeEqual(obj.id, app_id);
                            console.log('Add application to project id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Add application to project id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /app/appworkspace', function (done) {
            const param = { "id": common.searchOfEnv('app', 'custom_app', 'id') }
            app.postAppWorkspace(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Add application to project message: ', [res.body.message]);
                    addContext(this, 'Add application to project message: ' + [res.body.message]);

                    done();
                });
        });
    });

    xdescribe('Edit Application', () => {
        it('PUT /app', function (done) {
            const app_id = common.searchOfEnv('app', 'custom_app', 'id');
            const param = "";
            app.put(param, '/' + app_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.putApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === app_id) {
                            elementHandler.toBeEqual(res.body.message, constants.SUCCESS);
                            console.log('Edit application id and name: ', [res.body.id, res.body.name]);
                            addContext(this, 'Edit application id and name: ' + [res.body.id, res.body.name]);
                        }
                    }
                    done();
                });
        });
    });
});
