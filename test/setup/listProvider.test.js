const constants = require('../../config/constants');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const checkSuccess = require('../../schemaValidate/check.success');
const providerSuccess = require('../../schemaValidate/provider.success');
const elementHandler = require('../../utility/elementHandler');
const providers = require('../../collections/providers');
const login = require('../../collections/login');
const query = require('../../config/query');

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

describe('List providers test case', () => {
    it('GET / provider', () => {
        return providers.types(query.queryParam)
            .then((res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    // elementHandler.schemaValidate(res.body, providerSuccess);

                    for (const obj of res.body) {
                        console.log(obj.name);
                    }
                }
            })
    });
});