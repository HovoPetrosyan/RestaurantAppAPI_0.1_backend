import React from "react";
import styles from "../styles/selectUser.module.scss"
import user3 from "../assets/user/user3.png";
import userCloseIcon from "../assets/icons/userClose.png";
import { useSelector, useDispatch } from "react-redux";
import AcceptChangeUser from "./AcceptChangeUser";

export default function ChangeUser(){
    const dispatch = useDispatch();
    const [select, setSelect] = React.useState("");
    const items = useSelector(state => state.header.users)
    const {userName} = useSelector(state => state.user)
    const screen = useSelector(state => state.screens.changeUser);
    const cose = () => {
        dispatch({type: "CLOSE_CHANGE_USER"})
    }
    const handleClick = e => {
        const value = e.currentTarget.getAttribute("value");
        setSelect(value)
        dispatch({type: "OPEN_ACCEPT_CHANGE_USER"})
    }
    return(
        <React.Fragment>
            <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
                <div>
                    <div className={styles.header}>
                        <h2>Մատուցողի փոփոխություն</h2>
                        <button onClick={cose}>
                            <img src={userCloseIcon}/>
                        </button>
                    </div>
                    <div className={styles.content}>
                        <div>
                            {
                                items.map(e => {
                                    return(
                                        <section 
                                        key={`user-${e.username}`} 
                                        value={e.username} 
                                        className={userName === e.username ? styles.active : null}
                                        onClick={handleClick}
                                        >
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
            <AcceptChangeUser userName={select}/>
        </React.Fragment>
    )
}