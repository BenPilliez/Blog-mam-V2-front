import React from "react";
import {CardMedia} from "@material-ui/core";

const MediaCard = ({media}) => {
    return (
        <CardMedia {...media}>
            {media && media.content}
        </CardMedia>
    )
}

export default MediaCard
