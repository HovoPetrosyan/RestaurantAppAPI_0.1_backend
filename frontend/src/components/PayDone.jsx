import React from "react";
import styles from "../styles/payDone.module.scss";
import smileIcon from "../assets/icons/smile.png";
import { useSelector } from "react-redux";

export default function PayDone(){
    const screen = useSelector(state => state.screens.payDone);
    return(
        <div className={screen ? styles.box : styles.inactive}>
            <div className={styles.content}>
                <img src={smileIcon} alt="" />
                <h3>Գործարքը հաջողությամբ ավարտվեց</h3>
            </div>
        </div>
    )
}