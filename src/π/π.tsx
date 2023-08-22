import React, {Component} from "react";
import ReactDOM from 'react-dom';
import styles from './π.module.css';

interface pi {
    toggle: boolean;
    setToggle: Function;
}

class π extends Component<pi>{
    ignoreMenu = (e: Event) => {
        e.preventDefault();
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this)?.addEventListener('contextmenu', this.ignoreMenu);
    }
    componentWillUnmount(){
        ReactDOM.findDOMNode(this)?.removeEventListener('contextmenu', this.ignoreMenu);
    }
    render() {
        const {setToggle, toggle} = this.props;
        return <div className={`${styles.π} position-absolute bottom-0 end-0`}>
                    <button onClick={(e)=>{if(e.ctrlKey&&e.shiftKey)setToggle(!toggle);}}>π</button>
                </div>
    }
}

export default π;