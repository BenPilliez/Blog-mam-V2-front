import React from "react"
import DesktopNav from "./desktop"
import {useMediaQuery} from "@material-ui/styles"

const NavBar = (props) => {

    const matches = useMediaQuery((theme) => theme.breakpoints.down('sm') || theme.breakpoints.down('xs'))

    return (
        <div>

        </div>
    )
}

export default NavBar
