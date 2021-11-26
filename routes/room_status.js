const express = require('express')
const router = express.Router()

const Response = require('../app/common/response');
const mainModel = require('../app/models/room_status');

router.get('/', async (req, res) => {
    try {
        const io = req.app.get('socketio');
        io.emit('test-data', { username: 'peter' })
        const result = await mainModel.getAll();
        Response.success(res, result);
    } catch (e) { Response.error(res, e); }
})

// GET LAST ITEMS AFTER SPECIFIC TIME FOR CHART DISPLAY PURPOSE
router.get('/get-last-items-after-time/:_id', async (req, res) => {
    let { _id } = req.params;
    let { time } = req.query;
    try {
        const items = await mainModel.getLastItemsAfterTimeByRoomId(_id, time);
        Response.success(res, items);
    } catch (e) { Response.error(res, e); }
})

// INSERT NEW STATUS (IOT)
router.post('/', async (req, res) => {
    const io = req.app.get('socketio');

    // CREATE STATUS
    const item = {
        ...req.body,
        date: new Date().toISOString(),

    };

    try {
        // INSERT STATUS TO DATABASE
        const result = await mainModel.insertOne(item);

        // GET STATUS WITH IT'S ROOM
        const status = await mainModel.getItemById(result._id).populate('room');

        // EMIT STATUS TO CLIENT FOR DISPLAY DATA REALTIME
        io.emit(`SERVER_EMIT_ROOM_WITH_STATUS_${status.room._id}`, status);

        // RETURN INSERTED STATUS BACK TO REQUEST (IOT)
        Response.success(res, status);

        //
        console.log('\n NEW', status._id);
    } catch (e) { Response.error(res, e); }

})

// DELETE ALL
router.get('/delete-all', async (req, res) => {
    try {
        const result = await mainModel.deleteAll();
        Response.success(res, result);
    } catch (e) { Response.error(res, e); }
})

// GENERATE DUMMY DATA
router.get('/fake', async (req, res) => {
    try {
        const result = await mainModel.insertFakeDocs();
        return Response.success(res, result)
    } catch (e) { Response.error(res, e); }
})

module.exports = router