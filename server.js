const express = require('express');
const db = require('./config/db.config');
const controller = require('./controllers/tutorial.controller');

const app = express();
const PORT = 8080;

//simple route
app.get('/', (req, res)=>{
    res.send({message: "I am Unloccode!"});
});

//fire up the server
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});
//init db
db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and Re-sync db.");
    run();
});
//some inits
const run = async() => {
    const tut1 = await controller.createTutorial({
        title: "Tut#1",
        description: "Tut#1 Description"
    });
    const tut2 = await controller.createTutorial({
        title: "Tut#2",
        description: "Tut#2 Description"
    });
    const comment1 = await controller.createComment(tut1.id,{
        name: "alafsasa",
        text: "Excellent work"
    });
    await controller.createComment(tut1.id, {
        name: "unloccdoe",
        text: "One of the best tutorials"
    });
    const comment2 = await controller.createComment(tut2.id,{
        name: "georges",
        text: "Hello World!"
    });
    await controller.createComment(tut2.id, {
        name: "peet",
        text: "Mid-Engine"
    });
    const tut1Data = await controller.findTutorialById(tut1.id);
    console.log(">>Tutorial id=" + tut1Data.id, JSON.stringify(tut1Data, null, 2));

    const tut2Data = await controller.findTutorialById(tut2.id);
    console.log(">>Tutorial id=" + tut2Data.id, JSON.stringify(tut2Data, null, 2));

    const comment1Data = await controller.findCommentById(comment1.id);
    console.log(">>Tutorial id=" + comment1.id, JSON.stringify(comment1Data, null, 2));

    const comment2Data = await controller.findCommentById(comment2.id);
    console.log(">>Tutorial id=" + comment2.id, JSON.stringify(comment2Data, null, 2));

    const tutorials = await controller.findAll();
    console.log(">>All tutorials", JSON.stringify(tutorials, null, 2));

};