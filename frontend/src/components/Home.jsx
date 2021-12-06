import React from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../components/User"
import styles from "../style/Home.module.css";
import userImg from "../assets/icons/user.png";
import close from "../assets/icons/close.png";
import enter from "../assets/icons/enter.png";



export default function Home(props){
    const dispatch = useDispatch();
    const {userName, userActive, userPassword} = useSelector(state => state.user)
    const passwordRef = React.useRef(null);
    
    const handleClick = (e) => {
        const value = e.target.innerHTML;
        const arr = [];
        Object.assign(arr, userPassword);
        arr.push(value)
        arr.map((e, index) => {
            if(index <= 3){
                passwordRef.current.children[index].classList.add(styles.active)
            }
        })
        dispatch({type: "USER_PASSWORD", payload: arr})
    }
    const handleDelete = () => {
        dispatch({type: "USER_PASSWORD", payload: []})
        for(let elem of passwordRef.current.children){
            elem.classList.remove(styles.active)
        }
    }
    return(
        <div className={styles.box}>
            <User />
            <div className={styles.header}>
                <button className={styles.btn} onClick={() => dispatch({type: "USER", payload: true})}>
                    <img src={userImg}/>
                    <p>{userName ? userName : "Օգտանուն"}</p>
                </button>
            </div>
            <div className={styles.content}>
                <div className={styles.password} ref={passwordRef}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles.numbers}>
                    <button onClick={handleClick}>1</button>
                    <button onClick={handleClick}>2</button>
                    <button onClick={handleClick}>3</button>
                    <button onClick={handleClick}>4</button>
                    <button onClick={handleClick}>5</button>
                    <button onClick={handleClick}>6</button>
                    <button onClick={handleClick}>7</button>
                    <button onClick={handleClick}>8</button>
                    <button onClick={handleClick}>9</button>
                    <button onClick={handleDelete}>
                        <img src={close}/>
                    </button>
                    <button onClick={handleClick}>0</button>
                    <button onClick={() => userName ? props.history.push("/blackboard") : false}>
                        <img src={enter}/>
                    </button>
                </div>
            </div>
        </div>  
    )
}

