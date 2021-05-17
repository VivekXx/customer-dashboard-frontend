import React from 'react'

export const Navigation = ({setPage}) => {

    return (
        <div className='nav'>
            <h1 onClick={()=>setPage(0)}>Stats</h1>
            <h1 onClick={()=>setPage(1)}>Edit</h1>
        </div>
    )
}
