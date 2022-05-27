import NavigationBar from './components/navigation/NavigationBar';
import { Routes, Route } from "react-router-dom";
import Home from './views/home/Home';

import './App.css';
import { Container } from '@mui/material';
import Profile from './views/user/Profile';
import AuthPanel from './components/auth/AuthPanel';
import MemoryFormModal from './components/memories/NewMemory/MemoryFormModal';
import { useState } from 'react';
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [newMemoryFormOpened, setNewMemoryFormOpened] = useState(false);

  const addMemory = (memory) => {
    dispatch({ type: 'ADD_MEMORY', memory });
    setNewMemoryFormOpened(false);
  }

  return (
    <div className="App">
      <NavigationBar onClickCreate={() => setNewMemoryFormOpened(true)}></NavigationBar>


      <MemoryFormModal
        open={newMemoryFormOpened}
        onClose={() => setNewMemoryFormOpened(false)}
        addMemory={(memory) => addMemory(memory)}
      />

      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<AuthPanel />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
