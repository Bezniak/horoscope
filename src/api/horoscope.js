import axios from 'axios';


export const getHoroscope = async (sign, language) => {
    const response = await axios.post('http://5.35.90.171:61011/get_horoscope', {
        language
    });
    return response.data;
};
