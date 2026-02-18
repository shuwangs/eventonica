import { useState } from 'react'
import ManagerPage from './pages/ManagerPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ManagerPage />
    </>
  )
}

export default App
