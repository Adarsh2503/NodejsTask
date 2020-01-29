const express = require('express');
const uuidv1 = require('uuid/v1');

function routes(userModel, userRoleModel) {
    const subscription = express.Router();
    subscription.route('/register')
        .post( async (req, res) => {
            let count = await userModel.count();
            let userid = uuidv1();
            req.body['USER_ID'] = userid;
            const customer = new userModel(req.body);
            let obj = {
                'USER_ID': userid,
            }
            if (count>0) {
                obj['USER_ROLE'] = "USER";
            } else {
                obj['USER_ROLE'] = "ADMIN";
            }
            const customerRole = new userRoleModel(obj);

            customer.save((err) => {
                if (err) {
                    return res.status(400).send({
                        message: 'Please enter valid Data!'
                    });
                }
                customerRole.save((err) => {
                    if (err) {
                        return res.status(400).send({
                            message: 'Please enter valid Data!'
                        });
                    }
                });
                let result = {
                    customer,
                    customerRole
                }
                res.json(result);
            });
        });
    return subscription;
}
module.exports = routes