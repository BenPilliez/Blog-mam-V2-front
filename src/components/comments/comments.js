import React from "react";
import {List} from "@material-ui/core"
import Comment from "./comment";

const Comments = ({comments}) => {
    return (
        <React.Fragment>
            {comments.length > 0 && <List> {comments.map((comment, index) => {
                return  <Comment key={index} comment={comment}/>;
            })}
            </List> }
        </React.Fragment>
    );
};

export default Comments;
