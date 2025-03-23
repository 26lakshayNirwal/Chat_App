import { Typography,Box } from '@mui/material';
import moment from 'moment';
import React, { memo } from 'react'
import { fileFormat } from '../../lib/features';
import RenderAttachments from './RenderAttachments';
const MessageComponent = ({message,user}) => {
    const {sender,content,attachments=[],createdAt}=message;
    const timeAgo=moment(createdAt).fromNow();
    const sameSender=sender?._id===user?._id;
    return (
    <div
    style={{
        alignSelf:sameSender?"flex-end":"flex-start",
        background:"white",
        color:"violet",
        borderRadius:"5px",
        padding:"0.5rem",
        width:"fit-content",
    }}
    >
      {!sameSender && <Typography color={"#2694ab"} fontWeight={'700'} variant='caption'>{sender.name}</Typography>}
      {content && <Typography>{content}</Typography>}

      {
        attachments.length>0 && attachments.map((attachment,index)=>{
            const url=attachment.url;
            const file =fileFormat(url);
            return (
                <Box key={index}>
                    <a 
                    href={url}
                    target='_blank'
                    download
                    style={{
                        color:"black",

                    }}
                    >
                        {RenderAttachments(file,url)}
                    </a>

                </Box>
            )
        })
      }

      <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
    </div>
  )
}

export default memo(MessageComponent)
