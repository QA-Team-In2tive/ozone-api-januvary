const login = require('../../../collections/login');
const providers = require('../../../collections/providers');
const constants = require('../../../config/constants');
const common = require('../../../utility/common');
const logs = require('../../../utility/logs');
const elementHandler = require('../../../utility/elementHandler');
const checkSuccess = require('../../../schemaValidate/check.success');
const query = require('../../../config/query');
const addContext = require('mochawesome/addContext');
const repositories = require('../../../collections/repositories');

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

describe('Repository GET, POST, PUT and DELETE test case', () => {
    describe('Create Repository', () => {
        it('LIST /provider/types', function (done) {
            providers.types(query.types + '&sub_category_id=1')
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.name === constants.GITHUB_TYPE_NAME) {
                            elementHandler.toBeTrue(obj.enabled);
                            elementHandler.toBeEqual(obj.name, constants.GITHUB_TYPE_NAME);

                            //set provider type id and name in the env variable
                            common.readOrWriteJsonFile('repository', 'provider_type', 'id', obj.id);
                            common.readOrWriteJsonFile('repository', 'provider_type', 'name', obj.name);

                            console.log('Repository provider type id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Repository provider type id and name: ' + [obj.id, obj.name]);
                        }
                    }

                    done();
                });
        });

        it('GET /provider', function (done) {
            const provider_type_id = '&provider_type_id=' + common.searchOfEnv('repository', 'provider_type', 'id');

            providers.get(query.queryParam + provider_type_id)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    let id = res.body[0].id;
                    let name = res.body[0].name;
                    
                    // set provider id and name in env variable
                    common.readOrWriteJsonFile('repository', 'provider_id', 'id', id);
                    common.readOrWriteJsonFile('repository', 'provider_id', 'name', name);

                    console.log('Repository provider id and name: ', [id, name]);
                    addContext(this, 'Repository provider id and name: ' + [id, name]);

                    done();
                });
        });

        it('POST /repository', function (done) {
            const param = {
                'provider_type_id': common.searchOfEnv('repository', 'provider_type', 'id'),
                'name': 'github-' + common.getSmallCharStr(2),
                'provider_id': common.searchOfEnv('repository', 'provider_id', 'id'),
                'description': 'This is add github repository'
            }

            repositories.create()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    // create github repository id and name set in env file
                    common.readOrWriteJsonFile('repository', 'repository_details', 'id', res.body.id);
                    common.readOrWriteJsonFile('repository', 'repository_details', 'name', res.body.name);

                    console.log('Create repository id and name: ', [res.body.id, res.body.name]);
                    addContext(this, 'Create repository id and name: ' + [res.body.id, res.body.name]);

                    done();
                });
        });
    });

    describe('Delete Repository', () => {
        it('DELETE /repository/repositoryworkspace', function (done) {
            const param = { 'id': common.searchOfEnv('repository', 'repository_details', 'id') }

            repositories.deleteRepositoryWorkspace()
                .send(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.deleteApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Delete repository message: ', [res.body.message]);
                    addContext(this, 'Delete repository message: ' + [res.body.message]);
                    done();
                });
        });
    });

    describe('Add Repository To Project', () => {
        it('GET /repository/allrepositories', function (done) {
            const repo_id = common.searchOfEnv('repository', 'repository_details', 'id');

            repositories.allrepositories(query.queryParam)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    for (const obj of res.body) {
                        if (obj.id === repo_id) {
                            console.log('Get repository id and name: ', [obj.id, obj.name]);
                            addContext(this, 'Get repository id and name: ' + [obj.id, obj.name]);
                        }
                    }
                    done();
                });
        });

        it('POST /repository/repositoryworkspace', function (done) {
            const repo_id = common.searchOfEnv('repository', 'repository_details', 'id');
            const param = { 'id': repo_id }

            repositories.postRepositoryWorkspace(param)
                .end((err, res) => {
                    if (res.statusCode !== 200)
                        logs.postApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.message, constants.SUCCESS);

                    console.log('Add repository to project message: ', [res.body.message]);
                    addContext(this, 'Add repository to project message: ' + [res.body.message]);
                    done();
                });
        });
    });
});
