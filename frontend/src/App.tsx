import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { CustomerDetail } from './pages/CustomerDetail/CustomerDetail';
import { Layout } from './components/Layout/Layout';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/customers/:id" element={<CustomerDetail />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
