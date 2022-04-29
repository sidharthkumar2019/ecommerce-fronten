import React from 'react'

import './Card.css'

/**
* @author
* @function Card
**/

export const Card = (props) => {
    return (
        <div
            className='card'
            {...props}
        >
            <div className='cardHeader'>
                {
                    props.leftheader && <div>{props.leftheader}</div>
                }
                {
                    props.rightheader && props.rightheader
                }
            </div>
            {props.children}
        </div>
    )

}