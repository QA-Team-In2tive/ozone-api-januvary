const login = require('../../collections/login');
const providers = require('../../collections/providers');
const constants = require('../../config/constants');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const elementHandler = require('../../utility/elementHandler');
const checkSuccess = require('../../schemaValidate/check.success');
const typeSuccess = require('../../schemaValidate/type.success');
const accessTypeSuccess = require('../../schemaValidate/accesstype.success');
const regionSuccess = require('../../schemaValidate/regions.success');
const createProSuccess = require('../../schemaValidate/create.success');

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

describe('Create AWS provider test case', () => {
    it('GET / provider/types', function (done) {
        providers.types('?id=1')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, typeSuccess);

                for (const obj of res.body) {
                    if (obj.name === constants.AWS) {
                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.AWS);

                        //set provider type id and name in the env variable
                        common.readOrWriteJsonFile('provider', 'provider_type', 'id', obj.id);
                        common.readOrWriteJsonFile('provider', 'provider_type', 'name', obj.name);

                        addContext(this, 'Provider type:' + [obj.id, obj.name]);
                    }
                }

                done();
            });
    });

    it('GET / provider/access_types', function (done) {
        const provider_type_id = '?provider_type_id=' + common.searchOfEnv('provider', 'provider_type', 'id');

        providers.accessType(provider_type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, accessTypeSuccess);

                for (const obj of res.body) {
                    if (obj.name === 'Credentials') {
                        elementHandler.toBeEqual(obj.name, 'Credentials');

                        //set access type id and name in env variable
                        common.readOrWriteJsonFile('provider', 'access_type', 'id', obj.id);
                        common.readOrWriteJsonFile('provider', 'access_type', 'name', obj.name);

                        addContext(this, 'Access type: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET / provider/regions', function (done) {
        providers.region('?id=5')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, regionSuccess);

                for (const obj of res.body) {
                    if (obj.region_name === constants.AWS_Region) {

                        elementHandler.toBeEqual(obj.region_name, constants.AWS_Region);

                        //set region id and name in env file
                        common.readOrWriteJsonFile('provider', 'region', 'id', obj.id);
                        common.readOrWriteJsonFile('provider', 'region', 'name', obj.region_name);

                        addContext(this, 'Provider region: ' + [obj.id, obj.region_name]);
                    }
                }
                done();
            });
    });

    it('POST / provider', function (done) {
        const param = {
            "access_key": process.env.Access_Key,
            "secret_key": process.env.Secret_Key,
            "default_region_id": common.searchOfEnv('provider', 'region', 'id')
        }

        providers.create()
            .send(param)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.schemaValidate(res.body, createProSuccess);

                    // create provider id and name set in env file
                    common.readOrWriteJsonFile('provider', 'provider_details', 'id', res.body.id);
                    common.readOrWriteJsonFile('provider', 'provider_details', 'name', res.body.name);

                    addContext(this, 'Create provider: ' + [res.body.id, res.body.name]);
                }

                done();
            });
    });
});
