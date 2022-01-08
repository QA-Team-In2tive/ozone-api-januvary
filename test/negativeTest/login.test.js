const request = require('../../utility/requests');
const api = require('../../config/api');
const constant = require('../../config/constants');
const elementHandler = require('../../utility/elementHandler');
const failed = require('../../schemaValidate/commonSchema/failed');
const param = require('../../paramaters/param');

require('dotenv').config();

xdescribe('Login client in ozone panel', () => {
    describe('Negative Test Case', () => {
        it('Invalid URL', () => {
            return request.sendPOSTRequest('/api/auth/Login', param.loginParam())
                .then((res) => {
                    elementHandler.responseExpect(res.body, res.statusCode, 401, res.res.statusMessage, constant.STATUS_TEXT_UNAUTHORIZED, res.unauthorized);
                    elementHandler.toBeEqual(res.body.message, 'unauthorized');
                    elementHandler.schemaValidate(res.body, failed);
                });
        });

        it('Invalid Method', () => {
            return request.sendGETRequest(api.login)
                .then((res) => {
                    elementHandler.responseExpect(res.body, res.statusCode, 401, res.res.statusMessage, constant.STATUS_TEXT_UNAUTHORIZED, res.unauthorized);
                    elementHandler.toBeEqual(res.body.message, 'unauthorized');
                    elementHandler.schemaValidate(res.body, failed);
                });
        });

        it('Invalid account name in body param', () => {
            const array = [
                {
                    "account_name": "demo123",
                    "username": process.env.username,
                    "password": process.env.password
                },
                {
                    "account_name": process.env.accountName,
                    "username": "Test@ozone.ai",
                    "password": process.env.password
                },
                {
                    "account_name": process.env.accountName,
                    "username": process.env.username,
                    "password": "Tes123@"
                },
                {
                    "account_name": 1,
                    "username": process.env.username,
                    "password": process.env.password
                },
            ];

            for (let param of array) {
                return request.sendPOSTRequest(api.login, param)
                    .then((res) => {
                        elementHandler.responseExpect(res.body, res.statusCode, 401, res.res.statusMessage, constant.STATUS_TEXT_UNAUTHORIZED, res.unauthorized);
                        elementHandler.schemaValidate(res.body, failed);
                        elementHandler.toBeEqual(res.text, '{"message":"InvalidCredentials"}');
                    });
            }
        });
    });
});
