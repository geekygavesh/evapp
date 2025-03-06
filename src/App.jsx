
import './App.css'
import { doc, getDoc } from 'firebase/firestore' 
import { db } from './firebase-config'
import { useEffect } from 'react'
function App() {

  const docref = doc(db,"users","nyozufsJCLcYnHFHBhBe")

  const getdata = async()=>{
    const docsnap = await getDoc(docref)
    console.log(docsnap.data());
    
  }
  useEffect(()=>{
    getdata()
  },[])
  return (
    <>
      <h1 className="text-red-500">HELLO </h1>
    </>
  )
}

export default App
