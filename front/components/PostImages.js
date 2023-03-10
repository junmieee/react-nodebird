import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imagesZoom';


const PostImages = ({ images }) => {
    const [showImagesZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
        setShowImagesZoom(true);
    })

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
    })
    if (images.length === 1) {
        return (
            <>
                <img style={{ maxHeight: '200px' }} role='presentation' src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}
            </>
        );

    };
    if (images.length === 2) {
        return (
            <>
                <img style={{ width: "50%", display: 'inline-block' }} role='presentation' src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
                <img style={{ width: "50%", display: 'inline-block' }} role='presentation' src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
                {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}


            </>
        )
    };
    return (
        <>
            <div>
                <img style={{ width: "50%", display: 'inline-block' }} role='presentation' src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />

                <div
                    role="presentation"
                    style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }}
                    onClick={onZoom}
                >
                    <PlusOutlined />
                    <br />
                    {images.length - 1}개의 이미지 더 보기
                </div>
                {showImagesZoom && <ImagesZoom image={images} onClose={onClose} />}



            </div>
        </>
    )

}

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
}


export default PostImages
