import React,{ useState } from 'react'

export const Table = ({handleClick, customers}) => {
    const [search,setSearch] = useState('')
    const [display,setDisplay] = useState(customers)
    const handleChange = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value,customers[1].name.slice(0,e.target.value.length))
        if(e.target.value.length!=0)setDisplay(
            customers.filter(x=>x.name.slice(0,e.target.value.length).toLowerCase()===e.target.value.toLowerCase())
        )
        else setDisplay(customers)
    }
    
    return (
        <div>
            <div className='searchdiv'>
                <h3 className ='searchLabel'>Listing Customers</h3>
                <input  className='search' placeholder='Search..' type='text' value={search} onChange={handleChange} />
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>Mobile</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {display.map((x,i)=>{
                            return(<tr border='1px'>
                                <td>{i}</td>
                                <td>{x.name}</td>
                                <td>{x.phone}</td>
                                <td style={{textAlign:'auto'}}><a onClick={()=>handleClick(x.name)} href='#'>details</a></td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
