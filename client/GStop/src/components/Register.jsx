import { useState,useEffect} from "react";
function Register() {
   
   
 // States for registration
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 // States for checking the errors
 const [submitted, setSubmitted] = useState(false);
 
 // Handling the name change
 const handleName = (e) => {
     setName(e.target.value);
     setSubmitted(false);
 };

 // Handling the email change
 const handleEmail = (e) => {
     setEmail(e.target.value);
     setSubmitted(false);
 };

 // Handling the password change
 const handlePassword = (e) => {
     setPassword(e.target.value);
     setSubmitted(false);
 };

 // Handling the form submission
 const handleSubmit = (e) => {
     e.preventDefault();
     if (name === '' || email === '' || password === '') {
         setError(true);
     } else {
         setSubmitted(true);
         setError(false);
     }
 };

 // Showing success message
 const successMessage = () => {
     return (
         <div
             className="success"
             style={{
                 display: submitted ? '' : 'none',
             }}>
             <h1>User {name} successfully registered!!</h1>
         </div>
     );
 };
 async function createAccount() {
    console.log(name);
    console.log(email);
    console.log(password);
   
    try {
    
    const response = await fetch(`https://127.0.0.1:7293/api/accounts/Registration`, {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'},
        body:JSON.stringify({
            email: email,
            userName: name,
            password: password, 
            confirmPassword:password, 
        }),

      } 
   
      );
     
  
    }
 
catch {

}
return response.status;
}
 async function loginAccount() {
    debugger;
    const status = createAccount();
      if(status === 201) {
        const responselogin = await fetch(`https://127.0.0.1:7293/api/accounts/Login`, {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'},
        body:JSON.stringify({
            email: email,
            password: password, 
        }),
      } );
      console.log('register response')
      console.log(responselogin.status);
      if(responselogin.status === 201) {
        console.log("user login")
      }
      }
      
     
      const responseData = await response.json();
      console.log(responseData);
  

      }
 
 return (
     <div className="form">
         <div>
             <h1>User Registration</h1>
         </div>

         {/* Calling to the methods */}
         <div className="messages">
        
             {successMessage()}
         </div>

         <form>
             {/* Labels and inputs for form data */}
             <label className="label">Username</label>
             <input onChange={handleName} className="input"
                 value={name} type="text" />
            
             <label className="label">Email</label>
             <input onChange={handleEmail} className="input"
                 value={email} type="email" />  
             
             <label className="label">Password</label>
             <input onChange={handlePassword} className="input"
                 value={password} type="password" />

         <button onClick={loginAccount}>Create</button>
           
 
         </form>
     </div>
 );
}
export default Register
 