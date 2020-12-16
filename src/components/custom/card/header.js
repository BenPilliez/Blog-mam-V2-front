import React from "react"
import {CardHeader} from "@material-ui/core";


const HeaderCard = (props) => {

    return(
        <React.Fragment>
            <CardHeader {...props} />
        </React.Fragment>
    )
}

export default HeaderCard
