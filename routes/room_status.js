const express = require('express')
const router = express.Router()

const Response = require('../app/common/response')

const mainModel = require('../app/models/room_status');

// get
router.get('/', (req, res) => {
    res.status(200);
    res.json({message:'ok'});
})

router.get('/get-last', (req, res) => {
    mainModel.getLast(1).then(result => {
        const [lastItem] = result;
        Response.success(res, lastItem || {});
    })
})

// insert
router.post('/', (req, res) => {
    console.log('body', req.body);
    res.status(200);
    res.json({
        message: "ok"
    });
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