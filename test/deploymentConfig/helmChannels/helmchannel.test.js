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

describe('Helm channel GET, POST, PUT and DELETE test case', () => {
    describe('Create HelmChannel', () => {
        it('POST /helmchannels', function (done) {
            const name = 'channel-' + common.getRandomString(2);
            const param = {
                'name': name,
                'url': constants.HELM_CHANNEL_URL
            }

            deploymentConfig.postHelmChannels(param)
                .end((err, res) => {
                    let msg = res.body.message;
                    if (msg === constants.HELM_MSG_SUCCESS) {
                        elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                        elementHandler.toBeEqual(msg, constants.HELM_MSG_SUCCESS);
                    } else {
                        elementHandler.responseExpect(res.body, res.statusCode, 400, res.res.statusMessage, constants.STATUS_TEXT_BAD_REQUEST, res.badRequest);
                        elementHandler.toBeEqual(msg, constants.HELM_MSG);
                    }

                    //helm channel id set in the env variable
                    common.readOrWriteJsonFile('deploy_config', 'helm_channel', 'name', name);

                    console.log('Helm channel creation message: ', [msg]);
                    addContext(this, 'Helm channel creation message: ' + [msg]);

                    done();
                });
        });
    });

    describe('Get and Sync Helmchannel', () => {
        it('GET /helmchannels', function (done) {
            const name = common.searchOfEnv('deploy_config', 'helm_channel', 'name');

            deploymentConfig.getHelmChannels(queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === name) {
                            common.readOrWriteJsonFile('deploy_config', 'helm_channel', 'id', obj.id);
                            common.readOrWriteJsonFile('deploy_config', 'helm_channel', 'url', obj.url);

                            console.log('Helm channel id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Helm channel id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /provider/sync_resource', function (done) {
            const param = {
                'sync_kind': 'helm',
                'id': common.searchOfEnv('deploy_config', 'helm_channel', 'id')
            }

            deploymentConfig.sync(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, 'published');

                    console.log('Helm channel sync resource : ', [res.body.message]);
                    addContext(this, 'Helm channel sync resource: ' + [res.body.message]);
                    done();
                });
        });
    });

    describe('Edit Helmchannel', () => {
        it('PUT /helmchannels', function (done) {
            const id = common.searchOfEnv('deploy_config', 'helm_channel', 'id');

            const param = {
                'id': id,
                'name': common.searchOfEnv('deploy_config', 'helm_channel', 'name') + 1,
                'url': common.searchOfEnv('deploy_config', 'helm_channel', 'url')
            }

            deploymentConfig.putHelmChannels(param, '/' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.putApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    console.log('Edit helm channel: ', [res.body.name]);
                    addContext(this, 'Edit helm channel: ' + [res.body.name]);
                    done();
                });
        });
    });
});