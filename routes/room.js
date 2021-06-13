const express = require('express')
const router = express.Router()

const mainModel = require('../app/models/rooms')
const Response = require('../app/common/response')


// get
router.get('/', (req, res) => {
    mainModel.getAll().then(result => {
        Response.success(res, result);
    })
})

router.get('/get-all-and-status', (req, res) => {
    mainModel.getAllAndStatus().then(result => {
        res.json(result);
    })
})

router.get('/get-last', (req, res) => {
    mainModel.getLast(1).then(result => {
        const [lastItem] = result;
        Response.success(res, lastItem || {});
    })
})

router.get('/rooms-for-chart', (req, res) => {
    const { start } = req.query;
    const startDate = new Date(start);
    mainModel.listRoomForChart(startDate).then(result => {
        Response.success(res, result);
    })
})

router.get('/fake', (req, res) => {
    mainModel.insertFakeDocs().then(result => {
        Response.success(res, {
            n: result.length,
            docs: result,
        });
    })
})

module.exports = router