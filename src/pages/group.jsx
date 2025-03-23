import React, { lazy, memo, Suspense, useEffect, useState } from 'react';
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Menu as MenuIcon, KeyboardBackspace as KeyboardBackspaceIcon, Edit as EditIcon, Done as DoneIcon, Add as AddIcon, Delete as DeleteIcon} from '@mui/icons-material';
import { useNavigate , useSearchParams } from 'react-router-dom';
import { Link } from '../components/styles/styledComponent';
import AvatarCard from '../components/shared/AvatarCard';
import { samplechats, sampleusers } from '../constants/sampledata';
import UserItem from '../components/shared/UserItem';

const ConfirmDeleteDialog =lazy(()=>import("../components/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog =lazy(()=>import("../components/dialogs/AddMemberDialog"));


const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isEdit,setIsEdit]=useState(false);
  const [groupName,setGroupName]=useState("");
  const [groupNameUpdated,setGroupNameUpdated]=useState("");
  const [confirmDeleteDialog,setConfirmDeleteDialog]=useState(false);
  const isAddMember=false;

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const updateGroupName =()=>{
     setIsEdit(false);
  }

  const handleMobileClose = () => setIsMobileOpen(false);

  const openConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(true);
  }

  const closeConfirmDeleteHandler=()=>{
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler=()=>{
    console.log("Add");
  }

  const deleteHandler=()=>{
    console.log("delete handler")
  }

  const removeMemberHandler=(id)=>{
    console.log("remove member",id)
  }

  useEffect(()=>{
   if(chatId){
    setGroupName(`Group Name ${chatId}`)
    setGroupNameUpdated(`Group Name ${chatId}`)
   }

    return()=>{
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
    }
  },[chatId]);

  const Iconbtn = (
    <>
      {/* Menu Icon */}
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Back Button */}
      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "black",
            color: "white",
            ":hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName=(
    <Stack 
          direction={"row"}
          alignItems={"center"} 
          justifyContent={"center"}
          spacing={"1rem"}
          padding={"3rem"}
          >
      {isEdit ? (
        <>
        <TextField
         value={groupNameUpdated}
         onChange={(e)=> setGroupNameUpdated(e.target.value)}
        />
        <IconButton onClick={updateGroupName}>
          <DoneIcon/>
        </IconButton>
        </>
      ):(
        <>
        <Typography variant='h4'>{groupName}</Typography>
        <IconButton onClick={()=>setIsEdit(true)}><EditIcon></EditIcon></IconButton>
        </>
      )}
    </Stack>
  )

  const ButtonGroup =(
    <Stack
     direction={{
      sm : "row",
      xs : "column-reverse",
     }}
     spacing={"1rem"}
     p={{
      sm:"1rem",
      xs:"0",
      md:"1rem 4rem",

     }}
    
    >
      <Button size='large' color='error' variant='outlined' startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member</Button>

    </Stack>
  )

  return (
    <Grid container height="100vh">
      {/* Sidebar (Visible on SM Screens and Above) */}
      <Grid
        item
        sx={{ display: { xs: "none", sm: "block" },
        
       }}
        sm={4}
        
      >
        <GroupList myGroups={samplechats} chatId={chatId} />
      </Grid>

      {/* Main Content */}
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {Iconbtn}

        { groupName && (
          <>
          {GroupName}

          <Typography
            margin ={"2rem"}
            alignSelf={"flex-start"}
            variant="body1"
            >
              Members
            </Typography>

            <Stack
             maxWidth={"45rem"}
             width={"100%"}
             boxSizing={"border-box"}
             padding={{
              sm: "1rem",
              xs: "0",
              md: "1rem 4rem"
             }}

             spacing={"2rem"}
             height={"50vh"}
             overflow={"auto"}
            >
              {sampleusers.map((i)=>(
              <UserItem user={i} key={i._id} isAdded styling={{
                boxShadow :"0 0 0.5rem rgba(0,0,0,0.2)",
                padding:"1rem 2rem",
                borderRadius : "1rem",
              }}
              handler={removeMemberHandler}
              />
            ))}

            </Stack>
            {ButtonGroup}
            </>
          )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open/>}>
          <AddMemberDialog/>
        </Suspense>
      )}
    
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open/>}>
          <ConfirmDeleteDialog
           open={confirmDeleteDialog}
           handleClose={closeConfirmDeleteHandler}
           deleteHandler={deleteHandler}
           />
        </Suspense>
      )}

      {/* Drawer for Small Screens */}
      <Drawer
        sx={{ display: { xs: "block", sm: "none" } }}
        open={isMobileOpen}
        onClose={handleMobileClose}
      >
        <GroupList w="50vw" myGroups={samplechats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}
         sx={{
          background: "linear-gradient(rgb(54 32 200 / 50%), rgb(179 11 11 / 50%))",
          height:"100vh"
         }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign="center" padding="1rem">
        No Group
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link to={`?group=${_id}`}
    onClick={(e)=>{
      if(chatId===_id)e.preventDefault();
    }}
    >
      <Stack direction="row" alignItems="center" spacing={'1rem'} padding="0.5rem">
        <AvatarCard avatar={avatar} name={name} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Group;
