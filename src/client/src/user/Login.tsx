import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './requests.ts';
import "./Login.css";

export default React.memo(() => {
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const nav = useNavigate();

    const onLogin = React.useCallback(async () => {
        console.log(username, password);
        const response = await login({ username, password });
        if (response.error) {
            setError(response.error)
        } else {
            setError("");
            nav("/editor/0");
        }
    }, [nav, username, password]);

    const onUsernameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value) }, [setUserName]);
    const onPasswordChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }, [setPassword]);

    return (
        <div className="container">
            {error && <span className="error">{error}</span>}
            <input type="text" value={username} placeholder="Username" onChange={onUsernameChange} />
            <input type="password" value={password} placeholder="Password" onChange={onPasswordChange} />
            <button onClick={onLogin}>Login</button>
        </div>
    )
})