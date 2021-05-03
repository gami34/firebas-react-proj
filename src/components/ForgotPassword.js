import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {

            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check Your indox for further instructions')
        } catch (error) {
            setError('failed to reset passowrd')
        }
        setLoading(false)


    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} type='submit' className='w-100'>Reset Password</Button>
                        <div className="w-100 text-center mt-2">
                            <Link to='/login'>Login?</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </>
    )
}