import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './requests.ts';
import "./Login.css";

export default React.memo(() => {
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const nav = useNavigate();

    const onCreateAccount = React.useCallback(async () => {
        await createUser({ username, password });
        nav("/login");
    }, [nav, username, password]);

    const onUsernameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value) }, [setUserName]);
    const onPasswordChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }, [setPassword]);

    return (
        <div className="container">
            <input type="text" value={username} placeholder="Username" onChange={onUsernameChange} />
            <input type="text" value={password} placeholder="Password" onChange={onPasswordChange} />
            <button onClick={onCreateAccount}>Create account</button>
        </div>
    )
})