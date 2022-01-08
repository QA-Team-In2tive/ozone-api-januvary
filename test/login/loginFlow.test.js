const login = require('../../collections/login');
const query = require('../../config/query');
const constants = require('../../config/constants');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const elementHandler = require('../../utility/elementHandler');

const accountSuccess = require('../../schemaValidate/account.success');
const loginSuccess = require('../../schemaValidate/login.success');
const checkSuccess = require('../../schemaValidate/check.success');
const workspaceSuccess = require('../../schemaValidate/workspace.success');
const success = require('../../schemaValidate/commonSchema/success');
const param = require('../../paramaters/param');

const addContext = require('mochawesome/addContext');

describe('Login flow test csse', () => {
    it('GET /accounts', function (done) {
        login.accountName('?id=' + param.accountQuery())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toBeEqual(res.body[0].provider_name, constants.ACCOUNT);
                elementHandler.schemaValidate(res.body, accountSuccess);

                console.log("account name:", res.body[0].provider_name);

                for (const obj of res.body) {
                    addContext(this, 'Account name: ' + obj.provider_name);
                }
                done();
            });
    });

    it('POST /login', function (done) {
        login.login()
            .set('X-BrowserFingerprint', 'd994f4bfa468673bfaa8d5016716543e')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toBeEqual(res.body.username, process.env.username);
                elementHandler.schemaValidate(res.body, loginSuccess);

                // set token value in the env variable 
                common.readOrWriteJsonFile('login', 'login', 'token', res.body.token);

                console.log("login id:", res.body.username);
                console.log("login token:", res.body.token);

                addContext(this, 'Login: ' + [res.body.username, res.body.token]);
                done();
            });
    });

    it('GET /defaultworkspace', function (done) {
        login.workspace(query.queryParam)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, workspaceSuccess);

                // set workspace id and name in the env variable 
                let result = common.forOf(res.body, constants.WORKSPACE);
                if (result) {
                    elementHandler.toBeEqual(result.name, constants.WORKSPACE)
                    common.readOrWriteJsonFile('login', 'workspace', 'id', result.id);
                    common.readOrWriteJsonFile('login', 'workspace', 'name', result.name);

                    console.log('workspace id:', result.id);
                    console.log('workspace name:', result.name);

                    addContext(this, 'Workspace: ' + [result.id, result.name]);
                    done();
                }
            });
    });

    it('GET /check', function (done) {
        const token = common.searchOfEnv('login', 'login', 'token');

        login.check()
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toBeEqual(res.body.email_verified, constants.email_verified);
                elementHandler.schemaValidate(res.body, checkSuccess);
                elementHandler.toBeEqual(res.body.token, token);

                console.log('login check token:', res.body.token);

                addContext(this, 'Login check: ' + [res.body.email_verified, res.body.token]);
                done();
            });
    });

    it('DELETE / logout', function (done) {
        login.logout()
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.toBeEqual(res.body.message, constants.LOGOUT);
                elementHandler.schemaValidate(res.body, success);

                console.log('logout client:', res.body.message);

                addContext(this, 'Logout: ' + res.body.message)
                done();
            });
    });
});
