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

describe('Create ingress type custom application test case', () => {
    it('GET /app/apps_types', function (done) {
        app.appType(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.CUSTOM_APP) {
                        common.readOrWriteJsonFile('app', 'custom_app', 'app_type_id', obj.id);
                        elementHandler.toBeEqual(obj.name, constants.CUSTOM_APP);

                        console.log('Custom app type id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Custom app type id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /registry', function (done) {
        const name = common.searchOfEnv('registry', 'registry_details', 'name');

        app.registries(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === name) {
                        common.readOrWriteJsonFile('app', 'custom_app', 'registry_id', obj.id);
                        elementHandler.toBeEqual(obj.name, name);

                        console.log('Custom app registries id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Custom app registries id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /app/deploy_types', function (done) {
        app.deploy(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.DEPLOY_NAME) {
                        common.readOrWriteJsonFile('app', 'custom_app', 'deploy_id', obj.id);
                        elementHandler.toBeEqual(obj.name, constants.DEPLOY_NAME);

                        console.log('Custom app deploy id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Custom app deploy id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /app/k8servicetypes', function (done) {
        app.k8services(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === 'Ingress') {
                        common.readOrWriteJsonFile('app', 'custom_app', 'service_type', obj.id);
                        elementHandler.toBeEqual(obj.name, 'Ingress');

                        console.log('Custom app k8 services id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Custom app k8 services id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /repository', function (done) {
        app.repositories(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.REPO_NAME) {
                        common.readOrWriteJsonFile('app', 'custom_app', 'repository_id', obj.id);
                        elementHandler.toBeEqual(obj.name, constants.REPO_NAME);

                        console.log('Custom app repositories id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Custom app repositories id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /app/build_types', function (done) {
        app.buildType(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.BUILD_NAME) {
                        common.readOrWriteJsonFile('app', 'custom_app', 'build_id', obj.id);
                        elementHandler.toBeEqual(obj.name, constants.BUILD_NAME);

                        console.log('Custom app build id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Custom app build id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /env', function (done) {
        app.env(query.app)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                for (const obj of res.body) {
                    if (obj.name === constants.ENV_NAME) {
                        common.readOrWriteJsonFile('app', 'custom_app', 'env_id', obj.id);
                        elementHandler.toBeEqual(obj.name, constants.ENV_NAME);

                        console.log('Custom app env id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Custom app env id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('POST /app', function (done) {
        app.create(param.ingressCustomApp())
            .end((err, res) => {
                if (res.statusCode !== constants.STATUS_CODE_201)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, constants.STATUS_CODE_201, res.res.statusMessage, constants.STATUS_TEXT_CREATED, res.ok);

                const name = common.searchOfEnv('app', 'custom_app', 'name');
                if (res.body.name === name) {
                    //app id set in the env variable
                    common.readOrWriteJsonFile('app', 'custom_app', 'id', res.body.id);

                    //pipelines id set in env variable
                    //push-pipeline
                    common.readOrWriteJsonFile('app', 'pipelines', '0', res.body.pipelines[0].id);
                    //push-set-deployment-image
                    common.readOrWriteJsonFile('app', 'pipelines', '1', res.body.pipelines[1].id);
                    //template-deploy
                    common.readOrWriteJsonFile('app', 'pipelines', '2', res.body.pipelines[2].id);
                    //set-deployment-image
                    common.readOrWriteJsonFile('app', 'pipelines', '3', res.body.pipelines[3].id);
                    //templates-deploy-pipeline
                    common.readOrWriteJsonFile('app', 'pipelines', '4', res.body.pipelines[4].id);

                    elementHandler.toBeEqual(res.body.name, name);

                    console.log('Custom app creation id or name: ', [res.body.id, res.body.name]);
                    addContext(this, 'Custom app creation id and name: ' + [res.body.id, res.body.name]);
                }
                done();
            });
    });
});