import React from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";

const Comment = ({comment}) => {
    return (
        <React.Fragment>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt={"user avatar"} src={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${comment.user.avatar}`} />
                </ListItemAvatar>
                <ListItemText
                    primary={comment.user.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                variant="body2"
                                color="textPrimary"
                            >
                                {comment.content}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                            >
                                {comment.createdAt}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </React.Fragment>
    );
};

export default Comment;
