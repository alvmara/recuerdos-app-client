import { IconButton } from '@mui/material';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const MemoryImagesCarousel = ({ images }) => {
    const arrowStyles = {
        position: 'absolute',
        zIndex: 2,
        top: 'calc(50% - 15px)'
    };

    return (
        <Carousel
            height="100%"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                    <IconButton type="button" color="primary" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15 }}>
                        <ArrowLeft />
                    </IconButton>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <IconButton type="button" color="primary" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
                        <ArrowRight />
                    </IconButton>
                )
            }
            showThumbs={false}
            showIndicators={false}
            statusFormatter={() => null}
        >
            {images.map(image => <img key={image} src={image} alt={image} />)}
        </Carousel>
    );
};

export default MemoryImagesCarousel;