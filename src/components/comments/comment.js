import React from "react";
import {connect} from "react-redux";
import {useSnackbar} from "notistack";
import {
    Avatar,
    ClickAwayListener,
    Collapse,
    Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormComment from "./formComment";
import {replyComment} from "../../store/actions/commentsActions";

const useStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        flexDirection: "column"
    },
    marginLeft: {
        width:'100%'
    },
    float: {
        float: "right"
    }
}));

const Comment = ({comment, user, reply, addReply}) => {

    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [expanded, setExpanded] = React.useState(false);
    const [commentId, setCommentId] = React.useState(false);

    const handleExpand = (event) => {
        setExpanded(!expanded);
        setCommentId(event);
    };

    const handleClickAway = () => {
        setExpanded(false);
        setCommentId(null);
    };

    const handleSubmit = (value) => {
        if (!user) {
            return enqueueSnackbar("Il faut être connecté pour commenter", {
                variant: "error",
                persist: true,
            });
        }

        let form = {
            content: value.content,
            userId: user.id,
            commentsId: commentId
        };

        reply(form);
    };

    return (
        <React.Fragment>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt={"user avatar"}
                            src={`${process.env.REACT_APP_BASE_PUBLIC_URL}/${comment.user.avatar}`}/>
                </ListItemAvatar>
                <ListItemText
                    primary={comment.user.username}
                    secondary={
                        <React.Fragment>
                            <Typography component={"span"} className={classes.content}>
                                <Typography
                                    component={"span"}
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {comment.content}
                                </Typography>
                                <Typography
                                    component={"span"}
                                    variant="subtitle2"
                                >
                                    {comment.createdAt}
                                </Typography>
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            {addReply && <> <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.button}>
                    <IconButton size={"small"} onClick={() => handleExpand(comment.id)} className={classes.float}>
                        <FontAwesomeIcon icon={"reply"}/>
                    </IconButton>
                    <Collapse
                        in={expanded}
                        timeout="auto"
                        className={classes.marginLeft}
                    >
                        <Grid item container xs={12}>
                            <FormComment submit={handleSubmit}/>
                        </Grid>
                    </Collapse>
                </div>
            </ClickAwayListener> </>}

        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        reply: (form) => dispatch(replyComment(form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
