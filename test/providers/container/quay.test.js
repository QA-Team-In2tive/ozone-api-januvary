const login = require('../../../collections/login');
const providers = require('../../../collections/providers');
const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const logs = require('../../../utility/logs');
const query = require('../../../config/query');
const elementHandler = require('../../../utility/elementHandler');
const checkSuccess = require('../../../schemaValidate/check.success');
const typeSuccess = require('../../../schemaValidate/type.success');
const accessTypeSuccess = require('../../../schemaValidate/accesstype.success');
const createProSuccess = require('../../../schemaValidate/create.success');
const workerSuccess = require('../../../schemaValidate/worker.success');
const loggingSuccess = require('../../../schemaValidate/logging.success');

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

const accessType = 'Quay Token';

describe('Create Quay provider test case', () => {
    it('GET /provider/types', function (done) {
        providers.types('?id=26')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, typeSuccess);

                for (const obj of res.body) {
                    if (obj.name === constants.QUAY) {
                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.QUAY);

                        //set provider type id and name in the env variable
                        common.readOrWriteJsonFile('provider', 'provider_type', 'id', obj.id);
                        common.readOrWriteJsonFile('provider', 'provider_type', 'name', obj.name);

                        console.log('Quay provider type id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Quay provider type id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /provider/access_types', function (done) {
        const provider_type_id = '?provider_type_id=' + common.searchOfEnv('provider', 'provider_type', 'id');

        providers.accessType(provider_type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, accessTypeSuccess);

                for (const obj of res.body) {
                    if (obj.name === accessType) {
                        elementHandler.toBeEqual(obj.name, accessType);

                        //set access type id and name in env variable
                        common.readOrWriteJsonFile('provider', 'access_type', 'id', obj.id);
                        common.readOrWriteJsonFile('provider', 'access_type', 'name', obj.name);

                        console.log('Quay access type id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Quay access type id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('POST /provider', function (done) {
        const param = {
            "name": "quay-" + common.getRandomString(2),
            "access_token": process.env.quay_token,
            "url": process.env.quay_url
        }

        providers.create()
            .send(param)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, createProSuccess);

                // create provider id and name set in env file
                common.readOrWriteJsonFile('provider', 'provider_details', 'id', res.body.id);
                common.readOrWriteJsonFile('provider', 'provider_details', 'name', res.body.name);

                console.log('Quay provider creation id and name: ', [res.body.id, res.body.name]);
                addContext(this, 'Quay provider creation id and name: ' + [res.body.id, res.body.name]);

                done();
            });
    });

    describe('Sync provider test case', () => {
        it('POST /provider/sync', function (done) {
            providers.sync()
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, 'published');

                    console.log('Sync provider: ', [res.body.message]);
                    addContext(this, 'Sync provider: ' + res.body.message);

                    done();
                });
        });
    });

    describe('Sync logs provider test case', () => {
        it('GET /worker_requests', function () {
            const pro_id = common.searchOfEnv('provider', 'provider_details', 'id');

            return providers.worker(query.worker + pro_id)
                .then((res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, workerSuccess);

                    for (var i = 0; i < res.body.length; i++) {
                        if (i === 0) {
                            list = res.body[i];

                            elementHandler.toBeEqual(list.provider_id, pro_id);
                            common.readOrWriteJsonFile('provider', 'worker_requests', 'logs_id', list.id)

                            return;
                        }
                    }
                });
        });

        it('GET /worker_request', function (done) {
            const log_id = common.searchOfEnv('provider', 'worker_requests', 'logs_id');

            providers.worker('/' + log_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    if (res.body.id === log_id) {
                        elementHandler.toBeEqual(res.body.id, log_id);

                        console.log('Worker requests id: ', [res.body.id]);
                        addContext(this, 'Worker requests id: ' + res.body.id);
                    }

                    done();
                });
        });

        it('GET /logging', function (done) {
            const log_id = common.searchOfEnv('provider', 'worker_requests', 'logs_id');

            providers.logging(log_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, loggingSuccess);

                    common.tryDelay(5000);
                    for (const obj of res.body) {
                        if (obj.id === log_id) {
                            elementHandler.toBeEqual(obj.id, log_id);

                            console.log('Logging id and status: ', [obj.id, obj.status]);
                            addContext(this, 'Logging id and status: ' + [obj.id, obj.status]);
                        }
                    }
                    done();
                });
        });
    });
});
