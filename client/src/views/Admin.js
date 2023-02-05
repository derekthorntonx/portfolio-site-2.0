import Login from "../components/Login";
import { useState } from 'react';


//No context because login session should end immediately on navigation.
function Admin(){
    const [loggedIn, setLoggedIn] = useState(false);
    return(
    <div className='about-me-section'>
        {!loggedIn ? <Login setLoggedIn={setLoggedIn} /> : <div>stuffhere</div> }
        <div className='section-divider waves'></div>
    </div>
    )
}

export default Admin;