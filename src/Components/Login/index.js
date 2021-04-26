import {useState, useCallback} from 'react';
import Form from 'react-bootstrap/Form'
import {loginUrl} from '../../Api'
import { useHistory } from "react-router-dom";
import { login } from "../../Services/auth";

function Login(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    let history = useHistory();
    
    const handleSubmit = useCallback((event)=>{
        (event).preventDefault();
        const params = { email: email, password: password };
        loginUrl.post(`/signin`, params)
        .then((res) => {
            if (res.status === 200){
                login(res.data.accessToken);
                history.push("/comics");
            }
        })
        .catch(err => {
            alert(err.response.data.message);
          });
    }, [password, email])

    return(
        <div>
            <h2> Login </h2>        
            <Form className="form-group" onSubmit={handleSubmit}>
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
                        Login
                    </button>
            </Form>
        </div>
    );
}

export default Login;