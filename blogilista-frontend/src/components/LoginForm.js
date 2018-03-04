import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password, loginVisible }) => (
    <div>
        <h2>Login</h2>
        <form id='loginForm' onSubmit={handleSubmit}>
            <div>
                username
            <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={handleChange}
                />
            </div>
            <div>
                password
            <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <button type='submit'>Log in</button>
        </form>
    </div>
)

export default LoginForm