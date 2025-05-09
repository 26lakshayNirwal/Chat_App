import React, { useCallback, useEffect, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useRef } from 'react'
import { IconButton, Skeleton, Stack } from '@mui/material'
import { Send as SendIcon, AttachFile as AttachFileIcon} from '@mui/icons-material'
import { grayColor, Orange } from '../constants/color'
import { InputBox } from '../components/styles/styledComponent'
import FileMenu from '../components/dialogs/FileMenu'
import MessageComponent from '../components/shared/MessageComponent'
import { sampleMessage } from '../constants/sampledata'
import { getSocket } from '../../socket'
import {NEW_MESSAGE_ALERT} from '../constants/events.js'
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api.js'
import { useErrors, useSocketEvents } from '../hooks/hook.jsx'
import { useInfiniteScrollTop } from '6pp'
import { useDispatch } from 'react-redux'
import { setIsFileMenu } from '../redux/reducers/misc.js'



const Chat = ({chatId,user}) => {

  const conatainerRef = useRef(null)
  const socket = getSocket();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

 const chatDetails= useChatDetailsQuery({chatId, skip: !chatId})

 //console.log("chatId used:", chatId);
 //console.log("Calling useGetMessagesQuery with chatId:", chatId, "and page:", page);


 const oldMessagesChunk = useGetMessagesQuery({chatId, page ,skip: !chatId});

  const {data: oldMessages , setData: setOldMessages}= useInfiniteScrollTop(
    conatainerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages,
  )

  const members = chatDetails?.data?.chat?.members;

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    if(!message.trim())return ;

    socket.emit(NEW_MESSAGE_ALERT,{chatId, members, message});
    setMessage("");
  };

  const newMessagesHandler = useCallback((data)=>{
    setMessages((prev)=>[...prev, data.message]);
  },[]);

  const eventHandlers = {
    [NEW_MESSAGE_ALERT]: newMessagesHandler,
  };
  
  useSocketEvents(socket, eventHandlers);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];
  
  return chatDetails.isLoading ? (
    <Skeleton/>
  ) : (
    <>
    <Stack
     ref={conatainerRef}
     boxSizing={"border-box"}
      padding={"1rem"}
      spacing={"1rem"}
      bgcolor={grayColor}
      height={"90%"}
      sx={{
        overflowX:"hidden",
        overflowY:"auto"

      }}
    >
      
      {
        allMessages.map((i)=>(
          <MessageComponent  key={i._id} message={i} user={user}/>
        ))
      }
    </Stack>
    <form
       style={{
        height:"10%",

       }}
       onSubmit={submitHandler}
    >
      <Stack direction={"row"}
              height="100%"
              padding={"1rem"}
              alignItems={"center"}
              position={"relative"}
              >
        <IconButton 
           sx={{
            position:"relative",
            rotate:"30deg",
           }}
           onClick={handleFileOpen}
        >
          <AttachFileIcon/>
        </IconButton>
        
        <InputBox 
        placeholder='Type Here....'
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        />

        <IconButton
          type='submit'
          sx={{
            bgcolor:Orange,
            color:"white",
            marginLeft:"1rem",
            padding:"0.5rem",
            "&:hover":{
              bgcolor:"error.dark",
            }


          }}
        >
          <SendIcon/>
        </IconButton>
      </Stack>

    </form>
     <FileMenu anchorEl={fileMenuAnchor} chatId={chatId}/>
    </>
  )
}

export default AppLayout()(Chat)
