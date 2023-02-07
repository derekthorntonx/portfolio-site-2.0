import { useState } from 'react';

function Login({ setLoggedIn, setToken }){
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userID === '' || password === ''){ return }
        
        const response = await fetch('http://localhost:5001/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: userID,
                password: password
            })
        })

        const data = await response.json();

        if (!response.ok){
            console.log('Login failed.');
            setUserID('');
            setPassword('');
            return;
        }

        if (response.ok){
            setLoggedIn(true);
            setToken(data.token)
            console.log('Login successful');
            return;
        }
    }

    return(
        <div className="login-card">
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor="userID">ID</label>
                <input type='text' id="userID" name="userID" value={userID} onChange={(e) => setUserID(e.target.value)}/>

                <label htmlFor="password" style={{marginTop: '10%'}}>Password</label>
                <input type='password' id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <button className='login-button'>Log In</button>
            </form>
        </div>
    )
}

export default Login;