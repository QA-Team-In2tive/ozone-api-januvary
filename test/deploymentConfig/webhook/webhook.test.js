const webhook = require('../../../collections/webhook');
const query = require('../../../config/query');
const logs = require('../../../utility/logs');
const elementHandler = require('../../../utility/elementHandler');
const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const login = require('../../../collections/login');
const checkSuccess = require('../../../schemaValidate/check.success');
const param = require('../../../paramaters/param');
const addContext = require('mochawesome/addContext');
const providers = require('../../../collections/providers');

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

describe('Webhook GET, POST, PUT and DELETE test case', () => {
    describe('Create Webhook', () => {
        it('GET /webhooks/types', function (done) {
            webhook.types(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.JIRA_WEBHOOK) {
                            common.readOrWriteJsonFile('webhook', 'type', 'id', obj.id);
                            common.readOrWriteJsonFile('webhook', 'type', 'name', obj.name);

                            console.log('Webhook type id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Webhook type id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /provider', function (done) {
            providers.get(query.queryParam + '&provider_type_id=28')
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body[0].id;
                    let name = res.body[0].name;

                    common.readOrWriteJsonFile('webhook', 'provider', 'id', id);

                    console.log('Webhook provider id and name: ', [id, name]);
                    addContext(this, 'Webhook provider id and name: ' + [id, name]);

                    done();
                });
        });

        it('GET /webhooks/actiontypes', function (done) {
            const type_id = common.searchOfEnv('webhook', 'type', 'id');

            webhook.actionTypes(query.queryParam + '&webhook_type_id=' + type_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.JIRA_ACTION_TYPE) {
                            common.readOrWriteJsonFile('webhook', 'actiontype', 'id', obj.id);
                            common.readOrWriteJsonFile('webhook', 'actiontype', 'name', obj.name);

                            console.log('Webhook action type id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Webhook action type id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /jira/projects', function (done) {
            const pro_id = common.searchOfEnv('webhook', 'provider', 'id');

            webhook.project(query.queryParam + '&provider_id=' + pro_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body[0].id;
                    let name = res.body[0].name;

                    common.readOrWriteJsonFile('webhook', 'jira_project', 'id', id);
                    common.readOrWriteJsonFile('webhook', 'jira_project', 'name', name);

                    console.log('Webhook app id and name: ', [id, name]);
                    addContext(this, 'Webhook app id and name: ' + [id, name]);

                    done();
                });
        });

        it('POST /webhooks', function (done) {
            webhook.webhooks(param.jiraWebhook())
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    common.readOrWriteJsonFile('webhook', 'webhook_creation', 'id', res.body.id);
                    common.readOrWriteJsonFile('webhook', 'webhook_creation', 'name', res.body.name);

                    console.log('Creation webhook id and name: ', [res.body.id, res.body.name]);
                    addContext(this, 'Creation webhook id and name: ' + [res.body.id, res.body.name]);

                    done();
                });
        });
    });

    describe('Edit Webhook', () => {
        it('GET /webhooks', function (done) {
            const id = common.searchOfEnv('webhook', 'webhook_creation', 'id');

            webhook.get('/' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    common.readOrWriteJsonFile('webhook', 'webhook_creation', 'webhookID', res.body.jira.webhookID)

                    console.log('Get webhook id and name: ', [res.body.jira.webhookID]);
                    addContext(this, 'Get webhook id and name: ' + [res.body.jira.webhookID]);

                    done();
                });
        });

        it('PUT /webhooks', function (done) {
            const id = common.searchOfEnv('webhook', 'webhook_creation', 'id');

            const updatParam = {
                "id": id,
                "name": common.searchOfEnv('webhook', 'webhook_creation', 'name') + 1,
                "account_id": 1,
                "type": common.searchOfEnv("webhook", "type", "id"),
                "jira": {
                    "webhookID": common.searchOfEnv('webhook', 'webhook_creation', 'webhookID'),
                    "providerID": common.searchOfEnv("webhook", "provider", "id"),
                    "resolution": {
                        "projectID": common.searchOfEnv("webhook", "jira_project", "id"),
                        "resolutionColumn": constants.Resolution_Name
                    }
                },
                "actionType": common.searchOfEnv("webhook", "actiontype", "id"),
                'enabled': false
            }

            webhook.putWebhooks(updatParam, '/' + id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.putApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    console.log('Edit webhook id and name: ', [res.body.id, res.body.name]);
                    addContext(this, 'Edit webhook id and name: ' + [res.body.id, res.body.name]);

                    done();
                });
        });
    });

    describe('Delete From Project Webhook', () => {
        it('DELETE /webhooks/webhookworkspace', function (done) {
            const param = {
                'id': common.searchOfEnv('webhook', 'webhook_creation', 'id')
            }

            webhook.deleteWebhook()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.deleteApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Delete webhook message: ', [res.body.message]);
                    addContext(this, 'Delete webhook message: ' + [res.body.message]);

                    done();
                });
        });

    });

    describe('Add Workspace To Project Webhook', () => {
        it('GET /webhooks/allwebhooks', function (done) {
            const id = common.searchOfEnv('webhook', 'webhook_creation', 'id');

            webhook.getAllwebhooks(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    common.tryDelay(5000);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === id) {
                            console.log('Add workspace to project webhook id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Add workspace to project webhook id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /webhooks/webhookworkspace', function (done) {
            const param = {
                'id': common.searchOfEnv('webhook', 'webhook_creation', 'id')
            }

            webhook.postWebhookWorkspace(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Add workspace to project webhook message: ', [res.body.message]);
                    addContext(this, 'Add workspace to project webhook message: ' + [res.body.message]);

                    done();
                });
        });
    });
});