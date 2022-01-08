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

describe('Create Amazon Web Service registry test case', () => {
    it('LIST /provider/types', function (done) {
        providers.types(query.types + '&sub_category_id=5')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.AWS) {
                        elementHandler.toBeTrue(obj.enabled);
                        elementHandler.toBeEqual(obj.name, constants.AWS);

                        //set provider type id and name in the env variable
                        common.readOrWriteJsonFile('registry', 'provider_type', 'id', obj.id);
                        common.readOrWriteJsonFile('registry', 'provider_type', 'name', obj.name);

                        console.log('Amazon Web Service registry provider type id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Amazon Web Service registry provider type id and name: ' + [obj.id, obj.name]);
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

                console.log('Amazon Web Service registry provider id and name: ', [id, name]);
                addContext(this, 'Amazon Web Service registry provider id and name: ' + [id, name]);

                done();
            });
    });

    it('LIST /provider/regions', function (done) {
        providers.region('?id=5')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.region_name === constants.AWS_Region) {
                        elementHandler.toBeEqual(obj.region_name, constants.AWS_Region);

                        //set region id and name in env file
                        common.readOrWriteJsonFile('registry', 'region', 'id', obj.id);
                        common.readOrWriteJsonFile('registry', 'region', 'name', obj.region_name);

                        console.log('Amazon Web Service registry region id and name: ', [obj.id, obj.region_name]);
                        addContext(this, 'Amazon Web Service registry region id and name: ' + [obj.id, obj.region_name]);
                    }
                }
                done();
            });
    });

    it('POST /registry', function (done) {
        const param = {
            'provider_type_id': common.searchOfEnv('registry', 'provider_type', 'id'),
            'name': 'aws-' + common.getSmallCharStr(2),
            'provider_id': common.searchOfEnv('registry', 'provider_id', 'id'),
            'region': common.searchOfEnv('registry', 'region', 'id'),
            "scan_on_push": true,
            "tag_immutability": true
        }

        registries.create(param)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                // create ECR registry id and name set in env file
                common.readOrWriteJsonFile('registry', 'registry_details', 'id', res.body.id);
                common.readOrWriteJsonFile('registry', 'registry_details', 'name', res.body.name);

                console.log('Amazon Web Service registry creation id and name: ', [res.body.id, res.body.name]);
                addContext(this, 'Amazon Web Service registry creation id and name: ' + [res.body.id, res.body.name]);

                done();
            });
    });
});
