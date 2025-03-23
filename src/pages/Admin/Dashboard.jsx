import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Person as PersonIcon, Message as MessageIcon } from '@mui/icons-material'
import { Stack, Paper, Container, Typography, Box } from '@mui/material'
import moment from 'moment'
import { CurvedButton, SearchField } from '../../components/styles/styledComponent'
import { DoughnutChart, Linechart } from '../../components/specific/Charts'

const Dashboard = () => {
    const Appbar = (
        <Paper 
        elevation={3}
        sx={{
            padding: "2rem",
            margin: "2rem 0",
            borderRadius: "1rem"
        }}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
                <SearchField placeholder='Search....' />
                <CurvedButton sx={{ color: "white" }}>Search</CurvedButton>
                <Box flexGrow={0.9} />
                <Typography
                    display={{
                        xs: "none",
                        lg: "block",
                    }}
                >
                    {moment().format("dddd, MMMM Do, YYYY")}
                </Typography>
            </Stack>
        </Paper>
    )

    const Widgets = (
        <Stack
            direction={{
                xs: "column",
                sm: "row",
            }}
            spacing="2rem"
            justifyContent="space-between"
            alignItems={"center"}
            margin={"2rem 0"}
        >
            <Widget title={"Users"} value={22} Icon={PersonIcon} />
            <Widget title={"Chats"} value={23} Icon={GroupIcon} />
            <Widget title={"Messages"} value={24} Icon={MessageIcon} />
        </Stack>
    )

    return (
        <AdminLayout>
            <Container component={"main"}>
                {Appbar}
                <Stack direction={{
                    xs:"column",
                    lg:"row",
                }} 
                       spacing={"2rem"} 
                       flexWrap={"wrap"} 
                       justifyContent={"center"}
                       alignItems={{
                        xs:"center",
                        lg:"stretch"
                       }}
                       >
                    <Paper
                        elevation={3}
                        sx={{
                            padding: "2rem 3.5rem",
                            borderRadius: "1rem",
                            width: {xs:"100%" ,lg:"48%"}
                            
                        }}
                    >
                        <Typography variant='h4' margin={"2rem 0"}>
                            Last Messages
                        </Typography>
                        <Linechart value={[23,45,67,54,34,87]} />
                    </Paper>

                    <Paper
                        elevation={3}
                        sx={{
                            padding: "1rem",
                            borderRadius: "1rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: { xs: "100%", sm: "50%" },
                            position: "relative",
                            maxWidth: "25rem",
                            
                        }}
                    >
                        <DoughnutChart 
                        labels={["Single Chats","Group Chats"]}
                        value={[30,50]}
                        />
                        <Stack
                            position={"absolute"}
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={"0.5rem"}
                            width={"100%"}
                            height={"100%"}
                        >
                            <GroupIcon />
                            <Typography>VS</Typography>
                            <PersonIcon />
                        </Stack>
                    </Paper>
                </Stack>

                {Widgets}
            </Container>
        </AdminLayout>
    )
}

// Widget Component
const Widget = ({ title, value, Icon }) => (
    <Paper
        elevation={3}
        sx={{
            padding: "1.5rem",
            borderRadius: "1rem",
            width: "12rem",
            textAlign: "center",
        }}
    >
        <Stack alignItems="center" spacing="1rem">
            <Box 
                sx={{
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "5px solid black",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color : "rgba(0,0,0,0.5)"
                }}
            >
                {value}
            </Box>
            <Stack direction="row" alignItems="center" spacing="0.5rem">
                {Icon && <Icon sx={{ fontSize: "2rem", color: "black" }} />}
                <Typography variant="h6">{title}</Typography>
            </Stack>
        </Stack>
    </Paper>
);


export default Dashboard
