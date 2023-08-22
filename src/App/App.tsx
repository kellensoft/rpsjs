import React, {useState, useMemo} from 'react';
import styles from './App.module.css';
import Rps from '../Rps';
import Editor from '../Editor';
import Menu from '../Menu';
import StayWithMe from '../StayWithMe';
import π from '../π';

function flip(last:number, length:number){return (last+1)%(length+1)}

interface args{
  sponsors: any[];
}

function App(props:args) {  
  const [level, setLevel] = useState(-1);
  const [wins, setWins] = useState([-1]);
  const [score, setScore] = useState([0,0]);
  const [key, setKey] = useState(Math.random());
  const [playerJs, setPlayerJs] = useState(`// 5 wins, 2pts ahead <- unlock next level
// 0 = rock, 1 = paper, 2 = scissors
// player[], opponent[] <- previous moves
return 0`);  
  const [player, setPlayer] = useState('');
  const [opponentJs, setOpponentJs] = useState("return 0");
  const [opponent, setOpponent] = useState(opponentJs);
  const [run, setRun] = useState(false);
  const [show, setShow] = useState(false);
  const [slide, setSlide] = useState(0);
  const [toggle, setToggle] = useState(true);

  const handleClose = () => {setShow(false);setTimeout(()=>setSlide(flip(slide,props.sponsors.length)),200)}
  const handleShow = () => setShow(true);

  const game = useMemo(() => {
    return <Rps key={key} 
                p1={player} 
                p2={opponent} 
                board={score} 
                onScore={setScore} 
                wins={wins} 
                onWin={setWins} 
                level={level}/> 
    },[key, player]);

  if(score[0] >= score[1] + 2 && score[0] > 4)
    if(!wins.includes(level)) {
      wins.push(level);
      setRun(false);
    }

  return (
    <>
    <div className="vh-100 px-5" onMouseLeave={()=>{if(level<0)handleShow()}}>
    {wins.includes(4) ? 
    <StayWithMe show={show} onHide={handleClose} sponsors={props.sponsors} slide={slide}/>
    : ""}
    { level >= 0
      ? 
      <div className="h-100 d-flex flex-column flex-lg-row align-items-lg-stretch">
        <div className={`mh-100 w-100 ${styles.top}`}>
          <div className="container mt-2 d-flex flex-column">
            <div className={styles.bar}>
              <button 
                className={`${styles.back} btn btn-outline-light`}
                onClick={() => {
                  setLevel(-1);
                  setPlayer('');
                  setScore([0,0]);
                  setRun(false);
                }}>
                  Back
              </button>
              <span className={styles.complete}>
                {wins.includes(level)?"🏆":""}
              </span>
            </div>
            <div className="field d-flex justify-content-between">
              <div className={styles.score}>{score[0]}</div>
               {game}
              <div className={styles.score}>{score[1]}</div>
            </div>
          </div>
        </div>
        <div className={`mh-100 w-100 ${styles.bottom}`}>
          <Editor 
            toggled={toggle}
            display="player.js"
            value={playerJs} 
            onChange={setPlayerJs}
            setKey={setKey}
            onMove={setPlayer}
            win={wins.includes(level)}
            run={run}
            setRun={setRun}/>
          <Editor 
            toggled={!toggle}
            display="opponent.js"
            value={opponentJs} 
            onChange={setOpponentJs}
            setKey={setKey}
            onMove={setOpponent}
            win={wins.includes(level)}
            run={run}
            setRun={setRun}/>
        </div>
      </div>
      : 
      <Menu setLevel={setLevel} wins={wins} setOpponent={setOpponent} setOpponentJs={setOpponentJs}/>
    }
    </div>
    { level >= 0 && wins.includes(3)
    ?   
    <π setToggle={setToggle} toggle={toggle} />
    : ""}
    </>
  );
}

export default App;
