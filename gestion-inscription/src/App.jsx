import React from 'react';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import InscriptionPage from './pages/InscriptionPage';
import AdminLogin from './pages/AdminLogin';
import DashboardAdminPage from './pages/DashboardAdminPage ';
import ListCandidatsPage from './pages/ListCandidatsPage ';
import ListConcoursPage from './pages/ListConcoursPage';
import ListInscriptionsPage from './pages/ListInscriptionsPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/inscription' element={<InscriptionPage />}/>
          <Route path='/login' element={<AdminLogin />}/>

          {/* Partie Admin */}
          <Route path='/admin/dashboard' element={<DashboardAdminPage />}/>
          <Route path='/admin/candidats' element={<ListCandidatsPage />}/>
          <Route path='/admin/concours' element={<ListConcoursPage />}/>
          <Route path='/admin/inscriptions' element={<ListInscriptionsPage />}/>

          {/* Page not found  */}
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
