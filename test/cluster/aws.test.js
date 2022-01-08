const login = require('../../collections/login');
const providers = require('../../collections/providers');
const clusters = require('../../collections/clusters');
const constants = require('../../config/constants');
const common = require('../../utility/common');
const logs = require('../../utility/logs');
const elementHandler = require('../../utility/elementHandler');
const query = require('../../config/query');
const checkSuccess = require('../../schemaValidate/check.success');
const param = require('../../paramaters/param');

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

describe('Create AWS cloud cluster test case', () => {
    it('List / provider/types', function (done) {
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
                        common.readOrWriteJsonFile('cluster', 'provider_type', 'id', obj.id);
                        common.readOrWriteJsonFile('cluster', 'provider_type', 'name', obj.name);

                        console.log('Cluster provider type id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Cluster provider type id and name: ' + [obj.id, obj.name]);
                    }
                }

                done();
            });
    });

    it('List / provider', function (done) {
        const provider_type_id = '&provider_type_id=' + common.searchOfEnv('cluster', 'provider_type', 'id');

        providers.get(query.queryParam + provider_type_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                let id = res.body[0].id;
                let name = res.body[0].name;

                common.readOrWriteJsonFile('cluster', 'provider_id', 'id', id);
                common.readOrWriteJsonFile('cluster', 'provider_id', 'name', name);

                console.log('Cluster provider id and name: ', [id, name]);
                addContext(this, 'Cluster provider id and name: ' + [id, name]);

                done();
            });
    });

    it('List / provider/regions', function (done) {
        providers.region('?id=5')
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.region_name === constants.AWS_Region) {
                        elementHandler.toBeEqual(obj.region_name, constants.AWS_Region);

                        //set region id and name in env file
                        common.readOrWriteJsonFile('cluster', 'region', 'id', obj.id);
                        common.readOrWriteJsonFile('cluster', 'region', 'name', obj.region_name);

                        console.log('Cluster region id and name: ', [obj.id, obj.region_name]);
                        addContext(this, 'Cluster region id and name: ' + [obj.id, obj.region_name]);
                    }
                }
                done();
            });
    });

    it('List / provider/nodetype', function (done) {
        const ids = '&provider_id=' + common.searchOfEnv('cluster', 'provider_id', 'id') +
            '&provider_type_id=' + common.searchOfEnv('cluster', 'provider_type', 'id') +
            '&region=' + common.searchOfEnv('cluster', 'region', 'id');

        clusters.nodeType(query.queryParam + ids)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.NODE_TYPE_AWS) {
                        elementHandler.toBeEqual(obj.name, constants.NODE_TYPE_AWS);

                        //set region id and name in env file
                        common.readOrWriteJsonFile('cluster', 'nodetype', 'id', obj.id);
                        common.readOrWriteJsonFile('cluster', 'nodetype', 'name', obj.name);

                        console.log('Cluster nodetype id and name: ' + [obj.id, obj.name]);
                        addContext(this, 'Cluster nodetype id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('POST / cluster', function (done) {
        clusters.create(param.clusterAWSCreation())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);
                common.readOrWriteJsonFile('cluster', 'creation', 'id', res.body.clusterID.split(" "));

                console.log('AWS cluster creation id: ', [res.body.clusterID]);
                addContext(this, 'AWS cluster creation id: ' + res.body.clusterID);

                done();
            });
    });

    it('GET / cluster', async () => {
        const id = common.searchOfEnv('cluster', 'creation', 'id');

        let count = 1;
        for (let index = 0; index < count; index++) {
            await clusters.get('/' + id[0].replace(/["']/g, ""))
                .then((res) => {
                    if (res.statusCode !== 200)
                        logs.getApiResponse(res);

                    elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                    // Add delay time 5s
                    common.tryDelay(5000);
                    let resp = res.body;

                    // Set cluster creation status, created_at and updated_at date response in json file
                    common.updateJsonFile('status', resp.status);
                    common.updateJsonFile('created_at', resp.created_at);
                    common.updateJsonFile('updated_at', resp.updated_at);

                    // get cluster response status in json file through
                    const status = common.getJsonFile('status');
                    const updated_at = common.getJsonFile('updated_at');
                    const created_at = common.getJsonFile('created_at');

                    var endTime = updated_at instanceof Date ? updated_at : new Date(updated_at);
                    var startTime = created_at instanceof Date ? created_at : new Date(created_at);

                    const value = updated_at !== null ? updated_at : null;
                    if (value) {
                        const seconds = Math.abs(endTime - startTime) / 1000;
                        const min = Math.floor((Math.abs(endTime - startTime) / 1000) / 60);

                        console.log('Cluster creation time: ', seconds + 's - ' + min + 'm');
                        console.log('Cluster status: ', status);
                    } else {
                        count += 1;
                        console.log('Cluster creation status: ', status);
                    }
                });
        }
    });
});
