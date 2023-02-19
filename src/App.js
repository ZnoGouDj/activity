import React from 'react';
import { easyWords, mediumWords, hardWords } from './data.js';
import './App.css';
import CardSlot from './components/CardSlot.jsx';
import Popup from './components/Popup.jsx';
import Task from './components/Task.jsx';
import TeamInfo from './components/TeamInfo.jsx';
import Field from './components/Field.jsx';

function GameBoard() {
  const [showStart, setShowStart] = React.useState(true);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showTask, setShowTask] = React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const [currentWord, setCurrentWord] = React.useState('');
  const [currentDifficulty, setCurrentDifficulty] = React.useState(3);

  function handleTeamQtyChange(qty) {
    const newTeams = teamsQtyHandler(qty);
    setTeams(newTeams);
    setShowPopup(false);
  }

  function teamsQtyHandler(n) {
    const teams = [];
  
    for (let i = 1; i <= n; i++) {
      teams.push({ name: `Team ${i}`, position: 0, isCurrent: false, id: i });
    }
  
    const randomIndex = Math.floor(Math.random() * teams.length);
    teams[randomIndex].isCurrent = true;
  
    return teams;
  }

  const allWords = [hardWords, mediumWords, easyWords];

  const handleCardPick = (difficulty) => {
    setCurrentDifficulty(difficulty);
    const index = Math.floor(Math.random() * allWords[5 - difficulty].length);
    const word = allWords[5 - difficulty][index];
    allWords[5 - difficulty].splice(index, 1);
    setCurrentWord(word);
    setShowTask(true);
  }

  const handleGuessWord = (value) => {
    if (value === 'Yes') {
      teams.forEach((team) => {
        if (team.isCurrent) {
          team.position += currentDifficulty;
        }
      });
    }
    const currentTeamIndex = teams.findIndex((team) => team.isCurrent);
    const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
    teams[currentTeamIndex].isCurrent = false;
    teams[nextTeamIndex].isCurrent = true;
    setShowTask(false);
  };

  const startGame = () => {
    setShowStart(false);
    setShowPopup(true);
  }

  React.useEffect(() => {
    teams.forEach((team) => {
      if (team.position >= 48) {
        alert(team.name + ' wins!');
        setTeams([]);
        setShowStart(true);
      }
    })
  })

  return (
    <div className="container">
      <div className="game-board">
        <div className="info">
          {teams.map((team) => (
            <TeamInfo team={team} key={team.name} />
          ))}
        </div>
        <div className="field-grid">
          {showStart ? (
            <button className="start-btn" onClick={() => startGame()}>
              Start game
            </button>
          ) : (
            Array.from({ length: 49 }).map((_, i) => (
              <Field index={i} key={i} />
            ))
          )}
        </div>
        {!showStart && (
          <div className="card-slots">
            {Array.from({ length: 3 }, (_, i) => (
              <CardSlot difficulty={5 - i} onCardPick={handleCardPick} key={i} />
            ))}
          </div>
        )}
      </div>
      <Popup showPopup={showPopup} onTeamQtyChange={handleTeamQtyChange} />
      <Task showTask={showTask} word={currentWord} onGuessWord={handleGuessWord} />
    </div>
  );
}

export default GameBoard;