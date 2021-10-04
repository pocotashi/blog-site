//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title:String,
  content: String
};

const Post = mongoose.model ("Post",postSchema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


var postArray = [];

app.get("/", function(req,res){
  Post.find({}, function(err, posts){

  res.render("home", {posts: postArray});
});

});

app.get("/about", function(req,res){
  res.render("about", {aboutContent:aboutContent})
});

app.get("/recipes", function(req,res){
  res.render("recipes")
});

app.get("/palakPaneer", function(req,res){
  res.render("palakPaneer")
})

app.get("/compose", function(req,res){
  res.render("compose")
});

app.post("/compose", function(req,res){
  const post = new Post ({
    title: req.body.title,
    content: req.body.content
  });

  post.save(function(err){

    if (!err){

      res.redirect("/");

    }

  });
postArray.push(post);


});

app.post("/home", function(req,res){
    res.send("Hello");
  });

app.get("/posts/:postID", function (req,res){
  const extras = _.lowerCase(req.params.a);
  const postID = req.params.postID

  Post.findOne({_id: postID}, function(err, post){
          res.render("post", {title: post.title, postContent: post.content});

   });




  // postArray.forEach(function(posts) {
  //   const title = _.lowerCase(posts.title);
  //
  //   if (extras === title){
  //       res.render("post", {title: title, postContent: posts.content});
  //     }
  //   })

  });



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
