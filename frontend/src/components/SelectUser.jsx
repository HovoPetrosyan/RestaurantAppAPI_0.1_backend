import React from "react";
import styles from "../styles/selectUser.module.scss"
import userCloseIcon from "../assets/icons/userClose.png";
import user3 from "../assets/user/user3.png";
import { useSelector, useDispatch } from "react-redux";

export default function SelectUser(){
    const dispatch = useDispatch();
    const items = useSelector(state => state.header.users)
    const screen = useSelector(state => state.screens.selectUser);

    const close = () => {
        dispatch({type: "CLOSE_SELECT_USER"})
    }
    const handleClick = e => {
        const value = e.currentTarget.getAttribute("value");
        dispatch({type: "SET_USER_NAME", payload: value});
        close();
    }
    return(
        <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
            <div>
                <div className={styles.header}>
                    <h2>Օգտատեր</h2>
                    <button onClick={close}>
                        <img src={userCloseIcon}/>
                    </button>
                </div>
                <div className={styles.content}>
                    <div>
                        {
                            items.map(e => {
                                return(
                                    <section key={`user-${e.username}`} value={e.username} onClick={handleClick}>
                                        <img src={user3}/>
                                        <h3>{e.username}</h3>
                                    </section>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}