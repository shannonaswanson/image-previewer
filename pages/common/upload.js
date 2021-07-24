import axios from 'axios';

export default async function uploadImage (image) {
    const formData = new FormData();
    formData.append('image', image);
    const response = await axios.post('/api/image', formData);
    return response.data.files;
}