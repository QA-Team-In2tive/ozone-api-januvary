const login = require('../../../collections/login');
const providers = require('../../../collections/providers');
const registries = require('../../../collections/registries');
const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const logs = require('../../../utility/logs');
const elementHandler = require('../../../utility/elementHandler');
const checkSuccess = require('../../../schemaValidate/check.success');
const query = require('../../../config/query');
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

describe('Registry GET, POST, PUT and DELETE test case', () => {
    describe('Create Registry', () => {
        it('LIST /provider/types', function (done) {
            providers.types(query.types + '&sub_category_id=2')
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.GCR) {
                            elementHandler.toBeTrue(obj.enabled);
                            elementHandler.toBeEqual(obj.name, constants.GCR);

                            //set provider type id and name in the env variable
                            common.readOrWriteJsonFile('registry', 'provider_type', 'id', obj.id);
                            common.readOrWriteJsonFile('registry', 'provider_type', 'name', obj.name);

                            console.log('Registry provider type id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Registry provider type id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('GET /provider', function (done) {
            const provider_type_id = '&provider_type_id=' + common.searchOfEnv('registry', 'provider_type', 'id');

            providers.get(query.queryParam + provider_type_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body[0].id;
                    let name = res.body[0].name;

                    // set provider id and name in env variable
                    common.readOrWriteJsonFile('registry', 'provider_id', 'id', id);
                    common.readOrWriteJsonFile('registry', 'provider_id', 'name', name);

                    console.log('Registry provider id and name: ', [id, name]);
                    addContext(this, 'Registry provider id and name: ' + [id, name]);
                    done();
                });
        });

        it('POST /registry', function (done) {
            const param = {
                'provider_type_id': common.searchOfEnv('registry', 'provider_type', 'id'),
                'name': 'gcr-' + common.getSmallCharStr(2),
                'provider_id': common.searchOfEnv('registry', 'provider_id', 'id'),
                'gcr_hosts': constants.GCP_REGI
            }

            registries.create(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    // create GCR registry id and name set in env file
                    common.readOrWriteJsonFile('registry', 'registry_details', 'id', res.body.id);
                    common.readOrWriteJsonFile('registry', 'registry_details', 'name', res.body.name);

                    console.log('Create registry id and name: ', [res.body.id, res.body.name]);
                    addContext(this, 'Create registry id and name: ' + [res.body.id, res.body.name]);
                    done();
                });
        });
    });

    describe('Delete Registry', () => {
        it('DELETE /registry/registryworkspace', function (done) {
            const param = { "id": common.searchOfEnv('registry', 'registry_details', 'id') }

            registries.deleteRegistryWorkspace()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.deleteApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Delete registry from project: ', [res.body.message]);
                    addContext(this, 'Delete registry from project: ' + [res.body.message]);
                    done();
                });
        });
    });

    describe('Add Registry To Project', () => {
        it('GET /registry/allregistries', function (done) {
            const regi_id = common.searchOfEnv('registry', 'registry_details', 'id');

            registries.allregistries(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === regi_id) {
                            console.log('Get registry id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Get registry id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /registry/registryworkspace', function (done) {
            const param = { 'id': common.searchOfEnv('registry', 'registry_details', 'id') }

            registries.postRegistryWorkspace(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Add registry to project: ', [res.body.message]);
                    addContext(this, 'Add registry to project: ' + [res.body.message]);
                    done();
                });
        });
    });
});
