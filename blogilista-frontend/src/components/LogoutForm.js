import React from 'react'

const LogoutForm = ({ name, logoutHandler }) => (
    <div>
        <form onSubmit={logoutHandler}>
            {name} logged in <button type='submit'>Log out</button>
        </form>
    </div>
)

export default LogoutForm