import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Events from '@/pages/Events'
import CreateEvent from '@/pages/CreateEvent'
import Communities from '@/pages/Communities'
import CommunityRegister from '@/pages/CommunityRegister'

import Navbar from '@/shared/components/Navbar'
import Footer from '@/shared/components/Footer'
import CommunityProfile from './pages/CommunityProfile'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/eventos'
          element={<Events />}
        />
        <Route
          path='/comunidades'
          element={<Communities />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/cadastro-comunidade'
          element={<CommunityRegister />}
        />
        <Route
          path='/criacao-de-eventos'
          element={<CreateEvent />}
        />
        <Route
          path='/perfil-comunidade/:communitySlug'
          element={<CommunityProfile />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
