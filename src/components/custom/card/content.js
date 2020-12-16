import React from "react";
import {CardContent} from "@material-ui/core";


const ContentCard = ({content}) => {
    console.log(content)

    return (
        <CardContent {...content}>
            {content && content.content}
        </CardContent>
    )
}

export default ContentCard
