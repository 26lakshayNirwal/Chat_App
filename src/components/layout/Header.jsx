import { AppBar, Box, Typography ,Toolbar, IconButton, Tooltip, Backdrop} from '@mui/material'
import React, { Suspense, use } from 'react'
import App from '../../App'
import { Orange } from '../../constants/color'
import {Notifications as NotificationsIcon, Logout as LogoutIcon, Group as GroupIcon, Add as AddIcon ,Menu as MenuIcon, Search as SearchIcon} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { lazy } from 'react'
 
const SearchDialog = lazy(() => import('../specific/Search'))
const NotificationsDialog = lazy(() => import('../specific/Notifications'))  
const NewGroupDialog = lazy(() => import('../specific/newgroup'))

const Header = () => {

    const navigate= useNavigate();
    const [isMobile, setIsMobile] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [isNewGroup, setIsNewGroup] = useState(false)
    const [isNotification, setIsNotification] = useState(false)

    const handleMobile = () => {
        setIsMobile((prev) => !prev)
     }
    
     const HandleSearch = () => {
        setIsSearch((prev) => !prev)
     }
    
     const OpenNewGroup = () => {
        setIsNewGroup((prev) => !prev)
     }
    
     const NavigateToGroup = () => {
        navigate("/group")
     }

     const LogoutHandler = () => {
        navigate("/login")
     }

     const NotificationHandler = () => {
        setIsNotification((prev) =>!prev)
     }
     


  return (
    <>

    <Box sx={{flexGrow:1}} height={"4rem"}>
        <AppBar position="static" sx={{
            bgcolor:Orange,
        }}>


         <Toolbar>
            <Typography 
            variant="h6"
            sx={{
                display: {xs: 'none', sm: 'block'},
            }}
            >
                Chat App 
            </Typography>
            <Box 
             sx={{
                display: {xs: 'block', sm: 'none'},
             }}>
                <IconButton color="inherit" onClick={handleMobile}> 
                    <MenuIcon />
                </IconButton>
            </Box>
           <Box sx={{flexGrow:1,}}/>
           <Box>
           <Tooltip title="Search">
           <IconButton color="inherit" size="large" onClick={HandleSearch}> 
                    <SearchIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="New Group">
            <IconButton color='inherit' size='large' onClick={OpenNewGroup}>
                <AddIcon />
                </IconButton>
            </Tooltip>   

            <Tooltip title="Manage Groups">
            <IconButton color='inherit' size='large' onClick={NavigateToGroup}>
                <GroupIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
            <IconButton color='inherit' size='large' onClick={NotificationHandler}>
                <NotificationsIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Logout">
            <IconButton color='inherit' size='large' onClick={LogoutHandler}>
                <LogoutIcon />
                </IconButton>
            </Tooltip>

           </Box>
         </Toolbar>
        </AppBar>
    </Box>

    {isSearch && 
    <Suspense fallback={<Backdrop open={true} />}>
        <SearchDialog />
    </Suspense>
    }

    {isNewGroup &&
    <Suspense fallback={<Backdrop open={true} />}>
        <NewGroupDialog />
    </Suspense>
    }

    {isNotification &&
    <Suspense fallback={<Backdrop open={true} />}>
        <NotificationsDialog />
    </Suspense>
    }


    </>
  )
}

export default Header
