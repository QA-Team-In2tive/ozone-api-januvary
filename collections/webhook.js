const api = require("../config/api");
const config = require("../config/config");
const common = require("../utility/common");
const requests = require("../utility/requests");

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

class Webhook {
    types(query) {
        const url = config.prefix + api.whtypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    actionTypes(query) {
        const url = config.prefix + api.whactiontypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    appTypes(query) {
        const url = config.prefix + api.triggertype + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    pipelines(query) {
        const url = config.prefix + api.pipelines + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    env(query) {
        const url = config.prefix + api.appenv + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    webhooks(param) {
        const url = config.prefix + api.webhooks;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    get(query) {
        const url = config.prefix + api.webhooks + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    webhookRequest(url, param) {
        return requests.webhookPOSTRequest("/api/webhooks" + url, param)
    }

    incomeRequest(query) {
        const url = config.prefix + api.incoming + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    pipelinerun(query) {
        const url = config.prefix + api.pipelinerun + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    release(query) {
        const url = config.prefix + api.release + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    repository(query) {
        const url = config.prefix + api.repositories + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    githubEventTypes(query) {
        const url = config.prefix + api.githubeventtypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    branch(query) {
        const url = config.prefix + api.branches + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    gitlabEventTypes(query) {
        const url = config.prefix + api.gitlabeventtypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    bitbucketEventTypes(query) {
        const url = config.prefix + api.bitbucketeventtypes + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    project(query) {
        const url = config.prefix + api.projects + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('X-workspace-id', id)
    }

    putWebhooks(param, query) {
        const url = config.prefix + api.webhooks + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    deleteWebhook() {
        const url = config.prefix + api.webhookworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    getAllwebhooks(query) {
        const url = config.prefix + api.allwebhooks + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postWebhookWorkspace(param) {
        const url = config.prefix + api.webhookworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
}

module.exports = new Webhook();