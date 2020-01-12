import React, {useState} from 'react';
import { Provider } from "react-redux";

import store from '../../../store';
import PlayerField from './PlayerField/PlayerField';
import OpponentFieldMap from './OpponentFieldMap/OpponentFieldMap';
import Keyboard from './Keyboard/Keyboard';
import io from 'socket.io-client';

const dummy = {
  multipliers: [[2, 4, 5, 2, 3, 5, 6, 8, 9, 3], [2, 4, 5, 2, 3, 5, 6, 8, 9, 3], [2, 4, 5, 2, 3, 5, 6, 8, 9, 3]],
  players: [
    {
      name: "Vlad",
      progress: 0,
      lastLine: 10,
      state: {
        multiply: 4,
        transfer: true,
        add: 0,
        remove: 0
      }
    },
    {
      lastLine: 10,
      name: "Shota",
      progress: 7,
      state: {
        multiply: 0,
        transfer: false,
        add: 2,
        remove: 1
      }
    },
    {
      lastLine: 10,
      name: "Isao",
      progress: 3,
      state: {
        multiply: 2,
        transfer: true,
        add: 0,
        remove: 5
      }
    }

  ]
}

const socket = io();

function Game(){
  let [gameState, setGameState] = useState({ status: 'start' });
  socket.on('GAME_START', (data) => {
    setGameState({ status: 'start', ...data });
  });
  return(
    <>
      {gameState.status === 'start' ? (
        <Provider store={store}>
          <PlayerField />
          <OpponentFieldMap gameState={dummy} socket={socket} />
          <Keyboard gameState={gameState} socket={socket} />
        </Provider>
      ) : (<h1>Loading...</h1>)}
    </>
  )
}

export default Game;