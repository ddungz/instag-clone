import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const doSignup = () => {
        fetch("http://localhost:5000/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, password, email
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(!data.success) {
                M.toast({html: data.message, classes: "#c62828 red darken-3"})
            } else {
                M.toast({html: data.message, classes: "#43a047 green darken-1"})
                history.push('/signin')
            }
        })
    }

    return (
        <div className="login">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => doSignup()}>
                    Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup