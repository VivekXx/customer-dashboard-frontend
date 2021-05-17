import React from 'react'

export const Stats = ({customers}) => {
    let counts = {}
    customers.forEach(x=>{
        if (x.name in counts)counts[x.name]+=1
        else counts[x.name]=1
    })
    return (
        
            <div className='stats'>
                <div className='box'>
                    <h1>
                        {customers.length}
                    </h1>
                    <h2>Orders</h2>
                </div>
                <div className='box'>
                    <h1>{customers.map(x=>x.amount).reduce((x,y)=>x+y)}</h1>
                    <h2>amount</h2>
                </div>
                <div className='box'>
                    <h1>
                        {Object.keys(counts).length}
                    </h1>
                    <h2>Customers</h2>
                </div>
            </div>
        
    )
}
