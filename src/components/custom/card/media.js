import React from "react";
import {CardMedia} from "@material-ui/core";

const MediaCard = ({media}) => {
    return (
        <React.Fragment>
            {!media && null}
            {media && <CardMedia {...media}>
                {media && media.content}
            </CardMedia>}
        </React.Fragment>
    );
};

export default MediaCard;
