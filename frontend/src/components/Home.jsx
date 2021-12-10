import React from "react";
import styles from "../styles/home.module.scss"
import userImgIcon from "../assets/icons/user.png";
import closeIcon from "../assets/icons/close.png";
import enterIcon from "../assets/icons/enter.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function App(){
    let password = [];
    const ref = React.useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector(state => state.user.userName);

    const openSelectUser = () => {
        dispatch({type: "OPEN_SELECT_USER"});
    }

    const handleClick = e => {
        const value = e.currentTarget.innerHTML;
        if(password.length <= 7) password.push(value);
        password.map((e, index) => {
            ref.current.children[index].classList.add(styles.active)
        });
    }

    const deletePassword = () => {
        password = [];
        for(let e of ref.current.children){
            e.classList.remove(styles.active);
        }
    }

    const enter = () => {
        axios.post("http://192.168.12.25:8000/api/users/login/", {
            username: userName,
            password: password.join('')
        })
        .then(res => {
            sessionStorage.setItem("token", res.data.access)
            navigate("/table");
        });
    };

    return(
        <div className={styles.box}>
            <div className={styles.header}>
                <button onClick={openSelectUser}>
                    <img src={userImgIcon}/>
                    <p>{userName}</p>
                </button>
                <div className={styles.logo}>
                    ACTRADE
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.password} ref={ref}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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
                    <button onClick={deletePassword}>
                        <img src={closeIcon}/>
                    </button>
                    <button onClick={handleClick}>0</button>
                    <button onClick={enter}>
                        <img src={enterIcon}/>
                    </button>
                </div>
            </div>
        </div>  
    )
}