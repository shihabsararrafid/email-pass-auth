import right from './giphy.gif';
import wrong from './wrong.jpg';
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

function App() {
  // let checking;
  let [check, setCheck] = useState(0);
  const [passCheck, setPassCheck] = useState(0);
  const auth = getAuth(app);
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
    const emailCheckReg = /^([a-z\d\.])+@([a-z\d])+\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    console.log(newEmail);
    const checkEmail = emailCheckReg.test(newEmail);

    if (checkEmail === true) {
      setCheck(1);
    }
    else {
      setCheck(0);
    }
  }
  const handleEmailBlur = (event) => {

    setEmail(event.target.value);
    handleEmailChange(event);
    console.log(email);



  }
  const handlePassBlur = (event) => {
    setPassword(event.target.value);
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    console.log(password);
    const checkPass = passRegex.test(password);
    console.log(checkPass);
    if (checkPass === true) {
      setPassCheck(1);
    }
    else {
      setPassCheck(0);
    }
  }
  const [verify, setVerify] = useState(0);
  const handleSubmitBtn = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        const user = res.user;
        console.log(user);
        sendEmailVerification(auth.currentUser)
          .then(() => {
            //email verification sent
            setVerify(1);
          })
      })
      .catch(error => {
        console.error(error);
      })


    // console.log('Clicked', email, password);


  }
  const [visibility, setVisibity] = useState(0);
  const [visibilityWrong, setVisibityWrong] = useState(0);
  const handleLoginBtn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setVisibity(1);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // setVisibity(0);
        setVisibityWrong(1)
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  }
  const handleCrossBtn = () => {
    setVisibity(0);
  }
  const handleCrossBtnWrong = () => {
    setVisibityWrong(0);
  }
  const handleCrossBtnVisibilty = () => {
    setVerify(0);
  }
  const [registered, setRegistered] = useState(false);
  const handleCheckbox = (event) => {
    //console.log(event.target.checked);
    const registered = event.target.checked;
    setRegistered(registered);
  }
  return (
    <div >
      <h1 className='text-7xl text-center text-blue-700'>Please { }{
        registered ? "Log In" : "Register"
      }</h1>
      <form className='border-2 mx-auto rounded-lg w-1/2 mt-10' >
        {/* Email field */}
        <label htmlFor="Email" className='flex items-center mt-10'>
          <span className='text-3xl'>Email:</span>
          <input onBlur={handleEmailBlur} id={23} className={`w-9/12 border-2 h-[50px] text-2xl  mx-auto block   rounded-xl ${check === 0 ? 'border-red-600' : 'border-green-500'}`} type="email" name="" />
          {

            check === 0 ? <span>&#10060;</span> : <span className='text-green-600 font-bold text-2xl duration-500'>&#10003;</span>

          }


        </label>
        {
          check === 0 ? <p className='mx-24'>Your Email must follow me@domain.com.uk</p> : ""
        }



        <br />
        <br />
        {/* password field */}
        <label htmlFor="Email" className='flex items-center mt-10 mb-10'>
          <span className='text-3xl'>Password:</span>
          <input onBlur={handlePassBlur} id={24} className={`w-9/12 border-2 h-[50px] text-2xl  mx-auto block   rounded-xl ${passCheck === 0 ? 'border-red-600' : 'border-green-500'}`} type="password" name="" />
          {

            passCheck === 0 ? <span>&#10060;</span> : <span className='text-green-600 font-bold text-2xl duration-500'>&#10003;</span>

          }
        </label>
        {
          passCheck === 0 ? <p className='mx-24'>Your password must contain at least one[A-Z],one[a-z],one[0-9] and special character and lenght between 8-20 character .</p> : ""
        }


        <input onClick={handleCheckbox} className='w-[30px]' type="checkbox" name="" id="" /><span className='text-xl'>Already registered</span>


        {
          registered ? <button onClick={handleLoginBtn} className='border-2 text-center block mx-auto py-3 px-8 rounded-lg border-blue-600 mt-10 text-3xl font-semibold'>Log In</button> : <button onClick={handleSubmitBtn} className='border-2 text-center block mx-auto py-3 px-8 rounded-lg border-blue-600 mt-10 text-3xl font-semibold'>Register</button>
        }





      </form>
      <div className={`absolute w-[40%] h-[500px]  top-0 left-96 ${visibility === 1 ? 'block' : 'hidden'}`}>
        <div className={` relative h-full w-full bg-[whitesmoke] mx-auto rounded-xl  flex-col border-2 mb-10 mt-10 flex justify-center items-center `}>
          <div className='absolute  top-0 right-0'>
            <span onClick={handleCrossBtn} className='hover:text-red-500 cursor-pointer text-4xl'>✖</span>
          </div>

          <h1 className='text-4xl text-green-600 font-semibold uppercase text-justify'>SUCCESSfully <br />logged in</h1>
          <div className='w-[60%]  h-[40%] flex justify-center rounded-full '>
            <img className='w-[50%] ' src={right} alt="" />
          </div>

        </div>
      </div>
      <div className={`absolute w-[40%] h-[500px]  top-0 left-96 ${verify === 1 ? 'block' : 'hidden'}`}>
        <div className={` relative h-full w-full bg-[whitesmoke] mx-auto rounded-xl  flex-col border-2 mb-10 mt-10 flex justify-center items-center `}>
          <div className='absolute  top-0 right-0'>
            <span onClick={handleCrossBtnVisibilty} className='hover:text-red-500 cursor-pointer text-4xl'>✖</span>
          </div>

          <h1 className='text-4xl text-green-600 font-semibold uppercase text-justify'>Email Verification sent</h1>
          <div className='w-[60%]  h-[40%] flex justify-center rounded-full '>
            <img className='w-[50%] ' src={right} alt="" />
          </div>

        </div>
      </div>
      <div className={`absolute w-[40%] h-[500px]  top-0 left-96 ${visibilityWrong === 1 ? 'block' : 'hidden'}`}>
        <div className={` relative h-full w-full bg-[white] mx-auto rounded-xl  flex-col border-2 mb-10 mt-10 flex justify-center items-center `}>
          <div className='absolute  top-0 right-0'>
            <span onClick={handleCrossBtnWrong} className='hover:text-red-500 cursor-pointer text-4xl'>✖</span>
          </div>

          <h1 className='text-4xl text-green-600 font-semibold uppercase'>Fail to <br />log in</h1>
          <div className='w-[60%]  h-[40%] flex justify-center rounded-full '>
            <img className='w-[50%] ' src={wrong} alt="" />
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
