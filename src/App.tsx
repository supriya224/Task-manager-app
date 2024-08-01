import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CONSTANT from './utils/constants/index';
import Header from './components/shared/header/Header';
import HomePage from './pages/Home.page';

function App() {
  console.log('[Env]', CONSTANT.API_URL);

  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* home page imported here */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
