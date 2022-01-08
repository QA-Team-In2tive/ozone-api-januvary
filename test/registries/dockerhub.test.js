const login = require('../../collections/login');
const providers = require('../../collections/providers');
const registries = require('../../collections/registries');
const constants = require('../../config/constants');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const elementHandler = require('../../utility/elementHandler');
const checkSuccess = require('../../schemaValidate/check.success');
const query = require('../../config/query');

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

describe('Create docker hub registry test case', () => {
    it('LIST /provider/types', function (done) {
        providers.types(query.types + '&sub_category_id=2')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.DOCKER) {
                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.DOCKER);

                        //set provider type id and name in the env variable
                        common.readOrWriteJsonFile('registry', 'provider_type', 'id', obj.id);
                        common.readOrWriteJsonFile('registry', 'provider_type', 'name', obj.name);

                        console.log('Docker hub registry provider type id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Docker hub registry provider type id and name: ' + [obj.id, obj.name]);
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

                console.log('Docker hub registry provider id and name: ', [id, name]);
                addContext(this, 'Docker hub registry provider id and name: ' + [id, name]);

                done();
            });
    });

    it('POST /registry', function (done) {
        const param = {
            'provider_type_id': common.searchOfEnv('registry', 'provider_type', 'id'),
            'name': 'dockerhub-' + common.getSmallCharStr(2),
            'provider_id': common.searchOfEnv('registry', 'provider_id', 'id')
        }

        registries.create(param)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                // create docker hub registry id and name set in env file
                common.readOrWriteJsonFile('registry', 'registry_details', 'id', res.body.id);
                common.readOrWriteJsonFile('registry', 'registry_details', 'name', res.body.name);

                console.log('Docker hub creation registry id and name: ', [res.body.id, res.body.name]);
                addContext(this, 'Docker hub creation registry id and name: ' + [res.body.id, res.body.name]);

                done();
            });
    });
});
