import React, {useState, useEffect} from 'react';
import styles from './Editor.module.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';

interface TextEditor {
    toggled: boolean;
    display: string;
    value: string;
    onChange: Function;
    setKey: Function;
    onMove: Function;
    win: boolean;
    run: boolean;
    setRun: Function;
}

function Editor(this: any, props:TextEditor) {
    const [count, setcount] = useState(0);
    useEffect(()=>{
        const interval = setInterval(() => {
            if(props.run) {
                props.onMove(props.value);
                props.setKey(Math.random()); 
                setcount(count+1);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [props, count]);
    return (
        <div className={`${styles.editor} ${props.toggled?"":styles.hidden}`}>
            <div className={styles.editorheader}>
                <span>{props.display}</span>
                <span>{"runs: "+count}</span>
                <button className={`${styles.run} btn ${!props.run ? "btn-primary" : "btn-danger"}`}
                    onClick={()=>{props.setRun(!props.run)}}>
                    {!props.run ? "Run" : "Stop"}
                </button>
            </div>
            <div className={`${styles.editorbody} h-100`}>
                <ControlledEditor
                value={props.value}
                onBeforeChange={(editor, data, value)=>props.onChange(value)} 
                onFocus={() => props.setRun(false)}
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: 'darcula'
                }}/>
            </div>
        </div>
    );
}

export default Editor;