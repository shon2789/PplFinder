import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "AppRouter";

//Notifications
import ReactNotification from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

ReactDOM.render(
    <React.StrictMode>
        <ReactNotification />
        <AppRouter />
    </React.StrictMode>,

    document.querySelector("#root")
);
