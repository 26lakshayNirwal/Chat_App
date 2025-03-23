import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useRef } from 'react'
import { IconButton, Stack } from '@mui/material'
import { Send as SendIcon, AttachFile as AttachFileIcon} from '@mui/icons-material'
import { grayColor, Orange } from '../constants/color'
import { InputBox } from '../components/styles/styledComponent'
import FileMenu from '../components/dialogs/FileMenu'
import MessageComponent from '../components/shared/MessageComponent'
import { sampleMessage } from '../constants/sampledata'
 const user={
  _id:"abc",
  name: "xyz"
 }

const Chat = () => {
  const conatainerRef = useRef(null)

  
  return (
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
        sampleMessage.map((i)=>(
          <MessageComponent  key={i._id} message={i} user={user}/>
        ))
      }
    </Stack>
    <form
       style={{
        height:"10%",

       }}
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

           
        >
          <AttachFileIcon/>
        </IconButton>
        
        <InputBox placeholder='Type Here....'/>

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
     <FileMenu />
    </>
  )
}

export default AppLayout()(Chat)
