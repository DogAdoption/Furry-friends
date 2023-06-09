import './App.css';
import ContactForm from './components/ContactForm';
import Details from './components/Details';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import SearchPage from './components/SearchPage';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PreviousUrlProvider } from './contexts/PreviousUrlProvider';
import DonateForm from './components/DonateForm';
import DogsDataProvider from './contexts/DogsDataProvider';
import UsersDataProvider from './contexts/UsersDataProvider';
import PetEdit from './components/PetEdit';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div style={{overflowY: 'auto'}} className='mainContainer'>
        <BrowserRouter>
            <PreviousUrlProvider>
              <AuthProvider>
                <UsersDataProvider>
                  <DogsDataProvider>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/search' element={<SearchPage />} />
                        <Route path='/details' element={<Details />} />
                        <Route path='/contactform' element={<ContactForm />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/donate' element={<DonateForm />} />
                        <Route path='/edit' element={<PetEdit />} />
                    </Routes>
                  </DogsDataProvider>
                </UsersDataProvider>
              </AuthProvider>
            </PreviousUrlProvider>
        </BrowserRouter>
      </div>
      <ToastContainer position='top-left' />
    </>
  );
}

export default App;
