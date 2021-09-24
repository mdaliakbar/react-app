import React from 'react'
import Illustration from './Illustration'
import loginImage from '../assets/images/login.jpg'
import LoginForm from './LoginForm'


export default function Login() {
    return (
        <>
            <h1>Login to your account</h1>
            <div className="column">
                <Illustration src={loginImage} />
                <LoginForm />
            </div>
        </>
    )
}
