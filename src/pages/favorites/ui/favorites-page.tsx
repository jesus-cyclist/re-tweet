import React from 'react'
import { NavLink } from 'react-router-dom'

const FavoritesPage = () => {
    return (
        <div>
            <NavLink to={'/history'}>history</NavLink>
        </div>
    )
}

export default FavoritesPage
