import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../index';
import {observer, useAsObservableSource} from 'mobx-react-lite';
import Alert from 'react-bootstrap/Alert'

import {Link} from 'react-router-dom';

import LoginForm from './LoginForm';


function RegistrationForm() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {store} = useContext(Context);
    const [alert, setAlert] = useState((<></>))
    const linkStyle = {color:'black', marginBottom:'10px', marginLeft:'20px'};

    const registration = async (e,mail,pass) =>{
        e.preventDefault();
        const response = await store.registration(mail, pass);
        if (response){
            setAlert(<Alert style={{marginTop:'20px'}} variant='success'>Verify your account with email</Alert>);
        }
    }
  return (
    <>

        <Container style={{background:'rgb(142, 195, 142)', padding:'30px', boxShadow:'1px 1px 1px black'}}>
            <h1>Registration</h1>
            <Form variant='success' bg=''>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value )} />
            </Form.Group>
            
            <Button variant="success" type="submit"  onClick={(e) => registration(e,email,password)}>
                Submit
            </Button>
                <Link style={linkStyle} to='/login'>Login</Link>
            </Form>
            {alert}
        </Container>

     
    </>
  );
}

export default observer(RegistrationForm);