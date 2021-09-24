import React from 'react'
import Illustration from './Illustration'

import signupImage from '../assets/images/signup.jpg'
import SignupForm from './SignupForm'


export default function Signup() {
    return (
        <>
            <h1>Create an account</h1>
            <div className="column">
                <Illustration src={signupImage} />
                <SignupForm />
            </div>
        </>
    )
}
