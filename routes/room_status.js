const express = require('express')
const router = express.Router()

const Response = require('../app/common/response')

const mainModel = require('../app/models/room_status');

// get
router.get('/', (req, res) => {
    mainModel.getAll().then(result => {
        Response.success(res, result);
    })
})

router.get('/get-last', (req, res) => {
    mainModel.getLast(1).then(result => {
        const [lastItem] = result;
        Response.success(res, lastItem || {});
    })
})

// insert
router.post('/', (req, res) => {
    const item = {
       ...req.body,
      date: new Date().toISOString(),
      
    };
    mainModel.insertOne(item).then(result=>{
      res.json(result);
    })
    
})

// delete 
router.get('/delete-all', (req, res) => {
    mainModel.deleteAll().then(result => {
        Response.success(res, result);
    })
})

// fake
router.get('/fake', (req, res) => {
    mainModel.insertFakeDocs().then(result => {
        Response.success(res, {
            n: result.length,
            docs: result,
        });
    })
})

module.exports = router