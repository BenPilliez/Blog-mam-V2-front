import React from "react";
import {Button, CardActions} from "@material-ui/core";

const ActionsCard = ({actions}) => {

    return (
        <React.Fragment>
            {!actions && null}
            {actions && <CardActions {...actions}>
                {actions && actions.actions && actions.actions.map((item, key) => {
                    return <Button {...item.props} key={key}>
                        {item.label}
                    </Button>;
                })}
            </CardActions>}
        </React.Fragment>

    );

};

export default ActionsCard;
