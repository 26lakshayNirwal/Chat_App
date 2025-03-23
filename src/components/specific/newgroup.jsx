import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { sampleusers } from '../../constants/sampledata';
import UserItem from '../shared/UserItem';
const newgroup = () => {
  
  const[members,setMembers]=useState(sampleusers)
  const[selectedMembers,setSelectedMembers]=useState([])
  
  const selectMemberHandler=(id)=>{
    setSelectedMembers((prev)=>(prev.includes(id)) ?  prev.filter((i)=> i!==id)
                                                   : [...prev,id]);
  }

  const submitHandler=()=>{

  }

  const closeHandler=()=>{}

  const groupName =useInputValidation("");

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs:"1rem",sm:"2rem" }} width={"25rem"} spacing={"1rem"}>
        <DialogTitle align='center' variant='h4'>
          New Group
        </DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1'>
          Members
        </Typography>
        <Stack>
        {members.map((i) => (
            <UserItem
              user={i} 
              key={i._id} 
              handler={selectMemberHandler} 
              isAdded={selectedMembers.includes(i._id)}
              />
            ))}
        </Stack>

        <Stack direction={"row"} justifyContent={'space-evenly'}>
          <Button variant='outlined' color='error' size='large'>Cancel</Button>
          <Button variant='contained' size='large' onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default newgroup
