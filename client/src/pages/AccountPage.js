import React from 'react'

function Account({match}) {
    console.log(match)
    return (
        <div>
            <h1>Account</h1>
            <h2>{match.params.url}</h2>
        </div>
    )
}

export default Account
