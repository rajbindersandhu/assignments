/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const port = 3000;

app.get("/files", (req, res) => {
  let fileList = [];
  fs.readdir("files/", (err, files) => {
    if(err){
      res.send(err);
    }else{
      res.status(200).json({
        "files": files
      });
    }   
  }); 
});

app.get("/files/:filename",(req, res) => {
  try{
    let pathname = req.path;
    let pathRegExp = new RegExp("\/files\/[a-z]*\.[a-z]*");
    if(pathRegExp.test(pathname)){
      if(fs.existsSync(`.${pathname}`)){
        fs.readFile(`files/${req.params.filename}`, "utf8", (err, data) => {
            res.status(200).send(data);
        });
      }else{
        res.status(404).send("File not found");
      }
    }else{
      res.status(404).send("Route not found");
    }
  }catch(err){
    res.status(500).send(err);
  }
});

app.get(new RegExp("\/.*?"),(req, res) => {
  res.status(404).send("Route not found");
})


app.listen(port);

module.exports = app;