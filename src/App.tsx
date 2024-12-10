
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Mapa from './components/Mapa';
import FullCalendar from './components/FullCalendar';
import Grafics from './components/Grafics';



 const App: React.FC = () => {
  return (
    <div className='bg-gradient-to-b from-sky-950 via-sky-800 to-green-700 min-h-screen'>
        <Header />
        <Navbar />
        <main className='container mx-auto py-8 px-4 '>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/fullcalendar" element={<FullCalendar />} />
          <Route path="/grafics" element={<Grafics />} />
        </Routes>
        </main>
    </div>
  )
}

export default App
