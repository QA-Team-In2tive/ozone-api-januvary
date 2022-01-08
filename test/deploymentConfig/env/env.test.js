const elementHandler = require('../../../utility/elementHandler');
const logs = require('../../../utility/logs');
const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const login = require('../../../collections/login');
const checkSuccess = require('../../../schemaValidate/check.success');
const addContext = require('mochawesome/addContext');
const deploymentConfig = require('../../../collections/deploymentConfig');
const { queryParam } = require('../../../config/query');

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

describe('Environment GET, POST, PUT and DELETE test case', () => {
    describe('Create Env', () => {
        it('GET /env/types', function (done) {
            deploymentConfig.type(queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.ENV_TYPE) {
                            common.readOrWriteJsonFile('deploy_config', 'env_type', 'id', obj.id);
                            common.readOrWriteJsonFile('deploy_config', 'env_type', 'name', obj.name);

                            console.log('Env type id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Env type id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /env', function (done) {
            const param = {
                'name': 'env-' + common.getRandomString(1),
                'type': common.searchOfEnv('deploy_config', 'env_type', 'id')
            }

            deploymentConfig.postEnv(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    //Env id and name set in the env variable
                    common.readOrWriteJsonFile('deploy_config', 'env_creation', 'id', res.body.id);
                    common.readOrWriteJsonFile('deploy_config', 'env_creation', 'name', res.body.name);

                    console.log('Env creation id and name: ', [res.body.id, res.body.name]);
                    addContext(this, 'Env creation id and name: ' + [res.body.id, res.body.name]);

                    done();
                });
        });
    });

    describe('Delete Env', () => {
        it('GET /env', function (done) {
            const id = common.searchOfEnv('deploy_config', 'env_creation', 'id');

            deploymentConfig.getEnv(queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === id) {
                            console.log('Env id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Env id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('DELETE /env/envworkspace', function (done) {
            const param = { 'id': common.searchOfEnv('deploy_config', 'env_creation', 'id') }

            deploymentConfig.deleteWorkspaceEnv()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.deleteApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Env remove from project: ', [res.body.message]);
                    addContext(this, 'Env remove from project: ' + [res.body.message]);

                    done();
                });
        });
    });

    describe('Add Env To Project', () => {
        it('GET /env/allenvs', function (done) {
            const id = common.searchOfEnv('deploy_config', 'env_creation', 'id');

            deploymentConfig.allEnv(queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === id) {
                            console.log('Env id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Env id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /env/envworkspace', function (done) {
            const param = { 'id': common.searchOfEnv('deploy_config', 'env_creation', 'id') }

            deploymentConfig.postWorkspaceEnv(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Add environment to project: ', [res.body.message]);
                    addContext(this, 'Add environment to project: ' + [res.body.message]);

                    done();
                });
        });
    });

    describe('Edit Env', () => {
        it('PUT /env', function (done) {
            const id = common.searchOfEnv('deploy_config', 'env_creation', 'id');

            const param = {
                'id': id,
                'type': common.searchOfEnv('deploy_config', 'env_type', 'id'),
                'name': common.searchOfEnv('deploy_config', 'env_creation', 'name') + 1
            }

            deploymentConfig.putEnv(param, '/' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.putApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    console.log('Edit env: ', [res.body.name]);
                    addContext(this, 'Edit env: ' + [res.body.name]);

                    done();
                });
        });
    });
});