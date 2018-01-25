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

function getAsById(id){
	if(!(astronauti.lenght == 0)){
		for (var i = 0; i < astronauti.lenght == 0; i++) {
			if(astronauti[i].id == parseInt(id)){
				return astronauti[i];
			}
		}
		return -1;
	}else{
		return -1;
	}
}



//rotte

router.get('/getAstronauti', function(req, res){
	if(req.query.id == undefined){
		if(!(astronauti.length == 0)){
		reqes.json(astronauti);
		}else{
			res.json({
				"code": 200,
				"response": "non ci sono astronauti negli archivi"
			});
		}
	}else{
		res.json(getAsById(res.query.id));
	}
	
});


app.use('/', router);

app.listen(PORT, function(){
    console.log("Node is running on port",PORT);
});