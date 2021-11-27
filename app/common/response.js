const Response = {
    success: function (res, payload) {
        res.status(200);
        res.header('Content-Type', 'application/json');
        const data = JSON.stringify({
            status: 'success',
            payload,
        }, null, 4);
        res.send(data);
    },

    error: function (res, payload) {
        res.status(500);
        res.header('Content-Type', 'application/json');
        console.log(payload)
        const data = JSON.stringify({
            status: 'error',
            payload,
        }, null, 4);
        res.send(data);
    }
}

module.exports = Response;