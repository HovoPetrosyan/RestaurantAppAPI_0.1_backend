import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/User.module.css";
import userClose from "../assets/icons/userClose.png";
import user1 from "../assets/user/user1.png";
import user2 from "../assets/user/user2.png";
import user3 from "../assets/user/user3.png";

export default function User(){
    const dispatch = useDispatch();
    const container = React.useRef();
    const user = useSelector(state => state.screens.user);
    React.useEffect(() => {
        const arr = container.current.children;
        for(const e of arr){
            const name = e.children[1].innerHTML;
            const img = e.getAttribute("value");
            e.onclick = () => handleClick(name, img)
        }
    })
    const handleClick = (name, img) => {
        dispatch({type: "USER_NAME", payload: name});
        dispatch({type: "USER_IMG", payload: img});
        closeUser();
    }
    const closeUser = () => {
        dispatch({type: "USER", payload: false})
    }
    return(
        <div className={user ? styles.active : styles.box}>
            <div>
                <div className={styles.header}>
                    <h2>Օգտատեր</h2>
                    <button onClick={closeUser}>
                        <img src={userClose}/>
                    </button>
                </div>
                <div className={styles.content}>
                    <div className={styles.contentContainer} ref={container}>
                        <section value={"user1"} elem={0}>
                            <img src={user1}/>
                            <h3>Սարիբեկ Միրզախանյան</h3>
                        </section>
                        <section value={"user2"} elem={1}>
                            <img src={user2}/>
                            <h3>Աննա Գեղամյան</h3>
                        </section>
                        <section value={"user3"} elem={2}>
                            <img src={user3}/>
                            <h3>Կատյա Միրզախանյան</h3>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}