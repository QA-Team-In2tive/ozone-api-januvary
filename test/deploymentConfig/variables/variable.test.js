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

describe('Variable GET, POST, PUT and DELETE test case', () => {
    describe('Create Variable', () => {
        it('POST /variable', function (done) {
            const param = {
                'global': true,
                'name': 'variable-' + common.getRandomString(1),
                'value': 'string'
            }

            deploymentConfig.postVariable(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    //Env id and name set in the env variable
                    common.readOrWriteJsonFile('deploy_config', 'variable_creation', 'id', res.body.id);
                    common.readOrWriteJsonFile('deploy_config', 'variable_creation', 'name', res.body.name);

                    console.log('Variable creation id and name: ', [res.body.id, res.body.name]);
                    addContext(this, 'Variable creation id and name: ' + [res.body.id, res.body.name]);

                    done();
                });
        });
    });

    describe('Get Variable', () => {
        it('GET /variable', function (done) {
            const id = common.searchOfEnv('deploy_config', 'variable_creation', 'id');

            deploymentConfig.getVariable(queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === id) {
                            console.log('Variable id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Variable id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });
    });

    describe('Delete Variable', () => {
        it('DELETE /variables/variablesworkspace', function (done) {
            const param = { 'id': common.searchOfEnv('deploy_config', 'variable_creation', 'id') }

            deploymentConfig.deleteWorkspaceVariable()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.deleteApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Variable remove from project: ', [res.body.message]);
                    addContext(this, 'Variable remove from project: ' + [res.body.message]);

                    done();
                });
        });

    });

    describe('Add Variable To Project', () => {
        it('GET /variables/allvariables', function (done) {
            const id = common.searchOfEnv('deploy_config', 'variable_creation', 'id');

            deploymentConfig.allVariable(queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === id) {
                            console.log('Variable id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Variable id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /variables/variablesworkspace', function (done) {
            const param = { 'id': common.searchOfEnv('deploy_config', 'variable_creation', 'id') }

            deploymentConfig.postWorkspaceVariable(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Add variable to project: ', [res.body.message]);
                    addContext(this, 'Add variable to project: ' + [res.body.message]);

                    done();
                });
        });
    });

    describe('Edit Variable', () => {
        it('PUT /variables', function (done) {
            const id = common.searchOfEnv('deploy_config', 'variable_creation', 'id');

            const param = {
                'id': id,
                'value': 'str',
                'name': common.searchOfEnv('deploy_config', 'variable_creation', 'name') + 1
            }

            deploymentConfig.putVariable(param, '/' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.putApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    console.log('Edit variable: ', [res.body.name]);
                    addContext(this, 'Edit variable: ' + [res.body.name]);

                    done();
                });
        });
    });
});