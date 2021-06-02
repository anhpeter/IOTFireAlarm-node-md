const Response = {
    success: function(res, data){
        res.status(200);
        res.json({
            status: 'success',
            payload: data,
        })
    }
}

module.exports = Response;