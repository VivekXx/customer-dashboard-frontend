import axios from 'axios'
import React,{ useState } from 'react'

export const Insert = ({customers,setCustomers}) => {
    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [amount,setAmount] = useState('')
    const [message,setMessage] = useState(false)
    const [sent,setSent] = useState(false)
    

    // const handleSubmit = () => {
    //     if (name && phone && amount){
    //         axios.post('/api/v1/customers',{name,phone,amount}).then(response=>{
    //             console.log(response)
    //             setCustomers([...customers,{name,phone,amount}])
    //         })
    //     }
    // }
    const check = (asd) => {
        if (parseInt(asd))return true
        else return false}
    const postOrder = async () => {
        try {   
            const response = await axios.post('https://customer-dashboard021.herokuapp.com/api/v1/customers',{name,phone,amount})
            console.log(response)
            // setCustomers(customers.concat(response.data.data))
        } catch(err) {
            console.log(err.stack)
            throw err
        }
    }
    return (
        <div>
            <h1>Make Order</h1>
            <form className="form" onSubmit = {(e)=>{
                e.preventDefault()
                if (!name || !phone || !amount){
                    setMessage(true)
                    return
                }
                setName('')
                setAmount('')
                setPhone('')
                setSent(true)
                postOrder()
                
            }}>
                <label>Name</label>
                <input type='text' placeholder='Enter text...' value={name} onChange={(e)=>setName(e.target.value)} />
                {(message && !name) && <p style={{color:'red'}}>Please enter name...</p>}
                <label>Phone Number</label>
                <input type='text' placeholder='Enter number...' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                {(message && (!phone || !check(phone))) && <p style={{color:'red'}}>Please enter phone number...</p>}
                <label>Amount</label>
                <input type='text' placeholder='Enter amount...' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                {(message && (!amount || !check(amount))) && <p style={{color:'red'}}>Please enter amount...</p>}
                <input disabled={!name || !phone || !amount} className='add' type='submit' value={'Add'}/>
                {message && <p style={{color:'red'}}>Please fill necessary fields...</p>}
                {sent && <p style={{color:'green'}}>Entry added successfully...</p>}
            </form>
        </div>
    )
}
