import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

import ScoreCard from "containers/ScoreCard";
import { getCards } from "helper";
import { firestore } from "firebaseApp";

const Game = () => {
  const [cards, setCards] = useState([]);

  const docRef = doc(firestore, "games", "test-game");

  useEffect(() => {
    const unsub = onSnapshot(docRef, (doc) => {
      const data = doc.data();
      if (data.cards) {
        setCards(data.cards);
      } else {
        setDoc(docRef, {
          cards: getCards(),
        });
      }
    });

    return () => unsub();
  }, [docRef]);

  const handleClick = (card) => {
    const tempCards = [...cards];
    tempCards[card.number - 1] = { ...card, isSelected: true };
    updateDoc(docRef, { cards: tempCards });
  };

  return (
    <Grid container spacing={2} justifyContent="center" mt="10vh">
      {cards.map((card, idx) => (
        <Grid item xs={2} key={card.number}>
          <ScoreCard card={card} onClick={() => handleClick(card)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Game;
