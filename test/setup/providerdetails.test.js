const login = require('../../collections/login');
const providers = require('../../collections/providers');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const elementHandler = require('../../utility/elementHandler');
const constants = require('../../config/constants');
const members = require('../../collections/members');
const checkSuccess = require('../../schemaValidate/check.success');
const providerdetailsSuccess = require('../../schemaValidate/providerdetails.success');
const typeSuccess = require('../../schemaValidate/type.success');
const accesstypeSuccess = require('../../schemaValidate/accesstype.success');
const memberSuccess = require('../../schemaValidate/member.success');
const credentialsSuccess = require('../../schemaValidate/credentials.success');
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

describe('Provider details test case', () => {
    it('GET / provider', function (done) {
        const provider_id = common.searchOfEnv('provider', 'provider_details', 'id');

        providers.get('/' + provider_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                if (common.isEmpty(res.body)) {
                    console.log('response body: ', res.body);
                } else {
                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                    elementHandler.toBeEqual(res.body.id, provider_id);

                    common.readOrWriteJsonFile('provider', 'get_provider', 'id', res.body.id);
                    common.readOrWriteJsonFile('provider', 'get_provider', 'type_id', res.body.provider_type_id);
                    common.readOrWriteJsonFile('provider', 'get_provider', 'access_type', res.body.access_type_id);
                    common.readOrWriteJsonFile('provider', 'get_provider', 'member_id', res.body.created_by_id);

                    addContext(this, 'Get provider');
                    addContext(this, 'id: ' + res.body.id);
                    addContext(this, 'type_id: ' + res.body.provider_type_id);
                    addContext(this, 'access_type: ' + res.body.access_type_id);
                    addContext(this, 'member_id: ' + res.body.created_by_id);

                    elementHandler.schemaValidate(res.body, providerdetailsSuccess);
                }
                done();
            });
    });

    it('GET / provider/type', function (done) {
        const type_id = common.searchOfEnv('provider', 'get_provider', 'type_id');

        providers.types('?id=' + type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, typeSuccess);

                for (const obj of res.body) {
                    if (obj.id === type_id) {
                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.AWS);

                        addContext(this, 'Provider enabled or type: ' + [obj.enabled, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET / provider/access_type', function (done) {
        const access_type = common.searchOfEnv('provider', 'get_provider', 'access_type');

        providers.accessType('?id=' + access_type)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, accesstypeSuccess);

                for (const obj of res.body) {
                    if (obj.id === access_type) {
                        elementHandler.toBeEqual(obj.name, constants[2]);

                        addContext(this, 'Access type id or name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET / member', function (done) {
        const member_id = common.searchOfEnv('provider', 'get_provider', 'member_id');

        members.get('?id=' + member_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, memberSuccess);

                for (const obj of res.body) {
                    if (obj.id === member_id) {
                        elementHandler.toBeEqual(obj.id, member_id);
                        addContext(this, 'Member id or name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET / provider/credentials', function (done) {
        const pro_id = common.searchOfEnv('provider', 'get_provider', 'id');

        providers.getCredentials('?id=' + pro_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                elementHandler.schemaValidate(res.body, credentialsSuccess);

                for (const obj of res.body) {
                    if (obj.id === pro_id) {
                        elementHandler.toBeEqual(obj.id, pro_id);
                        addContext(this, 'Credentials id: ' + obj.id);
                    }
                }
                done();
            });
    });
});