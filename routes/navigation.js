const Response = require("../app/common/response");

const router = require("express").Router();

router.get('/', (req, res) => {
    Response.success(res, { message: 'This is Fire Alarm Api' });
})

router.use('/room', require('./room'));
router.use('/room-status', require('./room_status'));

module.exports = router