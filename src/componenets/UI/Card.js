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
                    props.leftHeader && <div>{props.leftHeader}</div>
                }
                {
                    props.rightHeader && props.rightHeader
                }
            </div>
            {props.children}
        </div>
    )

}