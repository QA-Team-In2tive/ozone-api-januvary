const request = require('../../utility/requests');
const constant = require('../../config/constants');
const elementHandler = require('../../utility/elementHandler');
const failed = require('../../schemaValidate/commonSchema/failed');
const logs = require('../../utility/logs');

require('dotenv').config();

describe('GET Account Name API', () => {
    describe('Negative Test Case', () => {
        it('Invalid method', (done) => {
            request.sendPOSTRequest('/api/admin/accounts/oauth?id=demo', null)
                .end((err, res) => {
                    if (res.statusCode !== 404)
                        logs.getApiResponse(res)

                    elementHandler.responseExpect(res.body, res.statusCode, 404, res.res.statusMessage, constant.STATUS_TEXT_NOT_FOUND, res.notFound);
                    elementHandler.toBeEqual(res.body.message, 'Page not found');
                    elementHandler.schemaValidate(res.body, failed);

                    done();
                });
        });
        it('Invalid URL', (done) => {
            request.sendGETRequest('/api/admin/accunt/oauth?id=demo')
                .end((err, res) => {
                    if (res.statusCode !== 404)
                        logs.getApiResponse(res)

                    elementHandler.responseExpect(res.body, res.statusCode, 404, res.res.statusMessage, constant.STATUS_TEXT_NOT_FOUND, res.notFound);
                    elementHandler.toBeEqual(res.body.message, 'Page not found');
                    elementHandler.schemaValidate(res.body, failed);

                    done();
                });
        });
        it('Invalid account name set of integer value exmple: 1 etc', () => {
            return request.sendGETRequest('/api/admin/accounts/oauth?id=1')
                .then((res) => {
                    if (res.statusCode !== 400)
                        logs.getApiResponse(res)

                    elementHandler.responseExpect(res.body, res.statusCode, 400, res.res.statusMessage, constant.STATUS_TEXT_BAD_REQUEST, res.badRequest);
                    elementHandler.toBeEqual(res.body.message, 'Failed to find account');
                    elementHandler.schemaValidate(res.body, failed);
                });
        });

        it('Invalid account name example: demo123', (done) => {
            request.sendGETRequest('/api/admin/accounts/oauth?id=demo123')
                .end((err, res) => {
                    if (res.statusCode !== 400)
                        logs.getApiResponse(res)

                    elementHandler.responseExpect(res.body, res.statusCode, 400, res.res.statusMessage, constant.STATUS_TEXT_BAD_REQUEST, res.badRequest);
                    elementHandler.toBeEqual(res.body.message, 'Failed to find account');
                    elementHandler.schemaValidate(res.body, failed);

                    done();
                });
        });
    });
});

