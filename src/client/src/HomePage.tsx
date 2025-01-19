import * as React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

export default React.memo(() => {
    const nav = useNavigate();
    const onClickLogin = React.useCallback(() => {
        nav("/login");
    }, [nav]);
    const onClickCreateAccount = React.useCallback(() => {
        nav("/create-account");
    }, [nav]);
    return (
        <div className="HomePage">
            <button onClick={onClickLogin}>Login</button>
            <button onClick={onClickCreateAccount}>Create account</button>
        </div>
    )
})