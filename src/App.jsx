import React from 'react';
import { easyWords, mediumWords, hardWords } from './data';
import {
  Timer, Task, TeamsQtyPopup, StartButton,
} from './widgets';
import { GameBoard } from './entities';
import './App.css';

function App() {
  const [showStart, showStartSet] = React.useState(true);
  const [showTeamQtyPopup, showTeamQtyPopupSet] = React.useState(false);
  const [showTask, showTaskSet] = React.useState(false);
  const [teams, teamsSet] = React.useState([]);
  const [currentWord, currentWordSet] = React.useState('');
  const [currentDifficulty, currentDifficultySet] = React.useState(3);

  function teamsQtyHandler(n) {
    const teamz = [];

    for (let i = 1; i <= n; i += 1) {
      teamz.push({
        name: `Team ${i}`, position: 0, isCurrent: false, id: i,
      });
    }

    const randomIndex = Math.floor(Math.random() * teamz.length);
    teamz[randomIndex].isCurrent = true;

    return teamz;
  }

  const handleTeamQtyChange = (qty) => {
    const newTeams = teamsQtyHandler(qty);
    teamsSet(newTeams);
    showTeamQtyPopupSet(false);
  };

  const allWords = [hardWords, mediumWords, easyWords];

  const handleCardPick = (difficulty) => {
    currentDifficultySet(difficulty);
    const index = Math.floor(Math.random() * allWords[5 - difficulty].length);
    const word = allWords[5 - difficulty][index];
    allWords[5 - difficulty].splice(index, 1);
    currentWordSet(word);
    showTaskSet(true);
  };

  const handleGuessWord = (value) => {
    if (value === 'Yes') {
      teams.forEach((team) => {
        if (team.isCurrent) {
          const updatedTeam = { ...team, position: team.position + currentDifficulty };
          teams[teams.indexOf(team)] = updatedTeam;
        }
      });
    }
    const currentTeamIndex = teams.findIndex((team) => team.isCurrent);
    const nextTeamIndex = (currentTeamIndex + 1) % teams.length;
    teams[currentTeamIndex].isCurrent = false;
    teams[nextTeamIndex].isCurrent = true;
    showTaskSet(false);
  };

  const startGame = () => {
    showStartSet(false);
    showTeamQtyPopupSet(true);
  };

  React.useEffect(() => {
    teams.forEach((team) => {
      if (team.position >= 48) {
        // TODO redo this alert
        // eslint-disable-next-line
        alert(`${team.name} wins!`);
        teamsSet([]);
        showStartSet(true);
      }
    });
  });

  return (
    <div className="container">
      {!showStart && <Timer />}
      {!showStart && (
        <GameBoard
          onCardPick={handleCardPick}
          startGame={startGame}
          teams={teams}
          showStart={showStart}
        />
      )}
      {showStart && <StartButton startGame={startGame} />}
      {showTeamQtyPopup && <TeamsQtyPopup onTeamQtyChange={handleTeamQtyChange} />}
      {showTask && <Task word={currentWord} onGuessWord={handleGuessWord} />}
    </div>
  );
}

export default App;
