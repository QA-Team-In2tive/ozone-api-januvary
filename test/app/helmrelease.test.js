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

describe('Create helm release test case', () => {
    it('GET /app/clusters', function (done) {
        const app_id = common.searchOfEnv('app', 'helm_app', 'creation_id');

        app.appcluster(query.queryParam + '&application_id=' + app_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.CLUSTER_NAME) {
                        elementHandler.toBeEqual(obj.name, constants.CLUSTER_NAME);

                        common.readOrWriteJsonFile('app', 'cluster', 'id', obj.id);
                        common.readOrWriteJsonFile('app', 'cluster', 'name', obj.name);

                        console.log('Helm release cluster id and name: ', [obj.id, obj.name]);
                        addContext(this, 'Helm release cluster id and name: ' + [obj.id, obj.name]);
                    }
                }
                done();
            });
    });

    it('GET /helm/chartversions', function (done) {
        const catalog_id = common.searchOfEnv('app', 'helm_app', 'catalog_id');

        app.charts(query.queryParam + '&catalog_id=' + catalog_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                let id = res.body[0].id;
                common.readOrWriteJsonFile('app', 'helm_app', 'chart_id', id);

                console.log('Helm release chart version id: ', [id]);
                addContext(this, 'Helm release chart version id: ' + [id]);

                done();
            });
    });

    it('GET /kube/dynamicresources/namespaces', function (done) {
        const cluster_id = common.searchOfEnv('app', 'cluster', 'id');

        app.namespaces(query.queryParam + '&cluster_id=' + cluster_id)
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.getApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                for (const obj of res.body) {
                    if (obj.name === constants.NAMESPACE_NAME) {
                        elementHandler.toBeEqual(obj.name, constants.NAMESPACE_NAME);

                        common.readOrWriteJsonFile('app', 'helm_app', 'namespace_name', obj.name);

                        console.log('Helm release namespace name: ', [obj.name]);
                        addContext(this, 'Helm release namespace name: ' + [obj.name]);
                    }
                }
                done();
            });
    });

    it('POST /app/helm_releases', function (done) {
        app.helmReleases(param.helmRelease())
            .end((err, res) => {
                if (res.statusCode !== 200)
                    logs.postApiResponse(res);

                elementHandler.responseExpect(res.body, res.statusCode, 200, res.res.statusMessage, constants.STATUS_TEXT_OK, res.ok);

                console.log('Helm release: ', [res.body.message]);
                addContext(this, 'Helm release: ' + [res.body.message]);

                done();
            });
    });
});