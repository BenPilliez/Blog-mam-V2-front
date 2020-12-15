import React from "react"
import {Container, Grid, makeStyles} from "@material-ui/core"
import CustomCard from "./customCard"
import {Pagination} from "@material-ui/lab"
import PropTypes  from "prop-types"

const useStyles = makeStyles((theme) => ({
    spacing: {
        margin: theme.spacing(2)
    },
    root: {
        marginTop: theme.spacing(2)
    }
}))

const CardList = ({posts, handleChange, pagination, page}) => {
    const classes = useStyles()
    return (
        <Container className={classes.root}>
            <Grid container justify={"center"}>
                {posts && posts.map((item, index) => {
                    return <CustomCard
                        item={item}
                        key={index}/>
                })}
                <Grid item container justify={"center"} xs={12}>
                    <Pagination
                        className={classes.spacing}
                        component="div"
                        count={pagination.totalPages}
                        page={page}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

CardList.propTypes = {
    posts: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired
}

export default CardList
