import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Container, Row, Col, Form, FormGroup, FormControl, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Message'
import FormContainer from "../components/FormContainer";
import {toast} from 'react-toastify'
import { useRegisterMutation } from "../slices/usersApiSlice";
import {setCredentials} from '../slices/authSlice'


const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[confermPassword, setconfirmPassword] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const  [register, {isLoaading}] = useRegisterMutation();

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
        if(password !== confermPassword){
        toast.error('the password do not match')
        return;
        }else{
        try {
            const res = await register({name, email, password}).unwrap();
            dispatch(setCredentials({...res, }))
            navigate(redirect);
          } catch (err) {
   
           toast.error(err?.data?.message || err.error)
          }

    }
       
}

return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
        <FormGroup controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
            <FormControl
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}>
                </FormControl>
            </FormGroup>

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
                <Form.Label>Password</Form.Label>
            <FormControl
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>

                </FormControl>
            </FormGroup>

            <FormGroup controlId="confirmPassword" className="my-3">
                <Form.Label>Confirm Password</Form.Label>
            <FormControl
                type="password"
                placeholder="confirm password"
                value={confermPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}>

                </FormControl>
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-2"
            disabled={isLoaading}>
                Register
            </Button>

            {isLoaading && <Loader/> }
        </Form>

        <Row className="py-3">
            <Col>
            Already have an account?? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen;