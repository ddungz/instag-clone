import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signin = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const doSingin = () => {
        let msg = invalidate({email, password})
        if(msg) {
            M.toast({html: msg, classes: "#c62828 red darken-3"})
            return
        }

        fetch("http://localhost:5000/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        }).then(res => res.json())
        .then(data => {
            if(!data.success) M.toast({html: data.message, classes: "#c62828 red darken-3"})
            else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                M.toast({html: "Signed in success", classes: "#43a047 green darken-1"})
                history.push("/")
            }
        })
        .catch(err => {console.log(err)})
    }

    const invalidate = ({email = '', password = ''}) => {
        if(!email || !password) return 'Please enter both email and password';
        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            return 'Invalid email';
        return false;
    }

    return (
        <div className="login">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
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
                    onClick={()=>doSingin()}
                >
                    Login
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin
