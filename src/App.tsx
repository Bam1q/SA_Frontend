
import './App.css';
import Locks from './pages/locks.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
    
     
      <BrowserRouter>
        
        <Routes>
          <Route path="/locks" element={<Locks/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;