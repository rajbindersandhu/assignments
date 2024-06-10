import { useState } from 'react'
import { CardContainer } from './component/Card'
import { Navigation } from './component/Navigation'
import { CreateModal } from './component/CreateModal'
import './App.css'

function App() {
  const [openModal, setOpneModal] = useState(false);
  const [cards, setCards] = useState([]);
  return (
    <div id="appContainer">
      <Navigation setOpneModal={setOpneModal}/>
      {openModal ? <CreateModal setOpneModal={setOpneModal} setCards={setCards}/> : null}
      <CardContainer cards={cards}/>
    </div>
  )
}

export default App
