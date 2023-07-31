// import React, { useEffect, useState } from 'react';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetch('/php/hello.php')
//       .then(response => response.json())
//       .then(data => setMessage(data.message))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//     </div>
//   );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
// import ListUser from './components/ListUser.js';
// import CreateUser from './components/CreateUser';
// import EditUser from './components/EditUser';

// const App = () => {
//   return (
//     <div>
//    <BrowserRouter>
//    <nav>
//     <ul>
//       <li>
//         <Link to="/">List user</Link>
//       </li>
//       <li>
//         <Link to="user/create">create user</Link>
//       </li>
//     </ul>
//    </nav>
//    <Routes>
//     <Route index element={<ListUser/>}></Route>
//     <Route path="user/create"element={<CreateUser/>}></Route>
//     <Route path="user/:id/edit"element={<EditUser/>}></Route>
//    </Routes>
//    </BrowserRouter>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from 'react';
// import "./App.css"
// const App = () => {
//   const [showGallery, setShowGallery] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleCircleClick = () => {
//     setShowGallery(true);
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(URL.createObjectURL(file));
//     setShowGallery(false);
//   };

//   return (
//     <div>
//       <div
//         className="circle"
//         onClick={handleCircleClick}
//         style={{
//           backgroundImage: `url(${selectedImage})`,
//           backgroundSize: selectedImage ? 'cover' : 'auto',
//           backgroundPosition: selectedImage ? 'center' : 'unset',
//         }}
//       >
//         {selectedImage ? null : (
//           <div>
//             Upload Image
//             <input type="file" onChange={handleImageUpload} />
//           </div>
//         )}
//       </div>
//       {showGallery && (
//         <div className="gallery">
//           <h2>Upload Image</h2>
//           <input type="file" onChange={handleImageUpload} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
// import React, { useState } from 'react';
// import ProgressBar from 'react-progress-bar';

// const App = () => {
//   const [details, setDetails] = useState({
//     name: '',
//     age: '',
//     // Add more fields as needed
//   });
//   const [photos, setPhotos] = useState([]);
//   const [progress, setProgress] = useState(0);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     const newPhotos = [...photos];

//     for (let i = 0; i < files.length; i++) {
//       newPhotos.push(files[i]);
//     }

//     setPhotos(newPhotos);
//   };

//   const handleUpload = () => {
//     // Simulating upload progress
//     const interval = setInterval(() => {
//       setProgress((prevProgress) => prevProgress + 10);

//       if (progress >= 100) {
//         clearInterval(interval);
//         // Perform any necessary actions after the upload is complete
//       }
//     }, 1000);
//   };

//   return (
//     <div>
//       <h2>Upload Form</h2>
//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={details.name}
//         onChange={handleInputChange}
//       />
//       <input
//         type="number"
//         name="age"
//         placeholder="Age"
//         value={details.age}
//         onChange={handleInputChange}
//       />
//       {/* Add more fields here */}

//       <input type="file" multiple onChange={handleFileChange} />

//       <button onClick={handleUpload}>Upload</button>

//       <ProgressBar
//         completed={progress}
//         symbolClassName="progress-symbol"
//         labelAlignment="outside"
//         labelAlignmentTop={-20}
//         labelAlignmentLeft={50}
//         height="20px"
//       />
//       <span className="progress-symbol">{progress}%</span>
//     </div>
//   );
// };



