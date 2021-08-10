const { tutorials } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Tutorial = db.tutorials;
const Comment = db.comments;

//create and save tutorials
exports.createTutorial = (tutorial) =>{
    return Tutorial.create({
        title: tutorial.title,
        description: tutorial.description
    }).then((tutorial)=>{
        console.log(">>Created tutorial: " + JSON.stringify(tutorial, null, 4));
        return tutorial;
    }).catch((error)=>{
        console.log(">>Error while creating tutorial: ", error);
    })
};

//create and save comments
exports.createComment = (tutorialId, comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        tutorialId: tutorialId
    }).then((comment)=>{
        console.log(">>Create comment: " + JSON.stringify(comment, null, 4));
        return comment;
    }).catch((error)=>{
        console.log(">>Error while creating comment: ", error);
    });
};

//get comments for a given tutorial
exports.findTutorialById = (tutorialId) => {
    return Tutorial.findByPk(tutorialId, {
        include: ["comments"]
    }).then((tutorial)=>{
        return tutorial;
    }).catch((error)=>{
        console.log(">>Error while finding tutorial: ", error);
    });
};

//get comments for a give comment id
exports.findCommentById = (id) => {
    return Comment.findByPk(id, {
        include: ["tutorial"]
    }).then((comment)=>{
        return comment;
    }).catch((error)=>{
        console.log(">>Error while finding comment:", error);
    });
};

//get all tutorials including comments
exports.findAll = () => {
    return Tutorial.findAll({
        include: ["comments"]
    }).then((tutorials)=>{
        return tutorials;
    });
};