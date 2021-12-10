import React from "react";
import styles from "../styles/print.module.scss";
import {useDispatch, useSelector} from "react-redux";
import closeIcon from "../assets/icons/userCloseGray.png"

export default function Print(){
	const dispatch = useDispatch();
	const screen = useSelector(state => state.screens.print);


	const accept = () => {
        close()
        dispatch({type: "OPEN_PAY_DONE"})
        setTimeout(() => dispatch({type: "CLOSE_PAY_DONE"}), 1200)
    };
	const close = () => dispatch({type: "CLOSE_PRINT"});
	return(
        <div className={screen ? `${styles.box} ${styles.active}` : styles.box}>
            <div>
                <div className={styles.header}>
                    <h2>Կտրոն</h2>
                    <button onClick={close}>
                        <img src={closeIcon} alt="" />
                    </button>
                </div>
                <div className={styles.container}>
                    <section>
                        <h3>ՍՈՒՐՃ ԱՄԵՐԻԿԱՆՈ</h3>
                        <h3>2 Բաժակ</h3>
                        <h3>1200 դր</h3>
                        <h3>2400 Դր</h3>
                    </section>
                    <section>
                        <h3>ՍՈՒՐՃ ԱՄԵՐԻԿԱՆՈ</h3>
                        <h3>2 Բաժակ</h3>
                        <h3>1200 դր</h3>
                        <h3>2400 Դր</h3>
                    </section>
                    <section>
                        <h3>ՍՈՒՐՃ ԱՄԵՐԻԿԱՆՈ</h3>
                        <h3>2 Բաժակ</h3>
                        <h3>1200 դր</h3>
                        <h3>2400 Դր</h3>
                    </section>
                </div>
                <div className={styles.footer}>
                    <h3>ԸՆԴՀԱՆՈՒՐ <span>45.000 դր</span></h3>
                    <form>
                        <input type="checkbox" id="discount"/>
                        <label htmlFor="discount">Զեղչ 10%</label>
                    </form>
                    <button onClick={accept}>ՏՊԵԼ</button>
                </div>
            </div>
        </div>
	)
}