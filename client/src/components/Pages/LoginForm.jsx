import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../index';
import {observer} from 'mobx-react-lite';

function LoginForm() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {store} = useContext(Context);

    return (
      <Container style={{background:'rgb(142, 195, 142)', padding:'30px'}}>
      <h1>Login</h1>
      <Form variant='success' bg=''>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value )} />
      </Form.Group>
      
      <Button variant="success" type="submit"  onClick={() => store.login(email,password)}>
          Submit
      </Button>
      </Form>
  </Container>
  );
}

export default observer(LoginForm);