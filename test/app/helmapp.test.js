const app = require('../../collections/app');
const elementHandler = require('../../utility/elementHandler');
const logs = require('../../utility/logs');
const constants = require('../../config/constants');
const query = require('../../config/query');
const common = require('../../utility/common');
const login = require('../../collections/login');
const checkSuccess = require('../../schemaValidate/check.success');
const addContext = require('mochawesome/addContext');
const param = require('../../paramaters/param');

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

describe('Create helm application test case', () => {
    it('GET / app_types', function (done) {
        app.appType(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.HELM_APP) {
                        common.readOrWriteJsonFile('app', 'helm_app', 'type_id', obj.id);
                        common.readOrWriteJsonFile('app', 'helm_app', 'type_name', obj.name);

                        elementHandler.toBeEqual(obj.name, constants.HELM_APP);

                        console.log('Helm app type id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Helm app type id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET / env', function (done) {
        app.env(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.ENV_NAME) {
                        common.readOrWriteJsonFile('app', 'custom_app', 'env_id', obj.id);
                        elementHandler.toBeEqual(obj.name, constants.ENV_NAME);

                        console.log('Helm app env id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Helm app env id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /catalog', function (done) {
        app.catalog(query.queryParam + "&type=helm")
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.CATALOG) {
                        common.readOrWriteJsonFile('app', 'helm_app', 'catalog_id', obj.id);
                        elementHandler.toBeEqual(obj.name, constants.CATALOG);

                        console.log('Helm app catalog id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Helm app catalog id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('POST / helmapp', function (done) {
        app.create(param.helmApp())
            .end((err, res) => {
                if (res.statusCode !== constants.STATUS_CODE_201)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_201, res.res.statusMessage, constants.STATUS_TEXT_CREATED, res.ok);

                //helm app id set in the env variable
                common.readOrWriteJsonFile('app', 'helm_app', 'creation_id', res.body.id);
                common.readOrWriteJsonFile('app', 'helm_app', 'creation_name', res.body.name);

                console.log('Helm app creation id or name: ', [res.body.id, res.body.name]);
                addContext(this, 'Helm app creation id and name: ' + [res.body.id, res.body.name]);

                done();
            });
    });
});