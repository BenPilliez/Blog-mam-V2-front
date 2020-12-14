import React from "react"
import Carousel from "react-material-ui-carousel"
import CarouselItem from "./carouselItems"


const CustomCarousel = ({items, carouselOptions}) => {

    return (
        <Carousel {...carouselOptions}>
            {
                items.map((item, i) => <CarouselItem key={i} item={item}/>)
            }
        </Carousel>
    )

}

export default CustomCarousel
