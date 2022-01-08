const constants = require('../config/constants');
const login = require('../collections/login');
const common = require('../utility/common');
const logs = require('../utility/logs');
const elementHandler = require('../utility/elementHandler');
const loginSuccess = require('../schemaValidate/login.success');
const addContext = require('mochawesome/addContext');
const query = require('../config/query');
const workspaceSuccess = require('../schemaValidate/workspace.success');
const accountSuccess = require('../schemaValidate/account.success');
const api = require('../config/api');

describe('Login test case', () => {
    it('GET /accounts/oauth', function (done) {
        login.accountName('?id=' + process.env.account_name)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    addContext(this, 'Error: ' + err);
                }

                if (res.statusCode !== 200) {
                    logs.postApiResponse(res);
                    addContext(this, 'Login error: ' + logs.postApiResponse(res));
                }

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, accountSuccess);

                for (const obj of res.body) {
                    if (obj.id == constants.ACCOUNT_ID) {
                        common.readOrWriteJsonFile('login', 'account_name', 'id', obj.id);
                        common.readOrWriteJsonFile('login', 'account_name', 'name', obj.provider_name);
                        common.readOrWriteJsonFile('login', 'account_name', 'url', obj.login_url);

                        console.log('Account id and name: ', [obj.id, obj.provider_name]);
                        addContext(this, 'Account id and name: ' + [obj.id, obj.provider_name]);
                    }
                }
                done();
            })
    });

    it('POST /api/auth/login', function (done) {
        login.login(api.login)
            .end((err, res) => {
                if (err)
                    console.log(err);

                if (res.statusCode !== 200) {
                    logs.postApiResponse(res);
                    addContext(this, 'Login response: ' + [res.body.message, res.res.statusMessage,]);
                }

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, loginSuccess);

                // set token value in the env variable 
                common.readOrWriteJsonFile('login', 'login', 'token', res.body.token);

                console.log('Login details: ', [res.request.url, res.body.username, res.body.token, res.body.email_verified]);
                addContext(this, 'Login details: ' + [res.request.url, res.body.username, res.body.token, res.body.email_verified]);
                done();
            });
    });

    it('GET /defaultworkspace', function (done) {
        login.workspace(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== 200) {
                    logs.getApiResponse(res);
                    addContext(this, 'Login response: ' + [res.body.message, res.res.statusMessage,]);
                }

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, workspaceSuccess);

                // set workspace id and name in the env variable 
                for (const obj of res.body) {
                    if (obj.name === constants.WORKSPACE) {
                        elementHandler.toBeEqual(obj.name, constants.WORKSPACE);
                        common.readOrWriteJsonFile('login', 'workspace', 'id', obj.id);
                        common.readOrWriteJsonFile('login', 'workspace', 'name', obj.name);

                        console.log('Project id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Project id and name: ' + [obj.id, obj.name]);

                        continue
                    }
                }
                done();
            });
    });
});