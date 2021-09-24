import React from 'react'
import Form from './Form'
import TextInput from './TextInput'
import Checkbox from './Checkbox'
import Button from './Button'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function SignupForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPasssword, setConfirmPassword] = useState("")
    const [agree, setAgree] = useState("true")

    const [error, setError] = useState()
    const [loading, setLoading] = useState()


    const { signup } = useAuth();
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()
        // do validation 
        if (password !== confirmPasssword) {
            return setError("Password don't match!")
        }

        try {
            setError("")
            setLoading(true)
            await signup(email, password, username)
            history.push("/")
            // console.log(history.push("/"));
        } catch (error) {
            setLoading(false)
            setError("Failed to create Account")
            console.log(error);
        }
    }

    return (
        <Form style={{ height: '500px' }} onSubmit={handleSubmit}>
            <TextInput type="text" required placeholder="Enter name" icon="person" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextInput type="email" required placeholder="Enter email" icon="alternate_email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextInput type="password" required placeholder="Enter password" icon="lock" value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextInput type="password" required placeholder="Confirm password" icon="lock_clock" value={confirmPasssword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Checkbox required text="I agree to the Terms &amp; Conditions" value={agree} onChange={(e) => setAgree(e.target.value)} />

            <Button type="submit" disabled={loading}>
                Submit now
            </Button>

            {error && <p className="error" > {error} </p>}

            <div className="info">Already have an account? <Link to="/login">Login</Link> instead.</div>


        </Form>
    )
}
