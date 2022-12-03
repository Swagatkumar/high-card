import { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";

import ScoreCard from "containers/ScoreCard";
import { addPlayer, getCards } from "helper";
import { firestore } from "firebaseApp";
import { useEffectOnce } from "hooks";

const Game = () => {
  const [cards, setCards] = useState([]);
  const gameId = "test-game";
  const [player, setPlayer] = useState(null);
  const docRef = useRef(doc(firestore, "games", gameId));
  const players = useRef(null);

  useEffect(() => {
    const unsub = onSnapshot(docRef.current, (docSnap) => {
      const data = docSnap.data();
      if (data.cards) {
        setCards(data.cards);
      } else {
        setDoc(doc(firestore, "games", gameId), {
          ...data,
          cards: getCards(),
        });
      }
      const playerInfo = JSON.parse(localStorage.getItem(gameId));
      if (data.players) {
        players.current = data.players;
        if (playerInfo) {
          setPlayer({
            ...data.players[playerInfo.playerId],
            playerId: playerInfo.playerId,
          });
        }
      }
    });

    return () => unsub();
  }, []);

  useEffectOnce(() => {
    if (!localStorage.getItem(gameId)) {
      addPlayer(gameId, docRef);
    }
  });

  const handleClick = (card) => {
    const playerInfo = JSON.parse(localStorage.getItem(gameId));
    const tempCards = [...cards];
    tempCards[card.number - 1] = { ...card, selectedBy: playerInfo.playerId };
    updateDoc(docRef.current, {
      cards: tempCards,
      players: {
        ...players.current,
        [playerInfo.playerId]: { cardSelected: tempCards[card.number - 1] },
      },
    });
  };

  return (
    <Grid container spacing={2} justifyContent="center" mt="10vh">
      <Typography
        component={Grid}
        item
        xs={12}
        display="flex"
        justifyContent="center"
      >
        {player ? `Hello, ${player.playerId}` : "Hello, the room is full."}
      </Typography>
      {cards.map((card, idx) => (
        <Grid item xs={2} key={card.number}>
          <ScoreCard
            card={card}
            onClick={() => handleClick(card)}
            disabled={!player || !!player.cardSelected}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Game;
