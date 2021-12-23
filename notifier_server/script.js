const Pusher = require("pusher");
const express = require("express");
const mongodb = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());
//create routes

const pusher = new Pusher({
    appId: "",
    key: "",
    secret: "",
    cluster: "",
    useTLS: true
  });

const MongoClient = mongodb.MongoClient;

const connection = new MongoClient("mongodb+srv://user:")


app.get("/api/topics/get-topics", async function(request, response){

  let connection_result = await connection.connect();
  if(connection_result){
    const result =  await connection.db("topics-db").collection("topics").find().toArray();


    if(result){

      //console.log(result);

      response.send({
        message: "Operation successful",
        data: result,
        code: "success"
      });

    }


 }



})

app.get("/api/topics/get-topic",  async function(request, response){

  const topic_id = request.query.topic_id;
  let connection_result = await connection.connect();

  if(connection_result){

    console.log("Topic: ", topic_id);

      const result =  await connection.db("topics-db").collection("topics").findOne({_id: ObjectId(topic_id)});

      //console.log(result);

      if(result){
          response.send({
            message: "Operation successful",
            data: result,
            code: "success"
          });


      }

  }





})

app.post("/api/topic/create-topic", async function(request, response){

  const topic_name = request.body.topic_name;
  const topic_publicity = request.body.topic_publicity;

  const topic_object = {
    topic_name: topic_name,
    topic_publicity: topic_publicity
  }


  let connection_result = await connection.connect();

  if(connection_result){
       const result = await connection.db("topics-db").collection("topics").insertOne(topic_object)

       if(result){

      
          pusher.trigger("topics", "new-topic-created", {
            message: `New topic ${topic_name} created!`,
            data: {
              id: result.insertedId,
              topic_name: topic_name,
              topic_publicity: topic_publicity
            }
          });

          response.send({
            message: "Topic created successfully",
            data: {
              topic_name: topic_name,
              topic_publicity: topic_publicity,
              id: result.insertedId
            },
            code: "success",
            status: 200
          })
        


       }
  }
 




})



app.listen("5000", () => console.log("Listening on port 5000"));




//   pusher.trigger("my-channel", "my-event", {
//     message: "hello world people"
//   });

//   pusher.trigger("testing-channel", "when-open", {
    

//   })