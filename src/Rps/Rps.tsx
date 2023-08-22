import React from 'react';
import styles from './Rps.module.css'

const moves = [
  ["✊🏻","✋🏻","✌🏻"],
  ["✊🏼","✋🏼","✌🏼"],
  ["✊🏽","✋🏽","✌🏽"],
  ["✊🏾","✋🏾","✌🏾"],
  ["✊🏿","✋🏿","✌🏿"]
]
const text = ["グー","パー","チョキ"];
const result = ["win", "loss", "draw"];

function getSide(side: number){return side === 0 ? 'left' : 'right'}
function getText(move: number){return text[move]}
function getWin(o: number,t: number){return (Math.abs(o-t)>1)?(o-t<0?1:-1):o-t} 
function rand(top: number){return Math.floor(Math.random() * top)}
//let l=function(){let o:any=null;let p:any={};p.e=function e(){if(o==null)return;window['console']['log'] = o;};p.d=function d(){o=console.log;window['console']['log']=function(){};};return p;}();
function test(f: Function,p: number[],o: number[],a: Function){let t=f(p,o);return(typeof(f)!='function'||typeof(t)!='number'||![0,1,2].includes(t))?a():t}
function toF(f: string){try{return Function("player","opponent",f)}catch(e){return ()=>{}}}
function split(m: [number, number][], i: number){return m.map((x: number[])=>x[i])}

let playerOne = {
  skin: rand(5)
}

let playerTwo = {
  skin: rand(5)
}

interface GameBoard{
  p1: string;
  p2: string;
  board: number[];
  onScore: Function;
  wins: number[];
  onWin: Function;
  level: number;
}

function Rps(props: GameBoard){
  function updateScore(o: number, t: number) {
      props.onScore([o,t]);
  }

  if(props.p1 !== '') {  
      playerOne.skin = rand(5); playerTwo.skin = rand(5);
      let s1 = 0; let s2 = 0; let d = 0;
      let m: [number, number][] = [];
      while(s1!==2 && s2!==2 && d!==3) {
          let p: number[] = split(m,0);
          let o: number[] = split(m,1);
          let one = test(toF(props.p1),p,o,()=>{return 0});
          let two = props.p2!=="cheat"?test(toF(props.p2),p,o,()=>{return rand(3)}):(one+1)%3;
          m.push([one, two]);
          switch(getWin(one, two)) {
          case 1:s1++;d=0;break;
          case -1:s2++;d=0;break;
          default:d++;
          }
      } 
      let game = s1>s2?0:s1===s2?2:1;
      if(game===0)
          updateScore(props.board[0]+1, props.board[1]);
      if(game===1)
          updateScore(props.board[0], props.board[1]+1);

      const end = result[game];

      return ( 
          <div id="game" className={`${styles.game} ${styles[end]}`}>
          {m.map((match, i) => (      
              <div key={"match"+i} className={`${styles.match}`}>
              <div className={`${styles.player} ${styles[getSide(0)]} ${styles[getText(match[0])]}`}>{moves[playerOne.skin][match[0]]}</div>
              <div className={`${styles.player} ${styles[getSide(1)]} ${styles[getText(match[1])]}`}>{moves[playerTwo.skin][match[1]]}</div>
              </div>
          ))}
          </div>
      );
  } else {
    return <div></div>
  }
}

export default Rps;