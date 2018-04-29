import React from 'react'
import {Link} from 'react-router-dom'

export const UserNav = (props) => {
    return (
        <div>
            {
                props.categories.forEach(category => {
                    return (
                        <Link to={`/home/${category}`}>{category}</Link>
                    )
                })
            }
        </div>
    )
}