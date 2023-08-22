import React from 'react';
import {Modal} from 'react-bootstrap';
import styles from './StayWithMe.module.css';

const type = ["letter","number"];

interface modal{
    show: boolean;
    onHide: ()=>void;
    sponsors:any[];
    slide:number;
}

function StayWithMe(props: modal) {

return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header className={styles.head} closeButton>
        <Modal.Title>{props.slide!==props.sponsors.length?`Brought to you by the ${type[props.slide]+" "+props.sponsors[props.slide]}!`:"Wait, we have ads!"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${styles.ads} container d-flex justify-content-center align-items-center`}>
          <div className={`${props.slide!==2?styles.penguin:''} container d-flex justify-content-center align-items-center h-50`}>
            {props.slide!==props.sponsors.length?<p>{props.sponsors[props.slide]}</p>:<div className="adspace">// TODO: add ads</div>}
          </div>
      </Modal.Body>
    </Modal>
    )
}
export default StayWithMe;