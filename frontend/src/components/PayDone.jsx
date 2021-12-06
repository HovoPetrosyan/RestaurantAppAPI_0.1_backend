import React from "react";
import { useSelector } from "react-redux";
import styles from "../style/PayDone.module.css";
import smile from "../assets/icons/smile.png"
export default function PayDone(){
    const {payDone} = useSelector(state => state.screens)
    return(
        <div className={payDone ? styles.active : styles.box}>
            <div className={styles.content}>
                <img src={smile} alt="" />
                <h3>Գործարքը հաջողությամբ ավարտվեց</h3>
            </div>
        </div>
    )
}