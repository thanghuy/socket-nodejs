var express = require('express');
var router = express.Router();
const fs = require('fs');
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index.html')
});
router.get('/user',function(req,resp){

  fs.readFile('./user.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const list = convertList(data);
    var listJson = list.map(item=>{
      var items = item.split(';');
      return {
        name : items[0].replace('\n',''),
        password : items[1],
        date : items[2],
        time : items[3]
      }
    })
    resp.send(listJson)
  })
})
router.post("/save-user",function(req,resp){
  fs.readFile('./user.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    // const list = convertList(data);
    const username = req.body.name;
    const password = req.body.password;
    const today = getDateTime();
    const newRow = username + ';' + password + ';' + today;
    const newData = data+',\n'+newRow;
    fs.writeFile('./user.txt', newData , function (err) {
      if (err) return console.log(err);
      console.log('save file success !!!');
    });

  })
});
const convertList =(data)=>{
  var list = data.split(',');
  return list;
}
const addZero =(i)=> {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const getDateTime =()=>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var h = addZero(today.getHours());
  var m = addZero(today.getMinutes());
  var s = addZero(today.getSeconds());
  var n = h + ":" + m + ":" + s;
  today = dd + '-' + mm + '-' + yyyy+ ';'+ n+'AM';
  return today;
}

module.exports = router;
