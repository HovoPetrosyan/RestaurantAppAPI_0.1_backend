import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "../style/Blackboard.module.css"
import BlackboardHeader from "./BlackboardHeader";
import Supplier from "./Supplier";
import Table from "./Table"
import GoBack from "./GoBack";
import Bill from "./Bill";

export default function BlackBoard(){
    const dispatch = useDispatch();
    return(
        <React.Fragment>
            <BlackboardHeader />
            <div className={styles.box}>
                <div>
                    <Router>
                        <Route exact path="/blackboard" component={Supplier}/>
                        <Route exact path="/blackboard/table" component={Table}/>
                        <Route exact path="/blackboard/table/bill" component={Bill}/>
                    </Router>
                </div>
            </div>
            <GoBack />

        </React.Fragment>
    )
}