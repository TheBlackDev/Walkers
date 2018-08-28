var fs = require('fs');
var https = require('https');
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');


//var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();
var http = require('http');


app.use(express.static('static'));
app.set('view engine', 'ejs');


//Here the config of page
app.get('/', function(req, res){
    //Accueil -> redirection vers un chat aléatoire
    res.render('redirect', {})
});

app.get('/about', function(req, res){
            res.setHeader('Content-Type', 'text/plain');
        res.status(500).send('Test !');
});

app.get('/auth/login', function(req,res){
            res.setHeader('Content-Type', 'text/plain');
        res.status(500).send('Test !');
});


app.get('/auth/register', function(req,res){
        res.setHeader('Content-Type', 'text/plain');
        res.status(500).send('Test !');
});

app.get('/chat', function(req,res){
    res.render('redirect', {});
})

app.get('/chat/:chatnum', function(req,res){
    if(parseInt(req.params.chatnum, 10) < 101){
        res.render('index', {chat_number: req.params.chatnum});
    }
    else {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !!');
    }        
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});



var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
//httpsServer.listen(8443);

var io = require('socket.io').listen(http);

/*io.on('connection', function (socket){
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data){
        console.log(data);
    })
})*/

io.sockets.on('connection', function(socket){
    console.log('Un Client est connecté !')
});
