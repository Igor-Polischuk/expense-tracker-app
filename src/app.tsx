import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage, Main, RegisterPage, CreateAccauntPage } from './pages';
import { RequireAuth } from './hoc/RequireAuth';
import AuthLoyaut from './Loyauts/authLoyaut';
import PageLoyaut from './Loyauts/PageLoyaut';

// import 'chart.js/auto';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<AuthLoyaut />}>
          <Route index path='/' element={<Main />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        <Route path='/create-accaunt' element={
          <RequireAuth>
            <CreateAccauntPage />
          </RequireAuth>
        } />
        <Route path='/' element={<PageLoyaut />}>
        <Route index path='/' element={<Main />} />
          <Route path='/dashboard' element={
            <RequireAuth>
              <h1>Dashboard</h1>
            </RequireAuth>
          } />
          <Route path='/transactions' element={
            <RequireAuth>
              <h1>Transactions</h1>
            </RequireAuth>
          } />
          <Route path='/planning' element={
            <RequireAuth>
              <h1>planning</h1>
            </RequireAuth>
          } />
          <Route path='/statistics' element={
            <RequireAuth>
              <h1>I love you</h1>
            </RequireAuth>
          } />
          <Route path='/settings' element={
            <RequireAuth>
              <h1>settings</h1>
            </RequireAuth>
          } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
