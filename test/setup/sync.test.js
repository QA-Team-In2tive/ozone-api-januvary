const providers = require('../../../collections/providers');
const logs = require('../../../utility/logs');
const common = require('../../../utility/common');
const elementHandler = require('../../../utility/elementHandler');
const constants = require('../../../config/constants');
const login = require('../../../collections/login');
const checkSuccess = require('../../../schemaValidate/check.success');
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

describe('Sync provider test case', () => {
    it('POST / provider/sync', function (done) {
        providers.sync()
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    addContext(this, 'Suync provider: ' + res.body);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, 'published');

                    addContext(this, 'Sync provider: ' + res.body.message);
                }
                done();
            });
    });
});