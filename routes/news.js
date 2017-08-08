var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"",
	database:"exam",
	port:"3306"
});


router.post("/list",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from news', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

router.post("/listxq",function (req,res){
	var id=req.body['id'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`SELECT * from news where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

router.post("/listsc",function (req,res){
	var id=req.body['id'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from news where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from news', function(err, rows, fields) {
			if (err) throw err;
		  	res.send(rows)
		});
	});
});

router.post("/listxg",function (req,res){
	var id=req.body['id'];
	var title=req.body['title'];
	var content=req.body['content'];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update news set title=${title} , content=${content} where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from news', function(err, rows, fields) {
			if (err) throw err;
		  	res.send(rows)
		});
	});
});
module.exports=router;