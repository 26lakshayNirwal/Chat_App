import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useGetNotificationsQuery } from '../../redux/api/api';
import { useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNotification } from '../../redux/reducers/misc';
const Notifications = () => {

  const dispatch=useDispatch();
  
  const {isNotification}= useSelector((state)=>state.misc);

  const {isLoading,data,error, isError } = useGetNotificationsQuery();
 
  console.log(data)
   
  const friendRequestHandler=({_id,accept})=>{
       
  }

  const closeHandler=()=> dispatch(setIsNotification(false));
  

  useErrors([{error,isError}]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs:"1rem",sm:"2rem" }} maxWidth={"25rem"}>
        <DialogTitle>
          Notifications
        </DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests.length > 0 ? (
              data?.allRequests?.map(({sender,_id}) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}

        
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
