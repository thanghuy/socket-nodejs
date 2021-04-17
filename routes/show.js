var express = require('express');
var router = express.Router();
router.get("/show",function(req,resp){
    resp.render('table.html');
})
module.exports = router;