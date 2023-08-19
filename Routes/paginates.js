const express = require('express');
const router = express.Router();
const servicesModel = require('../Model/services');



router.get('/paginate', async(req, res)=> {
    try {
        const allServices = await servicesModel.find()
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex = (page) * limit
        const results = {}

        results.totalServices = allServices.length;
        results.pageCount = Math.ceil(allServices.length/limit)

        if(lastIndex < allServices.length){
            results.next = {
                page: page + 1,
            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1,
            }
        }

        results.result = allServices.slice(startIndex, lastIndex);
        res.json(results)

    } catch (error) {
        console.log(error.message)
    }
})

module.exports = router