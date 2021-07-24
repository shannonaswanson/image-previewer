import axios from "axios";

export default async function getImages() {
    const response = await axios.get('/api/image');
    return response.data.files;
}