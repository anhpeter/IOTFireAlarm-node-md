const express = require('express')
const router = express.Router()

const mainModel = require('../app/models/rooms')
const Response = require('../app/common/response')

// GET ALL ROOMS
router.get('/', async (req, res) => {
    try {
        const items = await mainModel.getAll();
        Response.success(res, items);
    } catch (e) { Response.error(res, e); }
})

// ROOM DETAIL
router.get('/get-by-id/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const item = await mainModel.getItemById(_id);
        Response.success(res, item);
    } catch (e) { Response.error(res, e); }
})


// GENERATE DUMMY DATA
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