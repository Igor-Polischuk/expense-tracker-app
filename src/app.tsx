import { Routes, Route } from 'react-router-dom';
import { LoginPage, Main, RegisterPage, CreateAccauntPage, Dashboard } from './pages';
import { RequireAuth } from './hoc/RequireAuth';
import AuthLoyaut from './Loyauts/authLoyaut';
import PageLoyaut from './Loyauts/PageLoyaut';
import { AddTransactionModal, AddPaymentsModal } from './components/Modal';
import { HaveAccaunt } from './hoc/HaveAccaunt';

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
              <HaveAccaunt>
                <Dashboard />
              </HaveAccaunt>
            </RequireAuth>
          } />
          <Route path='/transactions' element={
            <RequireAuth>
              <HaveAccaunt>
                <h1>Transactions</h1>
              </HaveAccaunt>
            </RequireAuth>
          } />
          <Route path='/planning' element={
            <RequireAuth>
              <HaveAccaunt>
                <h1>planning</h1>
              </HaveAccaunt>
            </RequireAuth>
          } />
          <Route path='/statistics' element={
            <RequireAuth>
              <HaveAccaunt>
                <h1>I love you</h1>
              </HaveAccaunt>
            </RequireAuth>
          } />
          <Route path='/settings' element={
            <RequireAuth>
              <HaveAccaunt>
                <h1>settings</h1>
              </HaveAccaunt>
            </RequireAuth>
          } />
        </Route>
      </Routes>
      <AddTransactionModal />
      <AddPaymentsModal />
    </div>

  );
}

export default App;
