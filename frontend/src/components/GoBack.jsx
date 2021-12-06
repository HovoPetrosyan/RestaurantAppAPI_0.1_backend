import React from "react";
import { useHistory } from "react-router";
import styles from "../style/GoBack.module.css";
import icon from "../assets/icons/goBack.png"
export default function GoBack(){
    const history = useHistory();
    return(
        <button 
        onClick={() => history.goBack()}
        className={styles.box}
        >
            <img src={icon}/>
        </button>
    )
}