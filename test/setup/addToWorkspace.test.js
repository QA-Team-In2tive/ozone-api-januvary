const constants = require('../../config/constants');
const query = require('../../config/query');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const elementHandler = require('../../utility/elementHandler');
const param = require('../../paramaters/param');
const login = require('../../collections/login');

const checkSuccess = require('../../schemaValidate/check.success');
const providers = require('../../collections/providers');
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

describe('Add to workspace provider test case', () => {
    it('GET / provider/allproviders', function (done) {
        const pro_name = common.searchOfEnv('provider', 'provider_details', 'name');

        providers.allproviders(query.all)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    // elementHandler.schemaValidate(res.body, getproviderSuccess);

                    for (const obj of res.body) {
                        if (obj.name === pro_name) {
                            common.readOrWriteJsonFile('provider', 'add_to_workspace', 'id', obj.id);
                            common.readOrWriteJsonFile('provider', 'add_to_workspace', 'name', obj.name);

                            addContext(this, 'Select provider id or name: ' + [obj.id, obj.name]);
                        }
                    } 
                    done();
                }
            });
    });

    it('POST / provider/providerworkspace', function (done) {
        providers.providerWorkspace(param.providerWorkspace())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, 'Successful');
                    addContext(this, 'Add to workspace: ' + res.body.message);
                }
                done();
            });
    });
});