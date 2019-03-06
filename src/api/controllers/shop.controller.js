const express = require('express');
const router = express.Router();
const Shop = require('../../models/shop.model');

// get all shops [super, customer]
router.get('/', async(req, res, next) => {  
    try { 
        res.status(200).json({
            msg: '>> In The Name Of ALLAH'
        })

    } catch (e) {

    }

   
});

// create a new shop [super]
router.post('/', async(req, res, next) => {
    try{

    } catch (e) {

    }
})

// read details of specific shop   [super, shop-admin (based his roles)]
router.get('/:id', async(req, res, next) => {
    try {

    } catch (e) {

    }
});

// edit details of specific shop   [super, shop-admin (based his roles)]
router.patch('/:id', async(req, res, next) => {
    try {

    } catch (e) {
        
    }
});


// delete details of specific shop   [super, shop-admin (based his roles)]
router.delete('/:id', async(req, res, next) => {
    try {

    } catch (e) {
        
    }
});


// subscribe in a specific shop   [customer]
router.post('/:id/subscribe', async(req, res, next) => {
    try {
        // 
    } catch (e) {
        
    }
});


// Unsubscribe from a specific shop   [customer]
router.delete('/:id/subscribe', async(req, res, next) => {
    try {

    } catch (e) {
        
    }
});

module.exports = router;    