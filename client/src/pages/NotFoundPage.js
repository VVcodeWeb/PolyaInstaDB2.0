import React from 'react'
import {Link} from "react-router-dom"

function NotFoundPage() {
    return (
        <div>
            <h1>Page is not found</h1>
            <Link to="/">
                <button>Back to main page</button>
            </Link>
        </div>
    )
}

export default NotFoundPage
