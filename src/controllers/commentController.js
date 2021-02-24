const { Mongoose } = require('mongoose');
const Comment = require('../models/commentModel');

exports.listAllComments = (req, res) => {
    Comment.find({id_post : req.params.id_post}, (error, comments) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(200);
            res.json(comments);
        }
    });
}

exports.createAComment = (req, res) => {
    let newComment = new Comment(req.body);
    newComment.id_post = req.params.id_post;

    newComment.save((error, post) => {
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

exports.getAComment = (req, res) => {
    Comment.findById(req.params.id_comment, (error, comment) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            res.status(200);
            console.log("l'id que je recherche ");
            res.json(comment);
        }
    });
}

exports.updateAComment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.id_comment, req.body, {new: true}, (error, comment) => {
        if(error) {
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }
        else {
            let response = {
                "comment" : "udpated",
                "data" : comment
            }
            res.status(200);
            res.json(response);
        }
    });
}

exports.deleteAComment = (req, res) => {
    Comment.findByIdAndDelete(req.params.id_comment, (error, comment) => {
        if (error){
            res.status(500);
            console.log(error);
            res.json({message: "Erreur serveur."});
        }else{
            res.status(200);
            let response = {
                "comment" : "deleted",
                "data" : comment
            }
            res.json(response);
        }
    });
    
}