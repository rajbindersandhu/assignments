export function Navigation({setOpneModal}){
    function handelClick(){
        setOpneModal(prev => !prev);
    }
    return(
        <div id="navBar">
            <h1>E-Card</h1>
            <button id="create" onClick={handelClick}>Create Card</button>
        </div>
    )
}