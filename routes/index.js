var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Thermal Printer' });
});

router.post('/follow', function(req, res, next) {
  user = req.body.user.toString();
  var json = require("../public/json/followingUsers.json");
  users = json.follow.split(",");
  if(!users.includes(user)){
    users.splice(0,0,user);
    json.follow = users.join(",");
    console.log(JSON.stringify(json));
    fs.writeFile("./public/json/followingUsers.json", JSON.stringify(json),
    function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
});

router.post('/unfollow', function(req, res, next) {
  user = req.body.user.toString();
  var json = require("../public/json/followingUsers.json");
  users = json.follow.split(",");
  if(users.includes(user)){
    users.splice(users.indexOf(user),1);
    json.follow = users.join(",");
    console.log(JSON.stringify(json));
    fs.writeFile("./public/json/followingUsers.json", JSON.stringify(json),
    function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
});
module.exports = router;
