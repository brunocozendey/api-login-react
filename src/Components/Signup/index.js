import {useState, useCallback} from 'react';
import Form from 'react-bootstrap/Form'
import {loginUrl} from '../../Api'
import { useHistory } from "react-router-dom";

function Signup(){
    const[ username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    let history = useHistory();
    
    const handleSubmit = useCallback((event)=>{
        (event).preventDefault();
        const params = { username: username, email: email, password: password };
        loginUrl.post(`/signup`, params)
        .then((res) => {
            if (res.status === 200){
                alert(res.data.message);
                history.push("/login");
            }
        })
        .catch(err => {
            alert(err.response.data.message);
          });
    }, [username, password, email])

    return(
        <div>
            <h2> Sign Up</h2>        
            <Form className="form-group" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"> 
                        Username: 
                        <input className="form-control" type="text" name="username" onChange={e => setUsername(e.target.value)}/>
                    </label>
                </div>
                <div>
                    <label htmlFor="email"> 
                        E-mail: 
                        <input className="form-control" type="email" name = "email" onChange={e => setEmail(e.target.value)}/> 
                    </label>
                </div>
                <div> 
                    <label htmlFor="password"> 
                        Password: 
                        <input className="form-control" type="password" name = "password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                </div>
                    <button type="submit" className="btn btn-primary">
                        Sign up
                    </button>
            </Form>
        </div>
    );
}

export default Signup;