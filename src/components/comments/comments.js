import React from "react";
import {Button, Collapse, Divider, Grid, List, makeStyles, Typography} from "@material-ui/core";
import Comment from "./comment";
import {paginate} from "../../helpers/paginate";
import {Pagination} from "@material-ui/lab";

const useStyle = makeStyles((theme) => ({
    spacing: {
        margin: theme.spacing(2)
    },
    listChildren: {
        marginLeft: "5%"
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
        marginTop: theme.spacing(10),
    },
    button: {
        margin: "0 auto",
        width: "100%"
    }
}));

const Comments = ({comments}) => {

    const classes = useStyle();
    const [page, setPage] = React.useState(1);
    const [expanded, setExpanded] = React.useState({});

    const perPage = 3;
    const totalItems = Math.ceil(comments.length / perPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        return paginate(comments, perPage, newPage);
    };

    const handleShowComment = (id) => {
        setExpanded({
            ...expanded,
            [id]: !expanded[id]
        });
    };

    return (
        <>
            <Divider className={classes.divider}/>
            {comments.length > 0 && <> <List> {paginate(comments, perPage, page).map((comment) => {
                    return <React.Fragment key={comment.id}>
                        <Comment comment={comment} addReply={true}/>
                        {comment.Children.length > 0 &&
                        <List className={classes.listChildren}>
                            <Button
                                className={classes.button}
                                onClick={() => {
                                    handleShowComment(comment.id);
                                }}
                                color={"primary"}
                                aria-expanded={expanded[comment.id]}
                                aria-label="Réponses commentaires"
                            >
                                {expanded[comment.id] ? "Masquer les commentaires" : "Afficher les commentaires"}
                            </Button>
                            {comment.Children.map((children) => {
                                return <Collapse
                                    in={expanded[comment.id]}
                                    unmountOnExit
                                    timeout="auto"
                                    key={children.id}
                                >
                                    <Comment comment={children} addReply={false}/>
                                </Collapse>;

                            })}</List>}
                    </React.Fragment>;
                }
            )}
            </List>
                <Grid item container justify={"center"}>
                    <Pagination
                        className={classes.spacing}
                        component="div"
                        count={totalItems}
                        page={page}
                        onChange={handleChangePage}
                    />
                </Grid>
            </>
            }
        </>
    );
};

export default Comments;
