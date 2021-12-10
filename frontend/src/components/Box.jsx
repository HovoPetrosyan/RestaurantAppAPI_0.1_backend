import React from "react";
import styles from "../styles/box.module.scss";
export default function Box(props){
    return(
        <div className={styles.box}>
            <div className={styles.container}>
                {props.children}
            </div>
        </div>
    )
}

