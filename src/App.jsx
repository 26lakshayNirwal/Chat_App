import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectRoute from './components/styles/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';




const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/login"));
const Chat = lazy(() => import("./pages/Chat"));
const Group = lazy(() => import("./pages/group"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(()=> import('./pages/Admin/AdminLogin'));
const Dashboard = lazy(()=> import('./pages/Admin/Dashboard'));
const UserManagement = lazy(()=> import('./pages/Admin/UserManagement'));
const ChatManagement = lazy(()=> import('./pages/Admin/ChatManagement'));
const MessageManagement = lazy(()=> import('./pages/Admin/MessageManagement'));

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
        
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/users-management' element={<UserManagement/>}/>
        <Route path='/admin/chats-management' element={<ChatManagement/>}/>
        <Route path='/admin/messages-management' element={<MessageManagement/>}/>

        <Route path="*" element={<NotFound />} />
        
      </Routes>
      </Suspense>
      
    </BrowserRouter>
  )
}

export default App
