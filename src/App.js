import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Login } from './components';
import { Home } from './container'
import { GoogleOAuthProvider } from '@react-oauth/google'

import {fetchUser} from '../src/utils/fetchUser';

function App() {
  const user = fetchUser();
  console.log(user);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