// export default App;
import React, { useState, useEffect } from 'react';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TextField from "@mui/material/TextField";
//This is Usha
const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [inputValid, setInputValid] = useState({
    username: false,
    password: false,
    email: false,
    mobile: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'username':
        // Username should start with a capital letter
        return /^[A-Z]/.test(value.trim());
      case 'password':
        // Password should have at least 6 characters, at least one special character, and at least one number
        return /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.*[0-9]).{6,}$/.test(value);
      case 'email':
        return validator.isEmail(value);
      case 'mobile':
        return validator.isMobilePhone(value, 'any', { strictMode: false });
      default:
        return true;
    }
  };

  useEffect(() => {
    let errors = 0;

    if (showErrors) {
      if (!inputValid.username) errors++;
      if (!inputValid.password) errors++;
      if (!inputValid.email) errors++;
      if (!inputValid.mobile) errors++;
    }

    setErrorCount(errors);
  }, [showErrors, inputValid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setInputValid((prevState) => ({
      ...prevState,
      [name]: validateField(name, value),
    }));

    // Update state based on the input field name
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      default:
        break;
    }
  };

  const inputError = (fieldName) => !inputValid[fieldName];

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowErrors(true); // Set showErrors to true when the form is submitted
    setIsSubmitted(true);
  };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      let errorMessage = '';

      if (inputError('username')) errorMessage += 'Username is required. ';
      if (inputError('password')) errorMessage += 'Password is required. ';
      if (inputError('email')) errorMessage += 'Invalid email format. ';
      if (inputError('mobile')) errorMessage += 'Invalid mobile number. ';

      if (errorMessage !== '') {
        toast.error(errorMessage);
      }
    }
  };

  const inputGroupStyle = {
    position: 'relative',
  };

  const circleColor = errorCount > 0 ? 'red' : 'blue';

  const circleIconStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%,-50%)',
    color: circleColor,
  };

  const validIconStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%,-50%)',
    color: 'green',
  };

  const errorIconStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    color: 'red',
  };

  useEffect(() => {
    setInputValid((prevState) => ({
      ...prevState,
      username: validateField('username', username),
      password: validateField('password', password),
      email: validateField('email', email),
      mobile: validateField('mobile', mobile),
    }));
  }, [username, password, email, mobile]);

  return (
    <div className="container">
      <h2 style={{color:"blue"}}>Form<span style={{color:"red"}}>Validation</span> </h2>
      <div className='sai'>
        <div className="error-count">Number of Errors: <span className='span'>{errorCount}</span></div>
       <div className='sai'>
       <span className="error-circle" style={{ backgroundColor: circleColor }}></span>
       </div>
        <div className="checkbox-group">

          <input type="checkbox" id="showErrorsCheckbox" onChange={handleCheckboxChange} />
          <label htmlFor="showErrorsCheckbox">Show Errors</label>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <div className="input-group" style={inputGroupStyle}>
          <label htmlFor="username">Username:</label>
          <TextField
            id="filled-basic"
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
            onBlur={() => setInputValid((prevState) => ({ ...prevState, username: validateField('username', username) }))}
            style={{
              borderColor: inputValid.username ? 'blue' : 'black',
            }}
          />
          {inputValid.username && <span className="valid-icon" style={validIconStyle}>&#10004;</span>}
          {inputError('username') && showErrors && <span className="cross-icon" style={errorIconStyle}>&#10006;</span>}
          {inputError('username') && showErrors && <div className="error-message">Username should start with a capital letter</div>}
        </div>

        {/* Password input field */}
        <div className="input-group" style={inputGroupStyle}>
          <label htmlFor="password">Password:</label>
          <TextField
            id="filled-basic"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            onBlur={() => setInputValid((prevState) => ({ ...prevState, password: validateField('password', password) }))}
            style={{
              borderColor: inputValid.password ? 'blue' : 'black',
            }}
          />
          {inputValid.password && <span className="valid-icon" style={validIconStyle}>&#10004;</span>}
          {inputError('password') && showErrors && <span className="cross-icon" style={errorIconStyle}>&#10006;</span>}
          {inputError('password') && showErrors && <div className="error-message">Password should have at least 6 characters, at least one special character, and at least one number</div>}
        </div>

        {/* Email input field */}
        <div className="input-group" style={inputGroupStyle}>
          <label htmlFor="email">Email:</label>
          <TextField
            id="filled-basic"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            onBlur={() => setInputValid((prevState) => ({ ...prevState, email: validateField('email', email) }))}
            style={{
              borderColor: inputValid.email ? 'blue' : 'black',
            }}
          />
          {inputValid.email && <span className="valid-icon" style={validIconStyle}>&#10004;</span>}
          {inputError('email') && showErrors && <span className="cross-icon" style={errorIconStyle}>&#10006;</span>}
          {inputError('email') && showErrors && <div className="error-message">Invalid email format</div>}
        </div>

        {/* Mobile input field */}
        <div className="input-group" style={inputGroupStyle}>
          <label htmlFor="mobile">Mobile:</label>
          <TextField
            id="filled-basic"
            label="Mobile"
            type="mobile"
            name="mobile"
            value={mobile}
            onChange={handleInputChange}
            onBlur={() => setInputValid((prevState) => ({ ...prevState, mobile: validateField('mobile', mobile) }))}
            style={{
              borderColor: inputValid.mobile ? 'blue' : 'black',
            }}
          />
          {inputValid.mobile && <span className="valid-icon" style={validIconStyle}>&#10004;</span>}
          {inputError('mobile') && showErrors && <span className="cross-icon" style={errorIconStyle}>&#10006;</span>}
          {inputError('mobile') && showErrors && <div className="error-message">Invalid mobile number</div>}
        </div>

        <button type="submit">Submit</button>
        <br />
        <button type="submit">Test</button>
        <br />
        <button type="button">testing github</button>
      </form>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </div>
  );
};

export default App;
// import React, { useState,useEffect } from 'react';
// import Carousel from './Carousel';
// import './App.css';
// const imageUrls = [

//   "https://ak.jogurucdn.com/media/image/p15/media_gallery-2016-02-5-8-incredible_india_p_4fa828c2239ac0f94e0a621eeb7c88a2.jpg",
//   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpx_naXiFfoXhNfNmekepe_Uzp6RtxXuw1fg&usqp=CAU",
//   "https://cdn.tripways.com/2020/11/07094043/golden-temple-3.jpg",
//   // Add more image URLs as needed
// ];





// const images = [
//   'https://truetalent.io/logo.png?1',
//   'https://static.wixstatic.com/media/ecb578_8ce5ce3540d14209aa378b7b8e7ea84a~mv2_d_5906_3543_s_4_2.png/v1/crop/x_0,y_387,w_5906,h_2770/fill/w_560,h_262,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/RAW%20TALENT%20LOGO.png',
//   'https://static.wixstatic.com/media/5bdeb5_4115a363b15b4d38a0d78616a6f22a92~mv2.png/v1/fill/w_560,h_118,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/True%20Talent_Blues_Horizontal_23.png',
//   // Add more image URLs here
// ];




// function App() {
//  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
//   const [isRegisterPopupVisible, setIsRegisterPopupVisible] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [jsondata, setJsonData] = useState([]);
//   const toggleLoginPopup = () => {
//     setIsLoginPopupVisible((prev) => !prev);
//   };

//   const toggleRegisterPopup = () => {
//     setIsRegisterPopupVisible((prev) => !prev);
//   };
//   useEffect(() => {
//     // Function to change the background image every 2 seconds
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
//     }, 2000);
  
//     // Cleanup the interval on component unmount
//     return () => clearInterval(interval);
//   }, [imageUrls.length]);
  
//   const backgroundImageStyle = {
//     backgroundImage: `linear-gradient(
//       180deg,
//       rgba(59, 56, 59, 0.1),
//       rgba(59, 56, 59, 0.1)
//     ),
//     url(${imageUrls[currentImageIndex]})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     width: "100vw",
//     height: "100vh",
//     animation: "fadeInOut 4s infinite",
//   };
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
//       .then((response) => response.json())
//       .then((data) => setJsonData(data))
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <div className="App">

//       <header>
//         <h2>TRUE TALENT</h2>
//         <nav>
//           <a href="#">HOME</a>
//           <a href="#">BLOG</a>
//           <a href="#">CONTACT</a>
//           <a href="#">ABOUT</a>
//         </nav>
//         <div class='sign-in-up'>
//           <button type='button'onClick={toggleLoginPopup}>LOGIN</button>
//           <button type='button'onClick={toggleRegisterPopup} >REGISTER</button>
//         </div>
//         {isLoginPopupVisible && (
//         <div className="popup-container" id="login-popup">
//           <div className="popup">
//             <form method="POST" action="login_register.php">
//               <h2>
//                 <span>USER LOGIN</span>
//                 <button type="reset" onClick={toggleLoginPopup}>X</button>
//               </h2>
//               <input type="text" placeholder="E-mail or Username" name="email_username" />
//               <input type="password" placeholder="Password" name="password" />
//               <input type="email" placeholder="E-mail" name="email" />
//               <input type="password" placeholder="Password" name="password" />
//               <button type="submit" className="login-btn" name="login">LOGIN</button>
//             </form>
//           </div>
//         </div>
//       )}
//        {isRegisterPopupVisible && (
//         <div className="popup-container" id="register-popup">
//           <div className="register popup">
//             <form method="POST" action="login_register.php">
//               <h2>
//                 <span>USER REGISTER</span>
//                 <button type="reset" onClick={toggleRegisterPopup}>X</button>
//               </h2>
//               <input type="text" placeholder="Full Name" name="fullname" />
//               <input type="text" placeholder="Username" name="username" />
//               <input type="email" placeholder="E-mail" name="email" />
//               <input type="password" placeholder="Password" name="password" />
//               <button type="submit" className="register-btn" name="register">REGISTER</button>
//             </form>
//           </div>
//         </div>
//       )}
//       </header>
   
   
//  <h1 style={{color:"white"}}>Get the<span style={{color:"#14BC9A"}}> Right Job</span> You Deserve</h1>
//       <Carousel images={images} />
 
//       <div style={backgroundImageStyle}className='imm'>
//       <h1  style={{color:"white"}}>Popular<span style={{color:"#14BC9A"}}>Industry </span>  Domain</h1>
     
  
//         </div>;
//         <h1 className='sa' style={{color:"#14BC9A"}}>Featured<span style={{color:"black"}}>Gigs </span> for you</h1>
//       <div
//       className="main_div"
//       style={{
//         width: "120vw",
//         height: "40vh",
//         display: "grid",
//         placeItems: "center",
//         backgroundColor: "hsl(206, 21%, 94%)",
//       }}
//     >
//       <div
//         className="center_div"
//         style={{
//           width: "100%",
//           display: "flex",
//           overflowY: "hidden",
//           overflowX: "scroll",
//         }}
//       >
//         {jsondata.map((val) => (
//           <img
//             key={val.id}
//             src={`https://picsum.photos/200/350?random=${val.id}`}
//             alt={`Image ${val.id}`}
//             style={{
//               borderRadius: "30px",
//               transition: "transform 0.3s ease-in",
//               padding: "20px",
//             }}
//             onMouseOver={(e) => {
//               e.target.style.transform = "scale(1.1)";
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = "scale(1)";
//             }}
//           />
//         ))}
//       </div>
//     </div>
//     <h1  style={{color:"#14BC9A"}}>Featured<span style={{color:"black"}}>Jobs </span>  for you</h1>
//     <div
//       className="main_div"
//       style={{
//         width: "100vw",
//         height: "40vh",
//         display: "grid",
//         placeItems: "center",
//         backgroundColor: "hsl(206, 21%, 94%)",
//       }}
//     >
//       <div
//         className="center_div"
//         style={{
//           width: "100%",
//           display: "flex",
//           overflowY: "hidden",
//           overflowX: "scroll",
//         }}
//       >
//         {jsondata.map((val) => (
//           <img
//             key={val.id}
//             src={`https://picsum.photos/200/350?random=${val.id}`}
//             alt={`Image ${val.id}`}
//             style={{
//               borderRadius: "30px",
//               transition: "transform 0.3s ease-in",
//               padding: "20px",
//             }}
//             onMouseOver={(e) => {
//               e.target.style.transform = "scale(1.1)";
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = "scale(1)";
//             }}
//           />
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// }

// export default App;
