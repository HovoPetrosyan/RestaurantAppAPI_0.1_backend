import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/User.module.css";
import userClose from "../assets/icons/userClose.png";
import user1 from "../assets/user/user1.png";
import user2 from "../assets/user/user2.png";
import user3 from "../assets/user/user3.png";

export default function UserChange(){
    const history = useHistory();
    const dispatch = useDispatch();
    const container = React.useRef();
    const userChange = useSelector(state => state.screens.userChange);
    const userActive = useSelector(state => state.user.userActive);
    React.useEffect(() => {
        const arr = container.current.children;
        for(const e of arr){
            const name = e.children[1].innerHTML;
            const img = e.getAttribute("value");
            e.onclick = () => {
                handleClick(name, img)
            }
        }
    })
    const handleClick = (name, img) => {
        dispatch({type: "USER_LOGOUT", payload: null})
        history.replace("/")
        dispatch({type: "USER_NAME", payload: name});
        dispatch({type: "USER_IMG", payload: img});
        closeUser();
    }
    const closeUser = () => {
        dispatch({type: "USER_CHANGE", payload: false})
    }
    return(
        <div className={userChange ? styles.active : styles.box}>
            {}
            <div>
                <div className={styles.header}>
                    <h2>Մատուցողի փոփոխություն</h2>
                    <button onClick={closeUser}>
                        <img src={userClose}/>
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentContainer} ref={container}>
                        <section value={"user1"}>
                            <img src={user1}/>
                            <h3>Սարիբեկ Միրզախանյան</h3>
                        </section>
                        <section value={"user2"}>
                            <img src={user2}/>
                            <h3>Աննա Գեղամյան</h3>
                        </section>
                        <section value={"user3"}>
                            <img src={user3}/>
                            <h3>Կատյա Միրզախանյան</h3>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}