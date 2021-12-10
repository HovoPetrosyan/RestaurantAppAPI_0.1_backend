import React from "react";
import styles from "../styles/back.module.scss";
import backIcon from "../assets/icons/goBack.png";
import { useNavigate } from "react-router-dom";
export default function Back(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return(
        <button className={styles.box} onClick={handleClick}>
            <img src={backIcon}/>
        </button>
    )
}