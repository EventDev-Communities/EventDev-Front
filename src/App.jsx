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
import PageNotFound from './pages/PageNotFound'
import CommunityEdit from './pages/CommunityEdit'
import EditEvent from './pages/EditEvent'

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
          path='/meu-perfil/:communitySlug'
          element={<CommunityProfile isOwner={true} />}
        />
        <Route
          path='comunidade/editar-perfil/:communityId'
          element={<CommunityEdit />}
        />
        <Route
          path='/criacao-de-eventos/:comunidadeId'
          element={<CreateEvent />}
        />
        <Route
          path='/editar-evento/:eventoId'
          element={<EditEvent />}
        />
        <Route
          path='/perfil-comunidade/:communitySlug'
          element={<CommunityProfile />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
