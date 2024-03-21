// npm i -g nodemon (This will install it bul globally.)
// nodemon express-app.js
const express = require('express');

// Makign an object. server instance. 
let server = express();

//This will make the public folder available to the server. Send it to the client.
// It will be called this way (http://localhost:3999/css/style.css).
server.use(express.static("public"));

// Set the views folder as the default location for rendering views
server.set('views', path.join(__dirname, 'views'));

// Set the view engine to use EJS
server.set('view engine', 'ejs');

// Define a route to render a view
server.get('/home', function(req, res){
    res.render('home', { title: 'Home Page' });
});

server.get("/", function(req, res){
 res.send("Hello Worldddd");
});

server.get("/api/stories", function(req, res){
    //I am sending an array of objects.
    res.send([
        {title: "Story 1", content: "This is the body of story 1"},
        {title: "Story 2", content: "This is the body of story 2"},
    ])
   });
// Making a route. 
server.listen(3999);