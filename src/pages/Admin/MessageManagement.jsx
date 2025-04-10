import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../constants/sampledata'
import { Avatar, Box, Stack } from '@mui/material'
import moment from 'moment'
import { fileFormat, transformImage } from '../../lib/features'
import RenderAttachments from "../../components/shared/RenderAttachments"

const columns=[
  {
    field:"id",
    headerName:"ID",
    headerClassName:"table-header",
    width:200,
  },

  {
    field:"attachments",
    headerName:"Attachments",
    headerClassName:"table-header",
    width:200,
    renderCell:(params)=>{
      const { attachments } =params.row;
        
      return attachments?.length>0 ? attachments.map((i)=>{

        const url=i.url;
        const file=fileFormat(url);

        return <Box>
          <a href={url}
             download
             target='_blank'
             style={{
              color:"black",
             }}
             >
              {RenderAttachments(file,url)}
             </a>
        </Box>
      }):
      "NO Attachments";

    }
  },
  {
    field:"content",
    headerName:"Content",
    headerClassName:"table-header",
    width:400,
  },
  {
    field:"sender",
    headerName:"Sent By",
    headerClassName:"table-header",
    width:200,
    renderCell:(params)=>(
      <Stack>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
        <span>{params.row.sender.name}</span>
      </Stack>

    )
  },
  {
    field:"chat",
    headerName:"Chat",
    headerClassName:"table-header",
    width:220,
  },
  {
    field:"groupChat",
    headerName:"Group Chat",
    headerClassName:"table-header",
    width:100,
  },
  {
    field:"createdAt",
    headerName:"Time",
    headerClassName:"table-header",
    width:250,
  },
]

const MessageManagement = () => {
  const [rows, setRows] = useState([])

  
    useEffect(() => {
      setRows(
        dashboardData.messages.map((msg) => ({
          ...msg,
          id: msg._id,
          attachments: msg.attachments?.map((a) => a.url) || [],
          content: msg.content || "No Text",
          sender: { name: msg.sender.name, avatar: transformImage(msg.sender.avatar, 50) },
          chat: msg.chat,
          groupChat: msg.groupChat ? "Yes" : "No", 
          createdAt: moment(msg.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        }))
      );
    }, []);
    

  return (
    <AdminLayout>
      <Table heading={"All Messages"} columns={columns} rows={rows}  rowHeight={200}/>
    </AdminLayout>
  )
}

export default MessageManagement
