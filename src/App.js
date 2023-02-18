import React from 'react';
import { easyWords, mediumWords, hardWords } from './data.js';
import './App.css';

function GameBoard() {
  const words = ['speak', 'show', 'draw'];
  const [showStart, setShowStart] = React.useState(true);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showTask, setShowTask] = React.useState(false);
  const [teams, setTeams] = React.useState([]);
  const [currentWord, setCurrentWord] = React.useState('');
  const [currentDifficulty, setCurrentDifficulty] = React.useState(3);

  function handleTeamQtyChange(event) {
    const newTeamsQty = parseInt(event.target.innerHTML);
    const newTeams = teamsQtyHandler(newTeamsQty);
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

  const handleGuessWord = (e) => {
    const val = e.target.innerHTML;
    if (val === 'Yes') {
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

  const fields = React.useMemo(() => {
    const fields = [];

    for (let i = 0; i < 49; i++) {
      const isStartOrFinish = i !== 0 && i !== 48;
      const word = words[Math.floor(Math.random() * words.length)];
      const fieldClass = word && isStartOrFinish ? `field ${word}` : 'field';
      fields.push(
        <div className={fieldClass} key={i}>
          {isStartOrFinish ? word : ''}
        </div>
      );
    }

    return fields;
  }, []);

  return (
    <div className="container">
      <div className="game-board">
        <div className="info">
          {teams.map((team) => (
            <div key={team.name} style={{ background: team.isCurrent ? '#db6060' : 'none' }}>
              <h3>Name: {team.name}</h3>
              <p>Position: {team.position}</p>
            </div>
          ))}
        </div>
        <div className="field-grid">
          {showStart ? (
            <button className="start-btn" onClick={() => startGame()}>
              Start game
            </button>
          ) : (
            fields
          )}
        </div>
        {!showStart && (
          <div className="card-slots">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                className="card"
                key={i}
                onClick={(e) => {
                  handleCardPick(5 - i);
                }}
              >
                <h2>Activity</h2>
                <p className="difficulty">{5 - i}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="popup" style={{ display: showPopup ? 'flex' : 'none' }}>
        <h2>Choose the amount of teams</h2>
        <div className="btns-container">
          <button onClick={(e) => handleTeamQtyChange(e)}>2</button>
          <button onClick={(e) => handleTeamQtyChange(e)}>3</button>
          <button onClick={(e) => handleTeamQtyChange(e)}>4</button>
        </div>
      </div>
      <div className="task" style={{ display: showTask ? 'flex' : 'none' }}>
        <h2>{currentWord}</h2>
        <div className="guess-buttons">
          <button onClick={(e) => {handleGuessWord(e)}}>No</button>
          <button onClick={(e) => {handleGuessWord(e)}}>Yes</button>
        </div>
      </div>
    </div>
  );
}

export default GameBoard;