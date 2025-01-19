import * as React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './user/Login.tsx';
import Editor from './editor/Editor.tsx';
import CreateAccount from './user/CreateAccount.tsx';
import HomePage from './HomePage.tsx';

const App = React.memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
});

export default App;
