var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
const dao = require('./dao');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var app = express();
var url = "mongodb://localhost:27017/linkedin";



class DAO {

    //var objFind = {"userId":1001 }
    daoGet(objFind) {
        MongoClient.connect(url, function (err, dbvar) {
            if (err) throw err;
            var coll = dbvar.db("linkedin");
            coll.collection("user").find(objFind).toArray(function (err, result) {
                if (err) throw err;
                //fs.writeFileSync('./tempUser.json', JSON.stringify(result));
                //do something with the result data
                dbvar.close();
            });
        });
    }

    //var objInsert = { name: "Company Inc", address: "Highway 37" };
    daoInsert(objInsert) {
        MongoClient.connect(url, function (err, dbvar) {
            if (err) throw err;
            var coll = dbvar.db("linkedin");
            coll.collection("user").insertOne(objInsert, function(err, res) {
                if (err) throw err;
                //fs.writeFileSync('./tempUser.json', JSON.stringify(result));
                dbvar.close();
            });
        });
    }


    // var checkQuery = { address: "Valley 345" };
    // var setValue = { $set: { name: "Mickey", address: "Canyon 123" } };
    daoUpdate(checkQuery, setValue) {
        MongoClient.connect(url, function (err, dbvar) {
            if (err) throw err;
            var coll = dbvar.db("linkedin");
            coll.collection("user").updateOne(checkQuery, setValue, function(err, res) {
                if (err) throw err;
                //fs.writeFileSync('./tempUser.json', JSON.stringify(result));
                dbvar.close();
            });
        });
    }

    //var deleteQuery = {"userId":1001 }
    daoDelete(deleteQuery) {
        MongoClient.connect(url, function (err, dbvar) {
            if (err) throw err;
            var coll = dbvar.db("linkedin");
            coll.collection("user").deleteOne(deleteQuery, function(err, obj) {
                if (err) throw err;
                //fs.writeFileSync('./tempUser.json', JSON.stringify(result));
                dbvar.close();
            });
        });
    }


}

module.exports = DAO;
