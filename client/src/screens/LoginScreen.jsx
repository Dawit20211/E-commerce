import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Message'
import FormContainer from "../components/FormContainer";
import {toast} from 'react-toastify'
import { useLoginMutation } from "../slices/usersApiSlice";
import {setCredentials} from '../slices/authSlice'


const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const  [login, {isLoaading}] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get('redirect') || '/';

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }

    }, [userInfo, redirect, navigate]);
    
    const submitHandler = async (e) =>{ 
       e.preventDefault();

       try {
         const res = await login({email, password}).unwrap();
         dispatch(setCredentials({...res, }))
         navigate(redirect);
       } catch (err) {

        toast.error(err?.data?.message || err.error)
       }
}

return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="email" className="my-3">
                <Form.Label>Email Adress</Form.Label>
            <FormControl
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
                </FormControl>
            </FormGroup>

            <FormGroup controlId="password" className="my-3">
                <Form.Label>Enter Password</Form.Label>
            <FormControl
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>

                </FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-2"
            disabled={isLoaading}>
                Sign In
            </Button>

            {isLoaading && <Loader/> }
        </Form>

        <Row className="py-3">
            <Col>
             New User? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen