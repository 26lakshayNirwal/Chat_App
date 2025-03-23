import { Dialog, DialogTitle, Stack, TextField, InputAdornment, ListItem, ListItemText ,List} from '@mui/material';
import React, { useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import {sampleusers} from '../../constants/sampledata';



const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(sampleusers)
  const addFriendHandler = (id) => {
    console.log(id);
  };

  let isLoadingSendFriendRequest = false;
   
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search}
          onChange={handleChange}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((i) => (
            <UserItem
              user={i} 
              key={i._id} 
              handler={addFriendHandler} 
              handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
