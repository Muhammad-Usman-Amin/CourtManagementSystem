import React from 'react'
import { useLocation } from 'react-router-dom'


export default function () {
    let location = useLocation();

    return (
        <>
            <div>Error 404! This page is not available on this Site!</div>
            <div>Double Check you Spellings for <code>{location.pathname}</code></div>
        </>
    )
}
