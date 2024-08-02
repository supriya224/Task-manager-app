import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/shared/header/Header';
import HomePage from './pages/Home.page';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
