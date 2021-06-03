
import {Fragment} from 'react'
import './App.css';
import Header from './components/layout/Header'
import Banner from './components/Banner'
import Info from './components/Info'


function App() {
  return (
      <div className="page-wrapper">
        <Header/>
        <Banner />
        <Info />
      </div>
  )
}

export default App;
