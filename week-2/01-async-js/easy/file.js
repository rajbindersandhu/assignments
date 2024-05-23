
let fs = require("fs");

// fs.readFile("easy/1-counter.md","utf8", (err, data) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data);
//     }
    
// })

fs.writeFile("easy/demo.txt","Hello world, first write file", "utf8", (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("File writing done...");
    }
})

fs.readFile("easy/demo.txt", "utf8", (err, data)=> {
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})
