const express = require('express');
const router = express.Router();
const Shop = require('../../models/shop.model');
const validate = require('../middlewares/validator');

const authorize = require('../middlewares/authorize.middleware');
// to make request to REST APIs in other Services
let apiAdapter = require('../../config/api-adapter/api-adapter'),
    MSUrl,
    MSPrefix;


const config = require('config');

// get all shops [super, customer]
router.get('/', authorize(), async (req, res, next) => {
    try {
        //todo: pagination
        const shops = await Shop.find({});

        res.status(200).json({
            msg: '>> In The Name Of ALLAH',
            data: shops
        })

    } catch (e) {

    }
});

// create a new shop [super]
router.post('/', authorize(), validate('body'),
    async (req, res, next) => {
        try {
            const createdShop = await Shop.create({
                title: req.body.title,
                description: req.body.description
            });

            res.status(201).json({
                msg: 'Shop is created successfully.',
                data: createdShop
            })

        } catch (e) {

        }
    })

// read details of specific shop   [super, shop-admin (based his permissions)]
router.get('/:id', authorize(), async (req, res, next) => {
    try {
        const shopId = req.params.id;

        const shop = await Shop.findById(shopId);
        if (!shop) return res.status(404).json({ msg: `The shop with this id ${shopId} is not found !` });

        res.status(200).json({
            data: shop
        });

    } catch (e) {

    }
});

// edit details of specific shop   [super, shop-admin (based his permissions)]
router.patch('/:id', authorize(), async (req, res, next) => {
    try {
        const shopId = req.params.id,
            title = req.body.title,
            description = req.body.title;

        const updatedShop = await Shop.findByIdAndUpdate(shopId, {
            $set: {
                title,
                description
            }
        }, { new: true });

        if (!updatedShop) return res.status(404).json({ msg: `The shop with this id ${shopId} is not found !` })

        res.status(200).json({
            msg: 'Shop is updated successfully',
            data: updatedShop
        })


    } catch (e) {

    }
});


// delete details of specific shop   [super, shop-admin (based his permissions)]
router.delete('/:id', authorize(), async (req, res, next) => {
    try {
        // 1.delete shop from [shops] service 

        // 2.update the admin that was assigned to this shop from [shop-admins] service

    } catch (e) {

    }
});


// subscribe in a specific shop   [customer]
router.post('/:id/subscribe', authorize(), async (req, res, next) => {
    try {
        const GWCustomerID = req.GWUserID,
            shopId = req.params.id;

        MSUrl = config.get('MS.customer.url');
        MSPrefix = config.get('MS.customer.prefix');
        let _apiAdapter = apiAdapter(MSUrl);

        const serviceRes = await _apiAdapter.post(`/${MSPrefix}/subscribe`, { GWCustomerID, shopId });

        await Shop.findByIdAndUpdate(shopId, {
            $inc: {
                subscribersNumber: 1
            }
        });
        res.status(serviceRes.status).json({ msg: 'You subscribe successfully in shop' });
    } catch (e) {

    }
});


// Unsubscribe from a specific shop   [customer]
router.delete('/:id/subscribe', authorize(), async (req, res, next) => {
    try {
        const GWCustomerID = req.GWUserID,
            shopId = req.params.id;

        MSUrl = config.get('MS.customer.url');
        MSPrefix = config.get('MS.customer.prefix');
        let _apiAdapter = apiAdapter(MSUrl);
        
        const serviceRes = await _apiAdapter.post(`/${MSPrefix}/unsubscribe`, { GWCustomerID, shopId });

        await Shop.findByIdAndUpdate(shopId, {
            $inc: {
                subscribersNumber: -1
            }
        });
        res.status(serviceRes.status).json({ msg: 'You Unsubscribed from shop' });
    } catch (e) {

    }
});

module.exports = router;    