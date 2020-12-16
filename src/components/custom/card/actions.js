import React from "react"
import {Button, CardActions} from "@material-ui/core";

const ActionsCard = ({actions}) => {

    return (
        <CardActions {...actions}>
            {actions && actions.actions &&  actions.actions.map((item, key) => {
                return <Button {...item.props} key={key}>
                    {item.label}
                </Button>
            })}
        </CardActions>
    )

}

export default ActionsCard
