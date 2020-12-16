import React from "react"
import {Card} from "@material-ui/core"
import ActionsCard from "./actions";
import HeaderCard from "./header";
import MediaCard from "./media";
import ContentCard from "./content";


const CustomCard = ({props, header, media, content, actions}) => {
    return (
        <Card {...props}>
            <HeaderCard header={header}/>
            <MediaCard media={media}/>
            <ContentCard content={content}/>
            <ActionsCard actions={actions}/>
        </Card>
    )
}


export default CustomCard
