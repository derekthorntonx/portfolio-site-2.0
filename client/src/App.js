import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import Projects from './views/Projects';
import Admin from './views/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/projects' element={<Projects/>}></Route>
          <Route path='/admin-landing' element={<Admin/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
