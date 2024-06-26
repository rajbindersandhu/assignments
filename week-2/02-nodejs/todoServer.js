/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const fs = require("fs");
  const bodyParser = require('body-parser');
  
  const app = express();
  
  app.use(bodyParser.json());

  app.get("/todos", (req, res) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      return res.status(200).json(JSON.parse(data));
    });
  });

  app.get("/todos/:id", (req, res) => {
    let idTodo = req.params.id;
    fs.readFile("todos.json", "utf8", (err, data) => {
      let idFound = false;
      if(err){
        console.log(err);
      }else{
        let dataRec = JSON.parse(data);
        for(let i=0;i<dataRec.length;i++){
          if(dataRec[i].id == idTodo){
            return res.status(200).json(dataRec[i]);
          }
        }
        res.status(404).send(`Task id:${idTodo}, doesnot exist`)
      }
      });
      
  });

  app.post("/todos", (req, res) => {
    fs.readFile("todos.json", (err, data) => {
      let todoList = JSON.parse(data);
      let newTask ={};
      newTask["id"] = (todoList.length+1).toString();
      newTask["title"] = req.body.title;
      newTask["completed"] = req.body.completed;
      newTask["description"] = req.body.description;
      todoList.push(newTask);
      let jsonString = JSON.stringify(todoList);

      fs.writeFile("todos.json", jsonString, (err) => {
        if(err){
          console.log(err);
          return res.status(404).send(err);
        }else{
          console.log(`${jsonString} written to file`)
          res.status(201).json({"id": newTask["id"]});
        }
      })
    });
  });
  
app.put("/todos/:id", (req, res) => {
  let idTodo = req.params.id;
  fs.readFile("todos.json", "utf8", (err, data) => {
    if(err){
      console.log(err);
    }else{
      let jsonList = JSON.parse(data);
      let task;
      let foundTask = false;
      for(let i=0;i<jsonList.length;i++){
        if(jsonList[i].id == idTodo){
          task = jsonList.splice(i,1);
          foundTask = true;
          break;
        }
      }
      if(foundTask){
        for (const [key, value] of Object.entries(req.body)){
          if(Object.keys(task[0]).includes(key)){
            task[0][key] = value;
          }
        }
        jsonList.push(task[0]);
        let jsonString = JSON.stringify(jsonList);
        fs.writeFile("todos.json", jsonString, (err)=>{
          if(err){
            console.log(err);
          }
        })
        res.status(200).send(`Task id: ${idTodo} updated`);
      }else{
        res.status(404).send("ID not found");
      }
      
    }
    
  });
});

app.delete("/todos/:id", (req, res) => {
  let idTodo = req.params.id;
  fs.readFile("todos.json", "utf8", (err, data) => {
    if(err){
      console.log(err);
    }else{
      let jsonList = JSON.parse(data);
      let foundTask = false;
      for(let i=0;i<jsonList.length;i++){
        if(jsonList[i].id == idTodo){
          jsonList.splice(i,1);
          foundTask = true;
          break;
        }
      }
      if(foundTask){
        let jsonString = JSON.stringify(jsonList);
        fs.writeFile("todos.json", jsonString, (err)=>{
          if(err){
            console.log(err);
          }
        })
        res.status(200).send(`Task id: ${idTodo} updated`);
      }else{
        res.status(404).send("ID not found");
      }
      
    }
    
  });
});

app.all("*", (req, res) =>{
  res.status(404).send("Not found");
});

  app.listen(3000);

  module.exports = app;