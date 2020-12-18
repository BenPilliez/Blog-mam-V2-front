import React from "react";
import {CardContent} from "@material-ui/core";


const ContentCard = ({content}) => {
    return (
        <React.Fragment>
            {!content && null}
            {content && <CardContent {...content}>
                {content.content}
            </CardContent>}
        </React.Fragment>

    );
};

export default ContentCard;
