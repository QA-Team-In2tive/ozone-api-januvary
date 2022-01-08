const api = require('../config/api');
const config = require('../config/config');
const common = require('../utility/common');
const requests = require('../utility/requests');

const token = common.searchOfEnv('login', 'login', 'token');
const id = common.searchOfEnv('login', 'workspace', 'id');

/**
 * This class define for the member set or not in ozone panel
 * Get member details
 */
class Cluster {

    nodeType(query) {
        const url = config.prefix + api.nodeType + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }
    /**
     * define for the get login member details
     * @returns 
     */
    create(param) {
        const url = config.prefix + api.cluster;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    get(query) {
        const url = config.prefix + api.cluster + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    deleteClusterWorkspace() {
        const url = config.prefix + api.clusterworkspace;

        return requests.sendDELETERequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    allclusters(query) {
        const url = config.prefix + api.allclusters + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    postClusterWorkspace(param) {
        const url = config.prefix + api.clusterworkspace;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * Get all attach cluster list
     * @param {*} query 
     * @returns 
     */
    clusterType(query) {
        const url = config.prefix + api.clustertype + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * Attach cluster 
     * @param {*} param 
     * @returns 
     */
    attachCluster(param) {
        const url = config.prefix + api.attach;

        return requests.sendPOSTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    put(query, param) {
        const url = config.prefix + api.cluster + query;

        return requests.sendPUTRequest(url, param)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for cluster namespaces find
     * @param {*} query 
     * @returns 
     */
    namespaces(query) {
        const url = config.prefix + api.namespaces + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

    /**
     * define for cluster status active after get all resouse
     * @param {*} query 
     * @returns 
     */
    dynamicSesources(query) {
        const url = config.prefix + api.dynamicresources + query;

        return requests.sendGETRequest(url)
            .set('Authorization', token)
            .set('x-workspace-id', id)
    }

}

module.exports = new Cluster();