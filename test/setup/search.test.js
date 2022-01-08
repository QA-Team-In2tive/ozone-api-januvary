const providers = require('../../../collections/providers');
const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const logs = require('../../../utility/logs');
const elementHandler = require('../../../utility/elementHandler');
const getproviderSuccess = require('../../../schemaValidate/getprovider.success');
const checkSuccess = require('../../../schemaValidate/check.success');
const login = require('../../../collections/login');
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

describe('Search provider name test case', () => {
    it('GET / provider', function (done) {
        const name = common.searchOfEnv('provider', 'provider_details', 'name');

        providers.get('?name=' + name)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                } else {
                    for (const obj of res.body) {
                        if (obj.name === name) {
                            elementHandler.toBeEqual(obj.name, name);
                            addContext(this, 'Search provider name: ' + obj.name)
                        }
                    }
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, getproviderSuccess);
                }
                done();
            });
    });
});