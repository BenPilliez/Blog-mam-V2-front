import React from "react"
import {CardHeader} from "@material-ui/core";


const HeaderCard = (props) => {
    return(
        <React.Fragment>
            {!props.header && null}
            {props.header &&  <CardHeader {...props} />}
        </React.Fragment>
    )
}

export default HeaderCard
