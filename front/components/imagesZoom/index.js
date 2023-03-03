import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Global, Header, CloseButton, ImagesWrapper, Indicator, SlickWrapper } from './style';





const ImagesZoom = ({ image, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    return (
        <Overlay>
            <Global />
            <Header>
                <h1>상세 이미지</h1>
                <CloseButton onClick={onClose}></CloseButton>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        beforeChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrow={false}
                        slidesToScroll={1}
                        slidesToShow={1}
                    >
                        {image.map((image) => (
                            <ImagesWrapper key={image.src}>
                                <img src={`http://localhost:3065/${image.src}`} alt={image.src} />

                            </ImagesWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1}
                            {' '}
                            /
                            {image.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>

        </Overlay>
    )
}

ImagesZoom.PropTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired
};


export default ImagesZoom
