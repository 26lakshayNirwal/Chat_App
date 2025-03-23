import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { sampleNotifications } from '../../constants/sampledata';

const Notifications = () => {

  const friendRequestHandler=({_id,accept})=>{

  }

  return (
    <Dialog open>
      <Stack p={{ xs:"1rem",sm:"2rem" }} maxWidth={"25rem"}>
        <DialogTitle>
          Notifications
        </DialogTitle>

        {sampleNotifications.length>0 ?(
          sampleNotifications.map((i)=> <NotificationItem sender={i.sender}  _id={i._id} handle={friendRequestHandler} key={i._id}/>)
        ):(
          <Typography textAlign={"center"}>
            0 Notifications
          </Typography>
        )


        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({sender,_id,handle})=>{
  const {name,avatar}=sender;
  return (
    <ListItem>
        <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        >
            <Avatar src={avatar}/>
            <Typography
            variant='body1'
            sx={{
                flexGrow:1,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                width:"100%",
            }}
            >
                {`${name} sent you a friend request.`}
            </Typography>
            <Stack
            direction={{
              sx:"column",
              sm:"row",
            }}
            >
              <Button onClick={()=>handle({_id,accept:true})}>Accept</Button>
              <Button  color="error" onClick={()=>handle({_id,accept:false})}>Reject</Button>
            </Stack>
        </Stack>
    </ListItem>
  )
})

export default Notifications
