import React, { useState, useEffect } from "react";

// css
import "../styles.css";
import x_path from "../img/x.png";

function ToastDimension(props) {

    function toastClickEvent() {
	    props.setToastState(false);
    }
    useEffect(() => {
        let timer = setTimeout(() => {
            props.setToastState(false);		// 2초 뒤, toastState가 false가 되면서 알림창이 사라진다
        }, 5000);

        return () => { clearTimeout(timer) }
    }, []);
    return (
        <div className="toast-alert2" >
            <p>⚠ Input/Output Dimension Error!</p>
            <img alt="" src={x_path} onClick={() => { toastClickEvent() }}/>
        </div>
    );
}

export { ToastDimension }