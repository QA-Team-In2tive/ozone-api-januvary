const providers = require('../../../collections/providers');
const param = require('../../../paramaters/param');
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

describe('Remove form workspace provider test case', () => {
    it('DELETE / provider/providerworkspace', function (done) {
        providers.deleteWorkspace()
            .send(param.deleted())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.deleteApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, 'Successful');
                    addContext(this, 'Remove from workspace: ' + res.body.message);
                }
                done();
            });
    });
});