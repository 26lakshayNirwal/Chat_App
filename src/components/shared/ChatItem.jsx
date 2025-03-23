
import React from 'react'
import { Link } from '../styles/styledComponent'
import { Avatar, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { memo } from 'react'
import AvatarCard from './AvatarCard'

const ChatItem = ({
    avatar,
    name,
    _id,
    groupChat=false,
    sameSender,
    isOnline,
    newMessageAlert,
    index=0,
    handleDeleteChat,

}) => {
  return (
    <Link
    sx={{
        padding:"0",
    }}
     to={`/chat/${_id}`}
    onContextMenu={(e)=>handleDeleteChat(e, _id, groupChat)}
    >
        <div style={{
            display:"flex",
            gap:"1rem",
            alignItems:"center",
            padding:"1rem",
            backgroundColor: sameSender ? "black" : "unset",
            color: sameSender ? "white" : "unset",
            position: "relative",
        }}>
            <AvatarCard avatar={avatar}/>
            <Stack>
                <Typography>
                    {name}
                </Typography>
                {newMessageAlert && (
                    <Typography>
                        {newMessageAlert.count} New Message
                    </Typography>
                )}
            </Stack>
            {isOnline && 
                <Box 
                sx={{
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "50%",
                    backgroundColor: "green",
                    position: "absolute",
                    right: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                }} />
            }
       </div>
    </Link>
  )
  
}

export default memo(ChatItem)
