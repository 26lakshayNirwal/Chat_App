
import React, { use } from 'react'
import Header from './Header'
import Title from '../shared/Title.jsx'
import { Grid } from '@mui/material'
import ChatList from '../specific/ChatList.jsx'
import { samplechats } from '../../constants/sampledata.js'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile.jsx'

const handleDeleteChat = (e, _id, groupChat) => {
    e.preventDefault();
    console.log(`Delete chat  ${_id} ${groupChat}`);
}
 
const AppLayout = () =>(WrappedComponent)=> {
return (props) => {
    const params= useParams();
    const chatId= params.chatId;
    return (
        <>
            <Title />
            <Header />
            <Grid container height={"calc(100vh - 4rem)"}>
                <Grid
                    item
                    sm={4}
                    md={3}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                    }}
                    height={"100%"}
                >
                    <ChatList chats={samplechats} chatId={chatId} handleDeleteChat={handleDeleteChat}
                     />
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} bgcolor={"#f9f9f9"}>
                    <WrappedComponent {...props} />
                </Grid>
                <Grid item md={4} lg={3} height={"100%"}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    padding: "2rem",
                    bgcolor: "rgba(0,0,0,0.9)",
                }}>
                    <Profile />
                    </Grid>
            </Grid>
        </>
    );
};
}

export default AppLayout
