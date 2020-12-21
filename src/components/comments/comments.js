import React from "react";
import {Grid, List, makeStyles} from "@material-ui/core";
import Comment from "./comment";
import {paginate} from "../../helpers/paginate";
import {Pagination} from "@material-ui/lab";

const useStyle = makeStyles((theme) => ({
    spacing: {
        margin: theme.spacing(2)
    }
}));

const Comments = ({comments}) => {

    const classes = useStyle();
    const [page, setPage] = React.useState(1);

    const perPage = 3;
    const totalItems = Math.ceil(comments.length / perPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        return paginate(comments, perPage, newPage);
    };

    return (
        <React.Fragment>
            {comments.length > 0 && <> <List> {paginate(comments, perPage, page).map((comment) => {
                return <React.Fragment key={comment.id} >
                    <Comment comment={comment} addReply={true} />
                    {comment.Children.length > 0 && <List style={{marginLeft: '15px'}}>{comment.Children.map((children,index) => {
                        return <Comment key={children.id} comment={children} addReply={false} />
                    })}</List>}
                </React.Fragment>
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
        </React.Fragment>
    );
};

export default Comments;
