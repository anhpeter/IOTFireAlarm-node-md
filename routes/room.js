const express = require('express')
const router = express.Router()

const mainModel = require('../app/models/rooms')
const Response = require('../app/common/response')
const roomStatusModel = require('../app/models/room_status')


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

router.get('/get-room-with-recent-warnings', (req, res) => {
    const { id, start } = req.query;

    const startDate = new Date(start);
    mainModel.getItemById(id).then(room => {
        roomStatusModel.listWarningAfterDateByRoomId(id, startDate).then(warnings => {
            const data = {
                ... room.toObject(),
                recentWarnings: warnings,
            }
            Response.success(res, data);
        })
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