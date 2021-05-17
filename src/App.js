import './App.css';
import React,{useEffect} from 'react'
import {Header} from './components/Header'
import {Stats} from './components/Stats'
import {Table} from './components/Table'
import {Insert} from './components/Insert'
import {Navigation} from './components/Navigation'
// import {Lading} from './components/Loading'
import customers from './customer-data.js'
import {OrderTable} from './components/OrderTable'
import {OrderDistribution} from './components/OrderDistribution'
import Modal from 'react-modal'
import axios from 'axios';


Modal.setAppElement(document.getElementById('root'));


function ChildApp() {
  
  
  let subtitle
  // const [customers,setCustomers] = React.useState([])
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [selectedName,setSelected] = React.useState('')
  const [customers,setCustomers] = React.useState([])
  const [page,setPage] = React.useState(0)
  useEffect(()=>{
    console.log('use eff')
    axios.get('/api/v1/customers').then((response)=>{
      setCustomers(response.data.data)
    })
  },[])
  // const fetch = aysnc () => {
  //   try {
  //     setCustomers()
  //   }
  // }
  const customStyles = {
    content : {
      top                   : '51%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
  }

  function closeModal(){
    setIsOpen(false);
  }
  const handleModalClick = (name) => {
    setSelected(name)
    setIsOpen(true)
  }
  return (
      <div className='container'>
        <Navigation setPage={setPage}/>
        <Header />
        {/* <h1 onClick={()=>console.log(customers)}>asd</h1> */}
        {!customers.length && <h1 className='loader center'>Fetching yo data...</h1>}
        {/* {(customers && customers.length!=0) && <h1 onClick={()=>console.log(customers)}>test</h1>} */}
        {(customers.length!=0 && page==0) &&<Stats customers = {customers}/>}
        {(customers.length!=0 && page==0)  && <Table handleClick={handleModalClick} customers={customers} />}
        {(customers.length!=0 && page==0)  && <OrderDistribution customers={customers} />}
        {(customers.length!=0 && page==1)  && <Insert />}
      
        {selectedName!='' && <Modal 
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            {selectedName!='' && <h2 ref={_subtitle => (subtitle = _subtitle)}>
              {`${selectedName} - ${customers.filter(x=>x.name==selectedName)[0].Phone}`}
            </h2>}
            {selectedName!='' && <h2>
              {`Order Count - ${customers.filter(x=>x.name===selectedName).length} Total amount - ${customers.filter(x=>x.name===selectedName).map(x=>x.amount).reduce((x,y)=>x+y)}`}
            </h2>}
            <OrderTable orders={customers.filter(x=>x.name===selectedName)}/>
            <button onClick={closeModal}>close</button>
            
          </Modal>}
      </div>
  )
}

const App = () => {
  
      return (<ChildApp />)
    
}
export default App;
