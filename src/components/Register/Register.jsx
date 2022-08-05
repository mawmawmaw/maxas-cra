import { useEffect, useState } from 'react';
import './Register.css';
const Register = () => {
    const [userName, setUserName] = useState("");
    const [userEmail , setUserEmail] = useState("");
    const [area, setArea] = useState();
    const [phone, setPhone] = useState();
    const [registeredUsersCount,setRegisteredUsersCount] = useState(0);
    const [counter, setCounter] = useState('0d 0h 0m 0s');
    const [registered, setRegistered] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const initCounter = () => {
        var countDownDate = new Date("Jul 2, 2022 18:30:00").getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setCounter(days + "d " + hours + "h " + minutes + "m " + seconds + "s ") ;
            if (distance < 0) {
                clearInterval(x);
                setCounter('0d 0h 0m 0s');
            }
        }, 1000);
    }

    useEffect(()=>{
        initCounter();
    },[])

    const getRegisteredUsersCount = async () => {
        try{
            const requestOptions = {
                method: 'GET'
            };
            const response = await fetch('https://www.maxas.xyz/api/getRegisteredUsersCount.php', requestOptions);
            const count = await response.json();
            setRegisteredUsersCount(count);
        }catch(e){
            setRegisteredUsersCount(-1);
            console.error("Error: could not load count")
        }
    }

    useEffect(()=>{
        getRegisteredUsersCount();
    },[registering,registered,error])

    const registerUser = async (e) => {
        e.preventDefault();
        setRegistering(true);
        if(userName !== "" && userEmail !== "" && area !== "" && phone !== "" ){
            try{
                let phoneNumber = '+' + area + phone;
                const userRegistration = JSON.stringify({
                    "userName": userName,
                    "userEmail": userEmail,
                    "phoneNumber": phoneNumber
                })
                const requestOptions = {
                    method: 'POST',
                    body: userRegistration,
                };
                const response = await fetch('https://www.maxas.xyz/api/registerUser.php', requestOptions);
                const registered = await response.json();
                if(registered === true){
                    setRegistered(true);
                }else{
                    switch(registered){
                        case 'E1':
                            setErrorMsg("Error: Could not register, please complete all fields.");
                            break;
                        case 'E2':
                            setErrorMsg("Error: Could not register, pre-registration is full.");
                            break;
                        default:
                            if(registered.substring(0,2) === 'E3') console.log(registered.split("~")[1]);
                            setErrorMsg("Error: Could not register, something went wrong.");
                            break;
                    }
                    setError(true);
                }
            }catch(e){
                setErrorMsg("Error: Could not register, something went wrong. Please reload and try again.");
                setError(true);
            }
        }else{
            setError(true);
        }
        setRegistering(false);
    }

    const renderUserRegistrationCount = () => {
        return (
            <div className='user-registration-count'>
                { registeredUsersCount === 0 ? 'Loading...' : registeredUsersCount === -1 ? '' : registeredUsersCount+"/1000" }
            </div>
        )
    }

    const renderRegistration = () => {
        if (registering) return <form className='register'><button type='submit' className='button' disabled="true">Registering...</button></form>;
        if (error) return <p>{errorMsg !== '' ? errorMsg : "Sorry, something went wrong. Please reload."}</p>;
        if (registered) return <p>Thank you for registering!</p>;
        if (registeredUsersCount === 1000) return <p>Registration for pre-mint is full!</p>;
        return (<>
            <p>To be able to mint during the free pre-mint, please register here:</p>
            <form className='register' onSubmit={e=>registerUser(e)} target="https://www.maxas.xyz/api/register.php" method="POST">
                <div className='input-container'>
                    <label htmlFor="userName">Name</label>
                    <input type="text" id="userName" name="userName" minLength="3" maxLength="20" placeholder='Your name...' required  value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                <div className='input-container'>
                    <label htmlFor="userName">Email</label>
                    <input type="email" id="userEmail" name="userEmail" placeholder='Your email...' required value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                </div>
                <div className='input-container'>
                    <label htmlFor="area">Country Code</label>
                    <input type="number" id="area" name="area" maxLength="3" placeholder='+52' required value={area} onChange={(e)=>setArea(e.target.value)}/>
                </div>
                <div className='input-container'>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="number" id="phone" name="phone" maxLength="12" placeholder='55 5555 5555' required value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                </div>
                <div className='input-container check'>
                    <label htmlFor="consent">I Accept to receive future emails/sms</label>
                    <input type="checkbox" id="consent" name="consent" value="I Accept to receive future emails/sms" required />
                </div>
                <button type='submit' className='button' disabled={Boolean(registering)}>{registering ? 'Registering...' : 'Register'}</button>
            </form>
        </>)
    }

    return (
        <div id="register" className='section'>
            <div className='container'>
                <div className='content'>
                    <h2 className='counter'>{counter}</h2>
                    <h2 className='section-title'>Pre-Mint Registration</h2>
                    {renderUserRegistrationCount()}
                    {renderRegistration()}
                </div>
            </div>
        </div>
    )
}
export default Register;