import React from "react";
import left from '../assets/icons/left.png';
import right from '../assets/icons/right.png';
import styles from "../styles/table.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios"

export default function Table(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = React.useRef(null);
    const rightRef = React.useRef(null);
    const [scroll, setScroll] = React.useState(0);
    const {tableItems} = useSelector(state => state.table);


    React.useEffect(() => {
        dispatch({type: "HEADER_TITLE", payload: "ԸՆՏՐԵԼ  ՍԵՂԱՆԸ"});
        dispatch({type: "HEADER_HALL", payload: "Սրահ ։ Բառ"});
        dispatch({type: "HEADER_TABLE", payload: ""});
        disableRight(ref.current.scrollLeft + 196);


        axiosInstance.get("/api/tables/all/", {
            params: {
                token: sessionStorage.getItem("token")
            }
        })
        .then(res => dispatch({type: "SET_TABLE_ITEMS", payload: res.data}));


    }, [])

    const toRight = () => {
        ref.current.scrollLeft += 196;
        setScroll(ref.current.scrollLeft + 196);
        disableRight();
    }
    const toLeft = () => {
        ref.current.scrollLeft -= 196;
        setScroll(ref.current.scrollLeft - 196);
        disableRight();
    }

    const disableRight = () => {
        if(ref.current.scrollWidth <= Math.ceil(ref.current.offsetWidth + scroll)){
            rightRef.current.setAttribute("disabled", true);
        }else{
            rightRef.current.removeAttribute("disabled");
        }
    }

    const handleClick = e => {
        if(e.target.getAttribute("type") !== "fix"){
            dispatch({type: "SET_TABLE", payload: e.target.innerHTML});
            dispatch({type: "SET_TABLE_TYPE", payload: e.target.getAttribute("type")});
            dispatch({type: "OPEN_CHOOSE_TABLE"});
        }else{
            dispatch({type: "SET_TABLE", payload: e.target.innerHTML});
            dispatch({type: "HEADER_TABLE", payload: `Սեղան ։ ${e.target.innerHTML}`});
            navigate("/order");
        }
    };


    return(
        <div className={styles.box}>
            <button onClick={toLeft} disabled={scroll <= 1 ? true : false}>
                <img src={left}/>
            </button>
            <div className={styles.container} ref={ref}>
                {
                    tableItems.map((e, index) => {
                        return(
                            <button 
                            className={styles.item} 
                            key={`table-${index}`} 
                            onClick={handleClick} 
                            type={e.ordering ? "fix" : e.reserved ? "reserved" : "null"}
                            >{e.title}</button>
                        )
                    })  
                }
            </div>
            <button onClick={toRight} ref={rightRef}>
                <img src={right}/>
            </button>
        </div>
    )
}
