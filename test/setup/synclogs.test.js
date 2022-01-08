const providers = require('../../../collections/providers');
const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const logs = require('../../../utility/logs');
const elementHandler = require('../../../utility/elementHandler');
const query = require('../../../config/query');
const login = require('../../../collections/login');

const workerSuccess = require('../../../schemaValidate/worker.success');
const checkSuccess = require('../../../schemaValidate/check.success');
const loggingSuccess = require('../../../schemaValidate/logging.success');
const addContext = require('mochawesome/addContext');

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

describe('Sync logs provider test case', () => {
    it('GET / worker_requests', function () {
        const pro_id = common.searchOfEnv('provider', 'provider_details', 'id');

        return providers.worker(query.worker + pro_id)
            .then((res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                } else {
                    for (var i = 0; i < res.body.length; i++) {
                        if (i === 0) {
                            list = res.body[i];

                            elementHandler.toBeEqual(list.provider_id, pro_id);
                            common.readOrWriteJsonFile('provider', 'worker_requests', 'logs_id', list.id)

                            return;
                        }
                    }
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, workerSuccess);
                }
            });
    });

    it('GET / worker_request', function (done) {
        const log_id = common.searchOfEnv('provider', 'worker_requests', 'logs_id');

        providers.worker('/' + log_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                } else {
                    if (res.body.id === log_id) {
                        elementHandler.toBeEqual(res.body.id, log_id);

                        addContext(this, 'Worker requests: ' + res.body.id);
                    }
                    // elementHandler.schemaValidate(res.body, workerSuccess);
                }
                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                done();
            });
    });

    it('GET / logging', function (done) {
        const log_id = common.searchOfEnv('provider', 'worker_requests', 'logs_id');

        providers.logging(log_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                } else {
                    common.tryDelay(5000);
                    
                    for (const obj of res.body) {
                        if (obj.id === log_id) {
                            elementHandler.toBeEqual(obj.id, log_id);
                            console.log('logging status: ', obj.status);
                            addContext(this, 'Logging id or status: ' + [obj.id, obj.status]);
                        }
                    }
                }
                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, loggingSuccess);
                done();
            });
    });
});