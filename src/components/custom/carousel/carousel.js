import React from "react";
import Slider from "react-slick";
import CarouselItem from "./carouselItems";
import {IconButton, makeStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    arrow: {
        position: "absolute",
        top: "50%",
    },
    next: {
        right: 0
    },
    prev: {
        zIndex: 1
    }
}));


const CustomCarousel = ({items, carouselOptions}) => {

    const classes = useStyles();

    const NextArrow = (props) => {
        const {onClick} = props;

        return (
            <IconButton className={clsx(classes.arrow, classes.next)} onClick={onClick}>
                <FontAwesomeIcon color={"white"} icon={"arrow-right"}/>
            </IconButton>
        );
    };

    const PrevArrow = (props) => {
        const {onClick} = props;

        return (
            <IconButton className={clsx(classes.arrow, classes.prev)} onClick={onClick}>
                <FontAwesomeIcon color={"white"} icon={"arrow-left"}/>
            </IconButton>
        );
    };

    const settings = {
        ...carouselOptions,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>
    };

    return (
        <Slider {...settings} >
            {
                items.map((item, i) => <CarouselItem key={i} item={item}/>)
            }
        </Slider>
    );

};

export default CustomCarousel;
