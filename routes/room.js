const express = require('express')
const router = express.Router()

const mainModel = require('../app/models/rooms')
const Response = require('../app/common/response')
const roomStatusModel = require('../app/models/room_status')


router.get('/', async (req, res) => {
    try {
        const items = await mainModel.getAll();
        Response.success(res, items);
    } catch (e) { Response.error(res, e); }
})

router.get('/get-by-id/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const item = await mainModel.getItemById(_id);
        Response.success(res, item);
    } catch (e) { Response.error(res, e); }
})

router.get('/get-all-and-status', async (req, res) => {
    try {
        const items = await mainModel.getAllAndStatus();
        Response.success(res, items);
    } catch (e) { Response.error(res, e); }
})

router.get('/get-last', async (req, res) => {
    try {
        const [lastItem] = await mainModel.getLast(1);
        Response.success(res, lastItem);
    } catch (e) { Response.error(res, e); }
})

router.get('/rooms-for-chart', async (req, res) => {
    const { start } = req.query;
    try {
        const startDate = new Date(start);
        const items = await mainModel.listRoomForChart(startDate)
        Response.success(res, items);
    } catch (e) { Response.error(res, e); }
})

router.get('/get-room-with-recent-warnings', async (req, res) => {
    const { id, start } = req.query;
    try {
        const startDate = new Date(start);
        const room = await mainModel.getItemById(id);
        const warnings = await roomStatusModel.listWarningAfterDateByRoomId(id, startDate);
        const data = {
            ...room.toObject(),
            recentWarnings: warnings,
        }
        Response.success(res, data);
    } catch (e) { Response.error(res, e); }
})

router.get('/fake', async (req, res) => {
    try {
        const result = await mainModel.insertFakeDocs();
        Response.success(res, {
            n: result.length,
            docs: result,
        });
    } catch (e) { Response.error(res, e); }
})

module.exports = router