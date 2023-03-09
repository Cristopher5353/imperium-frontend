import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { decodeToken } from '../custom/decodeToken';
import { Category } from '../views/Category';
import { CreateIncidence } from '../views/CreateIncidence';
import { DashBoard } from '../views/Dashboard';
import { Main } from '../views/Dashboard/components/Main';
import { IncidenceDetail } from '../views/IncidenceDetail';
import { IncidenceResponse } from '../views/IncidenceResponse';
import { IncidenceResponseShow } from '../views/IncidenceResponseShow';
import { Incidence } from '../views/Incidents';
import { Login } from '../views/Login';
import { NotFound } from '../views/NotFound';
import { Priotiry } from '../views/Priotirity';
import { Subcategory } from '../views/Subcategory';
import { ProtectedRoute } from './ProtectedRoute';

const RouterApp = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>}/>
          <Route path='login' element={<Login/>}/>
          <Route element={<ProtectedRoute isAuthenticated={decodeToken() && (decodeToken().role === 1 || decodeToken().role === 2)}/>}>
            <Route path='dashboard' element={<DashBoard/>}>
              <Route index element={<Main/>} />
              <Route path='incidencias' element={<Incidence/>}/>
              <Route path='incidencias/:id' element={<IncidenceDetail/>}/>
              <Route path='incidencias/:id/respuesta/mostrar' element={<IncidenceResponseShow/>}/>
            </Route>
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={!!decodeToken() && decodeToken().role === 1}/>}>
            <Route path='dashboard' element={<DashBoard/>}>
              <Route index element={<Main/>} />
              <Route path='prioridades' element={<Priotiry/>} />
              <Route path='categorías' element={<Category/>} />
              <Route path='subcategorías' element={<Subcategory/>} />
              <Route path='incidencias/registrar' element={<CreateIncidence/>} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={!!decodeToken() && decodeToken().role === 2}/>}>
            <Route path='dashboard' element={<DashBoard/>}>
              <Route index element={<Main/>} />
              <Route path='incidencias/:id/respuesta' element={<IncidenceResponse/>}/>
            </Route>
          </Route>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    );
};

export default RouterApp;