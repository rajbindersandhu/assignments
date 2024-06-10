export function ButtonHandler({smlist}){
    return (
        <div id="smlist">
            {smlist.map((smhandel, index) => {
                return (<a key={index} href={smhandel.url}><button id="smhandel">{smhandel.name}</button></a>)
            })}
        </div>
    )
}