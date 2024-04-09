import React from 'react';
import { easyWords, mediumWords, hardWords } from './data';
import { Popup, Task, GameBoard } from './components';
import './App.css';
import Timer from './components/Timer/Timer';

function App() {
  const [showStart, setShowStart] = React.useState(true);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showTask, setShowTask] = React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const [currentWord, setCurrentWord] = React.useState('');
  const [currentDifficulty, setCurrentDifficulty] = React.useState(3);

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
    setTeams(newTeams);
    setShowPopup(false);
  };

  const allWords = [hardWords, mediumWords, easyWords];

  const handleCardPick = (difficulty) => {
    setCurrentDifficulty(difficulty);
    const index = Math.floor(Math.random() * allWords[5 - difficulty].length);
    const word = allWords[5 - difficulty][index];
    allWords[5 - difficulty].splice(index, 1);
    setCurrentWord(word);
    setShowTask(true);
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
    setShowTask(false);
  };

  const startGame = () => {
    setShowStart(false);
    setShowPopup(true);
  };

  React.useEffect(() => {
    teams.forEach((team) => {
      if (team.position >= 48) {
        // TODO redo this alert
        // eslint-disable-next-line
        alert(`${team.name} wins!`);
        setTeams([]);
        setShowStart(true);
      }
    });
  });

  return (
    <div className="container">
      <Timer />
      <GameBoard
        onCardPick={handleCardPick}
        startGame={startGame}
        teams={teams}
        showStart={showStart}
      />
      {showPopup && <Popup onTeamQtyChange={handleTeamQtyChange} />}
      {showTask && <Task word={currentWord} onGuessWord={handleGuessWord} />}
    </div>
  );
}

export default App;
