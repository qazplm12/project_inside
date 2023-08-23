import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', selectedImage);

        try {
            await axios.post('/api/images/upload', formData);
            alert('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUpload;
