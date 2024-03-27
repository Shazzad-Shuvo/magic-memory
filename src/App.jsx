import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";

const cardImages = [
  { src: "../public/img/helmet-1.png" },
  { src: "../public/img/potion-1.png" },
  { src: "../public/img/ring-1.png" },
  { src: "../public/img/scroll-1.png" },
  { src: "../public/img/shield-1.png" },
  { src: "../public/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffleCards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  // handle Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("Images matched");
        resetChoice();
      } else {
        console.log("Images did not match");
        resetChoice();
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choice and increase turn
  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => (prevTurn += 1));
  };
  return (
    <>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
