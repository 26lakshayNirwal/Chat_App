import React, { useState } from 'react';
import { Container, Paper, TextField, Typography, Button, Stack, Avatar, IconButton } from '@mui/material';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';

const useFileHandler = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const changeHandler = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return { file, preview, changeHandler };
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const avatar = useFileHandler();

  const handleLogin = (event) => {
    event.preventDefault();
  }

  const handleSignUp = (event) => {
    event.preventDefault();
  }

  return (
    <div
    style={{
        background: "linear-gradient(rgb(54 32 200 / 50%), rgb(179 11 11 / 50%))",
    }}
    >
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form
              style={{
                width: '100%',
                marginTop: '1rem',
              }}
              onSubmit={handleLogin}
            >
              <TextField required fullWidth label="Username" margin="normal" variant="outlined" />
              <TextField required fullWidth label="Password" type="password" margin="normal" variant="outlined" />
              <Button sx={{ marginTop: '1rem' }} fullWidth variant="contained" color="primary" type="submit">
                Login
              </Button>
              <Typography textAlign="center" m="1rem">
                OR
              </Typography>
              <Button variant="text" fullWidth onClick={toggleLogin}>
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">SignUp</Typography>
            <form
              style={{
                width: '100%',
                marginTop: '1rem',
              }}
              onSubmit={handleSignUp}
            >
              <Stack alignItems="center" position="relative" width="100%">
                <Avatar sx={{ width: '10rem', height: '10rem', objectFit: 'contain' }} src={avatar.preview} />
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 80,
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    ':hover': {
                      bgcolor: 'rgba(0,0,0,0.7)',
                    },
                  }}
                  component="label"
                >
                  <CameraAltIcon />
                  <input type="file" onChange={avatar.changeHandler} style={{ display: 'none' }} />
                </IconButton>
              </Stack>
              <TextField required fullWidth label="Name" margin="normal" variant="outlined" />
              <TextField required fullWidth label="Bio" margin="normal" variant="outlined" />
              <TextField required fullWidth label="Username" margin="normal" variant="outlined" />
              <TextField required fullWidth label="Password" type="password" margin="normal" variant="outlined" />
              <Button sx={{ marginTop: '1rem' }} fullWidth variant="contained" color="primary" type="submit">
                SignUp
              </Button>
              <Typography textAlign="center" m="1rem">
                OR
              </Typography>
              <Button variant="text" fullWidth onClick={toggleLogin}>
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
    </div>
  );
};

export default Login;
