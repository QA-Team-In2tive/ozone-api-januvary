const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const logs = require('../../../utility/logs');
const elementHandler = require('../../../utility/elementHandler');
const param = require('../../../paramaters/param');
const providers = require('../../../collections/providers');
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

describe('Edit provider test case', () => {
    it('PUT / provider', function (done) {
        const provider_id = common.searchOfEnv('provider', 'provider_details', 'id');

        providers.edit('/' + provider_id, param.edit())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.putApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.id, provider_id);

                    common.readOrWriteJsonFile('provider', 'provider_details', 'name', res.body.name);

                    addContext(this, 'Edit provider id or name: ' + [res.body.id, res.body.name]);
                }
                done();
            });
    });
});