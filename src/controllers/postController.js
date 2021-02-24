const { Mongoose } = require('mongoose');
const Post = require('../models/postModel');

exports.listAllPosts = (req, res) => {
    Post.find({}, (error, posts) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(200);
            res.json(posts);
        }
    });
}

exports.createAPost = (req, res) => {
    let newPost = new Post(req.body);

    newPost.save((error, post) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(201);
            res.json(post)
        }
    });
}

exports.getAPost = (req, res) => {
    Post.findById(req.params.id_post, (error, post) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(200);
            console.log("l'id que je recherche ");
            res.json(post);
        }
    });
}

exports.updateAPost = (req, res) => {
    let updatePost = req.body;

    Post.findByIdAndUpdate(req.params.id_post, updatePost, {new: true}, (error, post) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            let response = {
                "comment" : "udpated",
                "data" : post
            }
            res.status(200);
            res.json(response);
        }
    });
}

exports.deleteAPost = (req, res) => {
    Post.findByIdAndDelete(req.params.id_post, (error, post) => {
        if (error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }else{
            res.status(200);
            let response = {
                "comment" : "deleted",
                "data" : post
            }
            res.json(response);
        }
    });
    
}