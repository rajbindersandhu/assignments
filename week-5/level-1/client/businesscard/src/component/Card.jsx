import {Name} from "./Name";
import { Introduction } from "./Introduction";
import { ButtonHandler } from "./ButtonHandler";
import { Interest } from "./Interest";

const cardDataList = [
    {
        "username": "Rajbinder",
        "intro": "Automation tester",
        "smlist": [{"name": "LinkdIn", "url": "www.Linkdin.com"},{"name": "Twitter", "url": "www.Twitter.com"}],
        "interest": ["swimming", "basketball", "ML"]
    },
    {
        "username": "Jimmy",
        "intro": "ML engineer",
        "smlist": [{"name": "LinkdIn", "url": "www.Linkdin.com"},{"name": "Youtube", "url": "www.Youtube.com"}],
        "interest": ["swimming", "basketball", "ML", "hiking"]
    }
]

export function CardContainer({cards}){
    return (
        <>
        {cards.map((data,index) => <Card key={index} data={data}/>)}
        </>
    )
}

function Card({data}){
    return (
        <div id = "card">
            <Name username={data.username}/>
            <Introduction intro={data.intro}/>
            <ButtonHandler smlist={data.smlist}/>
            <Interest interest={data.interest}/>
        </div>
    )
}