export function Interest({interest}){
    return (
        <div id="interest">
            <p><b>Interest: </b> {interest.map((activity, index) => <span key={index}>{activity}, </span>)}</p>
        </div>
    )
}