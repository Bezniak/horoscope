import axios from 'axios';


export const getHoroscope = async (sign, language) => {
    const response = await axios.post('https://poker247tech.ru/get_horoscope/', {
        language
    });
    console.log(response.data)
    return response.data;
};
