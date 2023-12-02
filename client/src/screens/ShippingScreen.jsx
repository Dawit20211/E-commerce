import React from 'react'
import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from '../slices/cartSlice'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'


const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart)
    const { ShippingAddress } = cart

    const [address, setAddress] = useState(ShippingAddress?.address || '');
    const [city, setCity] = useState(ShippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(ShippingAddress?.postalCode || '');
    const [country, setCountry] = useState(ShippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigat = useNavigate();
  
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode,
        country}));
        navigat('/payment')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='my-2'>
                <Form.Label>Adress</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter Adress'
                value={address}
                onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='my-2'>
                <Form.Label>City</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter City'
                value={city}
                onChange={(e) => setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='Postal Code' className='my-2'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter Postal Code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country' className='my-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-2 bg-black'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen