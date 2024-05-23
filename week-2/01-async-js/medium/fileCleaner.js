let fs = require("fs");

let demoData = "hello     world    my    name   is       raj"

fs.writeFile("medium/demo.txt", demoData, "utf8", (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("creating and writing data t0 file first time");
        fs.readFile("medium/demo.txt", "utf8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log("Reading the file first time and removing all extra spaces: "+ data);
                let newData = "";
                let newDataList = data.split(" ");
                for(let i=0;i<newDataList.length;i++){
                    if(newDataList[i]){
                        if(!newData){
                            newData += newDataList[i];
                        }else{
                            newData += (" " + newDataList[i]);
                        }
                    }
                }
                fs.writeFile("medium/demo.txt", newData, "utf8", (err) => {
                    if(err){
                        console.log("error:3");
                    }else{
                        console.log("\nAfter making changes to file...\n")
                        console.log(newData);
                        fs.readFile("medium/demo.txt", "utf8", (err, data) => {
                            if(err){
                                console.log(err);
                            }else{
                                console.log(data);
                            }
                        })
                    }
                });
            }
        });
    }
});
// let newData="";
// fs.readFile("medium/demo.txt", "utf8", (err, data) => {
//     if(err){
//         console.log("error:2");
//     }else{
//         console.log("2");
//         // let newDataList = data.split(" ");
//         // for(let i=0;i<newDataList.length;i++){
//         //     if(newDataList[i]){
//         //         if(!newData){
//         //             newData += newDataList[i];
//         //         }else{
//         //             newData += (" " + newDataList[i]);
//         //         }
//         //     }
//         // }
        
//     }
// });

// fs.writeFile("medium/demo.txt", newData, "utf8", (err) => {
//     if(err){
//         console.log("error:3");
//     }else{
//         // console.log("\nAfter making changes to file...\n")
//         console.log("3");
//     }
// });

// fs.readFile("medium/demo.txt", "utf8", (err, data) => {
//     if(err){
//         console.log("error:4");
//     }else{
//         console.log("4");
//     }
// })