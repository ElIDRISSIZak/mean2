const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

const parseString = require('xml2js').parseString;
const http = require('http');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/mean', ['tasks']);
// Connect
const connection = (closure) => {
    return MongoClient.connect("mongodb://localhost:27017/mean", (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get Tasks 
router.get('/tasks', (req, res) => {
    connection((db) => {
        db.collection('tasks')
            .find()
            .toArray()
            .then((tasks) => {
                response.data = tasks;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// find Task  by desc (modelisation)
router.get('/task', (req, res) => {
    connection((db) => {
        
        db.collection('tasks').find( { "desc": "modelisation" } )
        .each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
                 res.json(doc);
            }
            if(err)
            // } else {
                res.json("doc");
            // }
        });
    });

});

// find Task  by id
router.get('/task/:id', (req, res, next) => {
    connection((db) => {
        
        var cursor =db.collection('tasks').findOne( {_id : mongojs.ObjectID(req.params.id)}, function(err, task)  {
            if(err){
                res.send(err);
            }
            res.json(task);

        });
        

    });
});

//Auth test
router.post('/authen', (req, res, next) => {
    var user = req.body;
    if(!user){
        res.status(400);
        res.json({
            "error":"bad DATA"
        });
    }else{

        connection((db) => {
            db.collection('users').findOne({ username: "testuser2" }, function (err, user) {
		if(err){
                res.send("error1");
            }
            res.json(user);
            console.log(user);
    
        });
        
    });
    }
        
});

//save Task
router.post('/task', (req, res, next) => {
    var task = req.body;
    if(!task.title || !task.desc){
        res.status(400);
        res.json({
            "error":"bad DATA"
        });
    }else{

        connection((db) => {
            
            var cursor =db.collection('tasks').save(task, function(err, task){
                if(err){
                    res.send(err);
                }
                
              
            });
            
    
        });
        res.json(task);
    }
    
        
});

// Delete Task  by id
router.delete('/task/:id', (req, res, next) => {
    connection((db) => {
        
        db.collection('tasks').remove( {_id : mongojs.ObjectID(req.params.id)}, function(err, task)  {
            if(err){
                res.send(err);
            }
            res.json(task);

        });
        

    });
});


// Get xml file and display JSON format
router.get('/test', (req, res) => {
    var fs = require('fs');
    fs.readFile('blah.xml', (err, data) => {
        if (err) throw err;
        parseString(data, function (err, result) {
            res.json(result);
            
          });
      });

//Login
router.post('/testing', (req, res, next) => {
    var user = req.body;
    if(!user){
        res.status(400);
        res.json({
            "error":"bad DATA"
        });
    }else{

        connection((db) => {
            db.collection('users').findOne({ username: username, password: password }, function (err, user) {
		if(err){
                res.send(err);
            }
            res.json(user);
            
    
        });
        
    });
    }
        
});
      
      // get xml string and display JSON format

    // var xml2js = require('xml2js');
    // var xml = "<note><test><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></test><test><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></test></note>";
    // var extractedData = "";
    // var parser = new xml2js.Parser();
    // parser.parseString('blah.xml', function(err,result){

    //Extract the value from the data element
    // extractedData = result['config']['data'];
    // console.log(extractedData);
    
    // res.json(result);
    });
    // console.log("Note that you can't use value here if parseString is async; extractedData=", extractedData);
    
// });
  

module.exports = router;
