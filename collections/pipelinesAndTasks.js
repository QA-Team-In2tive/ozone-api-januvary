const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * define for pipelines and tasks GET, PUT, POST and DELETE methods API's call 
 */
class PipelinesAndTasks {
    get(query) {
        const url = config.prefix + api.pipeline + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    create(param) {
        const url = config.prefix + api.pipeline;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    update(param, query) {
        const url = config.prefix + api.pipeline + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    delete() {
        const url = config.prefix + api.pipelinesworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postPipelinesWorkspace(param) {
        const url = config.prefix + api.pipelinesworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    clone(param) {
        const url = config.prefix + api.pipelineclone;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    allpipelines(query) {
        const url = config.prefix + api.allpipelines + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    templatestypes(query) {
        const url = config.prefix + api.templatestypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    paramtypes(query) {
        const url = config.prefix + api.paramtypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    format(query) {
        const url = config.prefix + api.format + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    getTemplates(query) {
        const url = config.prefix + api.templates + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postTemplates(param) {
        const url = config.prefix + api.templates;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    putTemplates(param, query) {
        const url = config.prefix + api.templates + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    deleteTemplatesWorkspace() {
        const url = config.prefix + api.templatesworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    alltemplates(query) {
        const url = config.prefix + api.alltemplates + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postTemplatesWorkspace(param) {
        const url = config.prefix + api.templatesworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new PipelinesAndTasks();