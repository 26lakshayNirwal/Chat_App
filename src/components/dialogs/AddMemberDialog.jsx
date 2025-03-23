import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleusers } from '../../constants/sampledata'
import UserItem from '../shared/UserItem'

const AddMemberDialog = ({addMember,isLoadingAddMember,chatId}) => {

    const[members,setMembers]=useState(sampleusers)
    const[selectedMembers,setSelectedMembers]=useState([])
      
    const selectMemberHandler=(id)=>{
        setSelectedMembers((prev)=>(prev.includes(id)) ?  prev.filter((i)=> i!==id)
                                                       : [...prev,id]);
      }

    

    const addMemberSubmitHandler=()=>{
          
    }

    const closeHandler=()=>{
      setSelectedMembers([]);
      setMembers([]);
    }



  return (
    <Dialog open onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
            <DialogTitle textAlign={"center"}>
                Add Member
            </DialogTitle>

            <Stack spacing={"1rem"}>
                { members.length>0? (members.map((i)=>(
                    <UserItem
                      key={i._id} 
                      user={i} 
                      handler={selectMemberHandler}
                      isAdded={selectedMembers.includes(i._id)}
                      />
                ))):(
                    <Typography textAlign={"center"}>No Friend Found</Typography>
                )}

            </Stack>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
             <Button color='error' variant='outlined' onClick={closeHandler}>Cancel</Button>
             <Button variant='contained' disabled={isLoadingAddMember} onClick={addMemberSubmitHandler}>Add</Button>
            </Stack>
        </Stack>

    </Dialog>
  )
}

export default AddMemberDialog
