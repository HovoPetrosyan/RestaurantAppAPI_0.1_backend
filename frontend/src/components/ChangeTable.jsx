import React from "react";
import styles from "../styles/changeTable.module.scss";
import changeIcon from "../assets/icons/change.png";
import closeIcon from "../assets/icons/userClose.png"
import {useSelector, useDispatch} from "react-redux";
import Picker from 'react-mobile-picker-scroll';

export default function ChangeTable(){
    const dispatch = useDispatch();
    const [state, setState] = React.useState({
        valueGroups: {
            title: 1
        }, 
        optionGroups: {
            title: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    })
    const screen = useSelector(state => state.screens.changeTable)
    const open = () => dispatch({type: "OPEN_CHANGE_TABLE"});
    const close = () => dispatch({type: "CLOSE_CHANGE_TABLE"});

    const handleChange = (name, value) => {
        setState(({valueGroups}) => ({
            ...state,
          valueGroups: {
            ...valueGroups,
            [name]: value
          }
        }));
    };
    return(
        <React.Fragment>
            <button onClick={open}>
                <img src={changeIcon} alt="" />
                <h3 style={{marginLeft: 10}}>Փոխել սեղանը</h3>
            </button>
            <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
                <div>
                    <div className={styles.header}>
                        <h2>Փոխել սեղանը</h2>
                        <button onClick={close}>
                            <img src={closeIcon} alt="" />
                        </button>
                    </div>
                    <div className={styles.content}>
                        <button>ՓՈԽԵԼ</button>
                        <div>
                        <h3>Ընտրել սեղանը</h3>
                        <Picker
                            optionGroups={state.optionGroups}
                            valueGroups={state.valueGroups}
                            itemHeight={50}
                            onChange={handleChange} 
                            height={270}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}