const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');


class App {
    appType(query) {
        const url = config.prefix + api.appTypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    registries(query) {
        const url = config.prefix + api.registries + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    deploy(query) {
        const url = config.prefix + api.deploy + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    repositories(query) {
        const url = config.prefix + api.repositories + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    buildType(query) {
        const url = config.prefix + api.buildTypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    env(query) {
        const url = config.prefix + api.envs + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    k8services(query) {
        const url = config.prefix + api.k8 + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    create(param) {
        const url = config.prefix + api.app;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    //pipeline releated API's
    branchs(query) {
        const url = config.prefix + api.branches + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    cluster(query) {
        const url = config.prefix + api.cluster + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    newdeploy(param) {
        const url = config.prefix + api.newdeploy;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    tag(query) {
        const url = config.prefix + api.tags + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    runs(query) {
        const url = config.prefix + api.runs + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    pipelineRun(query) {
        const url = config.prefix + api.pipelineruns + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    get(query) {
        const url = config.prefix + api.app + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    releaseStapType(query) {
        const url = config.prefix + api.releasestaptype + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    createRelease(param) {
        const url = config.prefix + api.release;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    catalog(query) {
        const url = config.prefix + api.catalog + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    appcluster(query) {
        const url = config.prefix + api.appclusters + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    namespaces(query) {
        const url = config.prefix + api.namespaces + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    charts(query) {
        const url = config.prefix + api.chart + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    helmReleases(param) {
        const url = config.prefix + api.helmreleases;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    pipeline(query) {
        const url = config.prefix + api.pipeline + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    appPipeline(param) {
        const url = config.prefix + api.pipelines;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    appEnv(query) {
        const url = config.prefix + api.appenv + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    deleteAppWorkspace() {
        const url = config.prefix + api.appworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    allapps(query) {
        const url = config.prefix + api.allapps + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postAppWorkspace(param) {
        const url = config.prefix + api.appworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    put(param, query) {
        const url = config.prefix + api.app + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    appTemplate(query) {
        const url = config.prefix + api.apptemplates + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new App();