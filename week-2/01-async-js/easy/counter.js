
let counter = 0;

function asyncCounter(i){
    return new Promise(resolve => {
        setTimeout(() => {resolve(i)}, 1000);
    });
}

async function callCounter(n){
    for(let i=0;i<n;i++){
        let value = await asyncCounter(i);
        console.log(value+1);
    }
}

callCounter(5);
