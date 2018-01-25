var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 3000;
const astronauti = [];
const idAstronauta = 0;
app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var router = express.Router();

//funzioni

function createAs(fname, lname, isInS){
	var astronauta = {
		id: idAstronauta+1,
		firstname: fname,
		lastname: lname,
		isInSpace: isInS
	}
	astronauti.push(astronauta);
}

router.get('/getAstronauti', function(req, res){
	if(!(astronauti.length == 0)){
		res.json(astronauti);
	}else{
		res.json({
			"code": 200,
			"response": "non ci sono astronauti negli archivi"
		});
	}
});

app.use('/', router);

app.listen(PORT, function(){
    console.log("Node is running on port",PORT);
});