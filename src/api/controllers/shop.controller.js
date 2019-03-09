const express = require('express');
const router = express.Router();
const Shop = require('../../models/shop.model');
const validate = require('../middlewares/validator');

const authorize = require('../middlewares/authorize.middleware')
// get all shops [super, customer]
router.get('/', authorize(), async(req, res, next) => {  
    try { 
        res.status(200).json({
            msg: '>> In The Name Of ALLAH',
            data: "thank ALLAH"
        })

    } catch (e) {

    }

   
});

// create a new shop [super]
router.post('/', authorize(), validate('body'),
    async(req, res, next) => {
        try{
           

        } catch (e) {

        }
})

// read details of specific shop   [super, shop-admin (based his roles)]
router.get('/:id', authorize(), async(req, res, next) => {
    try {

    } catch (e) {

    }
});

// edit details of specific shop   [super, shop-admin (based his roles)]
router.patch('/:id', authorize(), async(req, res, next) => {
    try {

    } catch (e) {
        
    }
});


// delete details of specific shop   [super, shop-admin (based his roles)]
router.delete('/:id', authorize(), async(req, res, next) => {
    try {

    } catch (e) {
        
    }
});


// subscribe in a specific shop   [customer]
router.post('/:id/subscribe', authorize(), async(req, res, next) => {
    try {
    } catch (e) {
    }
});


// Unsubscribe from a specific shop   [customer]
router.delete('/:id/subscribe', authorize(), async(req, res, next) => {
    try {

    } catch (e) {
        
    }
});

module.exports = router;    