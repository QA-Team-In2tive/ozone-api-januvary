const request = require('../../utility/requests');
const api = require('../../config/api');
const constant = require('../../config/constants');
const common = require('../../utility/common');
const elementHandler = require('../../utility/elementHandler');
const schema = require('../../schemaValidate/commonSchema/failed');
const logs = require('../../utility/logs');

describe('Login check negative test case', () => {
    const token = common.searchOfEnv('login', 'login', 'token');

    it('Invalid method', () => {
        return request.sendPOSTRequest(api.check, null)
            .set('Authorization', token)
            .then((res) => {
                if (res.statusCode !== 404)
                    logs.getApiResponse(res)

                elementHandler.responseExpect(res.body, res.statusCode, 404, res.res.statusMessage, constant.STATUS_TEXT_NOT_FOUND, res.notFound);
                elementHandler.toBeEqual(res.body.message, 'Page not found');
                elementHandler.schemaValidate(res.body, schema);
            });
    });

    it('Invalid URL', () => {
        return request.sendGETRequest('/api/auth/Check')
            .set('Authorization', token)
            .then((res) => {
                if (res.statusCode !== 404)
                    logs.getApiResponse(res)

                elementHandler.responseExpect(res.body, res.statusCode, 404, res.res.statusMessage, constant.STATUS_TEXT_NOT_FOUND, res.notFound);
                elementHandler.toBeEqual(res.body.message, 'Page not found');
                elementHandler.schemaValidate(res.body, schema);
            });
    });

    it('Invalid hedar token', () => {
        return request.sendGETRequest(api.check)
            .set('Authorization', "e69cc37e4a4f12sc845b48788125bd5a1b1642a8636c812")
            .then((res) => {
                if (res.statusCode !== 401)
                    logs.getApiResponse(res)

                elementHandler.responseExpect(res.body, res.statusCode, 401, res.res.statusMessage, constant.STATUS_TEXT_UNAUTHORIZED, res.unauthorized);
                elementHandler.toBeEqual(res.body.message, 'unauthorized');
                elementHandler.schemaValidate(res.body, schema);
            });
    });
});