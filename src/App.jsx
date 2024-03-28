import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";

const cardImages = [
  { src: "../img/helmet-1.png", matched: false },
  { src: "../img/potion-1.png", matched: false },
  { src: "../img/ring-1.png", matched: false },
  { src: "../img/scroll-1.png", matched: false },
  { src: "../img/shield-1.png", matched: false },
  { src: "../img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffleCards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);  
    setChoiceTwo(null);  
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
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetChoice();
      } else {
        setTimeout(() => resetChoice(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choice and increase turn
  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => (prevTurn += 1));
    setDisabled(false);
  };

  // start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

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
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
        <h2>Turns Attempted: {turns}</h2>
      </div>
    </>
  );
}

export default App;
