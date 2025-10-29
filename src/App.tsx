import './App.css'
import { Header } from './components/header'
import { Cards } from './components/cards'
import { Footer } from './components/footer'

export function App() {


  return (
      <>
      <Header/>
      <main className='container'>
      <Cards/>
      <Footer/>
      </main>
      </>
  )
}

export default App
