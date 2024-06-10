import { useEffect, useState } from "react";

export function CreateModal({setOpneModal, setCards}){
    const [smlist, setSmList] = useState([0]);
    const [username, setUsername] = useState("");
    const [intro, setIntro] = useState("");
    const [interestList, setInterestList] = useState([]);
    const [smInput, setSmInput] = useState([])

    function reset(){
        setSmList([0]);
        setUsername("");
        setIntro("");
        setInterestList([]);
        setSmInput([]);
    }
    return(
        <div id="create-modal">
            <div id="inner">
                <div id="entername">
                    <span>Enter Name: </span>
                    <input id="name-input" type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>
                <br/>
                <div id="enterintro">
                    <span>Short Intro: </span>
                    <input id="intro-input" type="text" onChange={(e) => setIntro(e.target.value)} value={intro}/>
                </div>
                <br/>
                <div id="enterinterest">
                    <span>Short Intro: </span>
                    <input id="interest-input" type="text" placeholder="interest1, interest2,..." onChange={(e) => {
                        if(e.target.value.includes(",")){
                            const interestList = e.target.value.split(",")
                            setInterestList(interestList);
                        }else{
                            const interest = e.target.value
                            setInterestList([interest]);
                        }
                    }} />
                </div>
                <br/>
                <div id="enterhandel">
                    <span>Enter handel name and url: </span>
                    {smlist.map((x,i)=> <Smhandel key={i} id={i} smInput={smInput} setSmInput={setSmInput} smlist={smlist} setSmList={setSmList} />)}
                </div>
            </div>
            <ModalAction username={username} intro={intro} interestList={interestList} smInput={smInput} setOpneModal={setOpneModal} setCards={setCards} reset={reset}/>
        </div>
    )
}

function Smhandel({id, smInput, setSmInput, smlist, setSmList}){
    const [smname, setSmName] = useState("");
    const [smurl, setSmUrl] = useState("");

    function changeInputObj(id){
        if(smlist.length != smInput.length){
            if(smlist.length > smInput.length){
                let newObt = {"id":smInput.length, "name":"", "url":""}
                setSmInput([...smInput, newObt]);
            }else if(smlist.length < smInput.length){
                const newObjtList=smlist.filter(input => input["id"]!=id)
                setSmInput(newObjtList)
            }
        }else{
            // console.log(id)
            // console.log(smInput)
            for(let i=0;i<smInput.length;i++){
                if(smInput[i]["id"] == id){
                    if(smInput[i]["name"]!=smname || smInput[i]["url"]!=smurl){
                        console.log(`Changing index to: ${i}`)
                        // let newObt = {"id":id, "name": smname, "url": smurl}
                        let newList = [...smInput]
                        newList[i]["name"]=smname;
                        newList[i]["url"]=smurl;
                        setSmInput([...newList])
                    }
                }
            }
            // console.log(smInput)
        }
        // console.log(smInput)
    }

    function addHandel(id){
        setSmList(prevList => [...prevList, prevList.length])
        changeInputObj(id);
    }

    function removeHandel(id){
        setSmList(prevList => {
            const newList = prevList.filter((x,i) => id!=i)
            return newList
        })
        changeInputObj(id);
    }
    return(
        <div id="handelList">
            <input id="handelname" type="text" placeholder="Name" onChange={(e) => {setSmName(e.target.value);changeInputObj(id)}} value={smname}/>
            <input id="handelurl" type="text" placeholder="URL.." onChange={(e) => {setSmUrl(e.target.value);changeInputObj(id)}} value={smurl}/>
            <div id="action">
                <button id="add" onClick={() => addHandel(id)}>&#10789;</button>
                {smlist.length > 1 ? <button id="delete" onClick={() => removeHandel(id)}>&#10761;</button>: null}
            </div>
        </div>
    )
}

function ModalAction({username, intro, interestList, smInput, setOpneModal, setCards, reset}){
    function closeModal(){
        setOpneModal(prev => !prev)
    }
    function createCard(){
        const cardObj ={}
        if(username.length>0){
            cardObj["username"] = username
        }else{
            return alert("Missing Username")
        }
        if(intro.length>0){
            cardObj["intro"]= intro
        }else{
            return alert("Missing Introduction")
        }
        if(interestList.length >0){
            cardObj["interest"] = interestList
        }else{
            return alert("Missing Interest")
        }
        if(smInput.length > 0){
            cardObj["smlist"]=[]
            console.log(smInput)
            for(let i=0;i<smInput.length;i++){
                if(!smInput[i]["name"] && !smInput[i]["url"]){
                    return alert("Missing Social media handel")
                }else{
                    cardObj["smlist"].push({
                        "name": smInput[i]["name"],
                        "url":smInput[i]["url"]
                    })
                }
            }
        }else{
            return alert("Missing Social media handels")
        }
        setCards(prev => [...prev, cardObj]);
        closeModal();
        reset();
    }
    return (
        <div id="modal-action">
            <button id="add-list" onClick={createCard}>Create</button>
            <button id="cancel" onClick={closeModal}>Cancel</button>
        </div>
    )
}