import React from 'react';
import styles from './Menu.module.css';

interface progress{
    setLevel: Function;
    wins: number[];
    setOpponent: Function;
    setOpponentJs: Function;
}

function Menu(props: progress){
    const cpu = [
        "return 0",
        "return (opponent[opponent.length-1]+1)%3",
        "return (player[player.length-1]+1)%3",
        `return player.length === 0
        ? 1
        : opponent[opponent.length-1]+2%3`,
        "cheat"
      ];

    function selectLevel(sel: number){
        let prev = sel - 1 >= 0 ? sel-1 : 0;
        if(props.wins.includes(prev)||sel === 0){
            props.setLevel(sel);
            props.setOpponent(cpu[sel]);
            props.setOpponentJs(cpu[sel]);
        }
    }

    const levels = ["🪨","♻️","🥊","🧠","😈"];

    return (
        <div className={`${styles.menu} container d-flex flex-column align-items-center`}>
            <h1 className={`${styles.title} text-center mt-5 mb-2`}>rock, paper, scissors,</h1>
            <div className={`${styles.js} mt-2 mb-5`}></div>
            <h4 className={`${styles.title} text-center mt-2 mb-5`}>level select</h4>
            <div className={`container d-flex justify-content-around flex-wrap`}>
                <button 
                    className={`btn btn-outline-light ${styles.level} ${styles.lv0}`} 
                    onClick={()=>selectLevel(0)}>
                        {levels[0]}
                </button>                   
                <button 
                    className={`btn btn-outline-light ${styles.level} ${styles.lv1} `+(!props.wins.includes(0)?'disabled':'')} 
                    onClick={()=>selectLevel(1)}
                    aria-disabled={!props.wins.includes(0)}>
                        {props.wins.includes(0)?levels[1]:"🔒"}
                </button>                      
                <button 
                    className={`btn btn-outline-light ${styles.level} ${styles.lv2} `+(!props.wins.includes(1)?'disabled':'')} 
                    onClick={()=>selectLevel(2)}
                    aria-disabled={!props.wins.includes(1)}>
                        {props.wins.includes(1)?levels[2]:"🔒"}
                </button>                      
                <button 
                    className={`btn btn-outline-light ${styles.level} ${styles.lv3} `+(!props.wins.includes(2)?'disabled':'')} 
                    onClick={()=>selectLevel(3)}
                    aria-disabled={!props.wins.includes(2)}>
                        {props.wins.includes(2)?levels[3]:"🔒"}
                </button>                      
                <button 
                    className={`btn btn-outline-light ${styles.level} ${styles.lv4} `+(!props.wins.includes(3)?'disabled':'')} 
                    onClick={()=>selectLevel(4)}
                    aria-disabled={!props.wins.includes(3)}>
                        {props.wins.includes(3)?levels[4]:"🔒"}
                </button>                      
            </div>
            {props.wins.includes(4)?<div><h1>Great Job! Next time, win without cheating!</h1></div>:""}
        </div>
    );
}

export default Menu;