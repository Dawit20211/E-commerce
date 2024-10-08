import { useState, useEffect} from "react";
import { Form, Button, Col } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Checkoutteps from '../components/CheckoutSteps'
import { savePaymentMethod } from "../slices/cartSlice";

import React from 'react'

const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart= useSelector((state)=> state.cart);
    const { shippingAddress } = cart;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping');
        }
    }, [shippingAddress, navigate])

  return (
    <FormContainer>
        <Checkoutteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                 <Form.Check
                 type="radio"
                 className="my-2"
                 label='Paypal or Credit Card'
                 id="Paypal"
                 name='paymentMethod'
                 value='Paypal'
                 checked
                 onChange={(e) => setPaymentMethod(e.target.value)}>
                 </Form.Check>
                </Col>
            </Form.Group>

            <Button type="submit" variant="primary">
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen