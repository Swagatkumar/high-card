const { runTransaction } = require("firebase/firestore");
const { firestore } = require("firebaseApp");

async function addPlayer(gameId, docRef) {
  try {
    const playerInfo = await runTransaction(firestore, async (transaction) => {
      const gameDoc = await transaction.get(docRef.current);
      if (!gameDoc) {
        throw new Error("Document does not exist");
      }
      const players = gameDoc.data().players;
      const data = { players: {} };
      let playerId = "";
      if (!players) {
        playerId = "Player1";
      } else {
        const playerNo = Object.keys(players).length + 1;
        if (playerNo > 5) {
          return;
        }
        playerId = "Player" + playerNo;
        data.players = {
          ...players,
        };
      }
      data.players[playerId] = {
        cardSelected: null,
      };
      transaction.update(docRef.current, data);
      return { playerId };
    });
    if (playerInfo) localStorage.setItem(gameId, JSON.stringify(playerInfo));
  } catch (e) {
    console.error(e);
  }
}

export default addPlayer;
