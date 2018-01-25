var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const PORT = process.env.PORT || 3000;
const astronauti = [];
var idAstronauta = 0;
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
	idAstronauta = idAstronauta + 1;
	astronauti.push(astronauta);
}

function getAsById(id){
	console.log("dentro la funzione "+id);
	var bool = false;
	var index = 0
	console.log("length: " +astronauti.length)
	if(astronauti.length != 0){
		console.log("entrato");
		for (var i = 0; i < astronauti.length; i++) {
			console.log((astronauti[i].id), id);
			if(parseInt(astronauti[i].id) == parseInt(id)){
				bool= true;
				index = i;
			}
		}
		if(bool == true){
			return index;
		}else{
			return -1;
		}
	}else{
		console.log("uscito nel primo if");
		return -1;
	}
}



//rotte

router.get('/getAstronauti', function(req, res){
	var id = req.query.id;
	if(id == undefined){
		if(!(astronauti.length == 0)){
		res.json(astronauti);
		}else{
			res.json({
				"code": 200,
				"response": "non ci sono astronauti negli archivi"
			});
		}
	}else{
		
		if(getAsById(id) == -1){
			res.send("id non trovato");
		}else{
			res.json(astronauti[getAsById(id)]);
		}
		
	}
	
});

router.post('/addAstronauta', function(req, res){
	if(req.body.firstname != undefined && req.body.lastname!= undefined && (req.body.isInSpace == "false" || req.body.isInSpace == "true")){
		createAs(req.body.firstname, req.body.lastname, req.body.isInSpace);
		res.send("astronauta creato");
	}else{
		res.send("c'è qualche problema");
	}

});

router.put('/modificaAs/:idAstronauta', function(req, res){
	var id = req.params.idAstronauta;
	console.log("modifica: "+id)
	var idAsA = getAsById(id); 
	if( idAsA != -1){
		console.log(req.body.firstname, req.body.lastname, req.body.isInSpace);
		if(req.body.firstname != undefined){
			astronauti[idAsA].firstname = req.body.firstname;
		}
		if(req.body.lastname != undefined){
			astronauti[idAsA].lastname = req.body.lastname;
		}
		if(req.body.isInSpace != undefined){
			console.log("entrato quaaa");
			astronauti[idAsA].isInSpace = req.body.isInSpace;
		}
		if(req.body.firstname == undefined && req.body.lastname == undefined && req.body.isInSpace == undefined){
			res.send("nessun parametro inserito");
		}else{
			res.send("Astronauta modificato con successo");
		}
		
	}else{
		res.send("Astronauta inesistente")
	}
});


app.use('/', router);

app.listen(PORT, function(){
    console.log("Node is running on port",PORT);
});