import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectRoute from './components/styles/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/group"));
const NotFound = lazy(() => import("./pages/NotFound"));

let user=true;

const App = () => {
  return (
    <BrowserRouter>
    <Suspense fallback={<LayoutLoader/>}>
      <Routes>
        <Route element={<ProtectRoute user={user}/>}>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/group" element={<Group />} />
        </Route>
        
        <Route path="/login" element={
          <ProtectRoute user={!user} redirect="/">
            <Login/>
          </ProtectRoute>
        } 
        />

<Route path="*" element={<NotFound />} />
        
      </Routes>
      </Suspense>
      
    </BrowserRouter>
  )
}

export default App
