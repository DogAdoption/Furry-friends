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

function App() {
  return (
    <>
      <BrowserRouter>
          <PreviousUrlProvider>
            <AuthProvider>
              <DogsDataProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/details' element={<Details />} />
                    <Route path='/contactform' element={<ContactForm />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/donate' element={<DonateForm />} />
                </Routes>
              </DogsDataProvider>
            </AuthProvider>
          </PreviousUrlProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
