import axios from 'axios';


export const getHoroscope = async (sign, language) => {
    const response = await axios.post(process.env.REACT_APP_API_URL, {
        language
    });
    return response.data;
};
