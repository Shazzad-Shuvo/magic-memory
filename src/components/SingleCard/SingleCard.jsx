import "./SingleCard.css";

const singleCard = ({ card, handleChoice, flipped, disabled }) => {

  const handleClick = () =>{
    if(!disabled){
      handleChoice(card);
    }
    
  }

  return (
    <div className={flipped ? "flipped" : ""}>
      <div className="card">
        <div>
          <img className="front" src={card.src} alt="card front" />
          <img 
            className="back" 
            src="/img/cover.png" 
            alt="card back" 
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default singleCard;
