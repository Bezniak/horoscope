import React, {useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';
import ZodiacList from './components/ZodiacList';
import {getHoroscope} from './api/horoscope';
import {getTranslations} from './i18n';
import {useSwipeable} from 'react-swipeable';
import './App.css';

const App = () => {
    const [language, setLanguage] = useState('en');
    const [selectedSign, setSelectedSign] = useState(null);
    const [horoscope, setHoroscope] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const today = new Date();
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = today.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', options);

    useEffect(() => {
        bridge.send('VKWebAppGetUserInfo').then(data => {
            const userLanguage = data.language === 'ru' ? 'ru' : 'en';
            setLanguage(userLanguage);
        });
    }, []);

    const handleSelectSign = async (sign) => {
        setIsLoading(true);
        try {
            const response = await getHoroscope(sign, language === 'ru' ? 'original' : 'translated');
            setHoroscope(response);
            setSelectedSign(sign);
        } catch (error) {
            console.error('Failed to fetch horoscope:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setSelectedSign(null);
        setHoroscope({});
    };

    const handleLanguageSwitch = () => {
        setLanguage(language === 'en' ? 'ru' : 'en');
    };

    const translations = getTranslations(language);

    const swipeHandlers = useSwipeable({
        onSwipedRight: () => {
            if (selectedSign) {
                handleBack();
            }
        },
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    return (
        <div className="app">
            {!selectedSign ? (
                <>
                    <button className="lang-switch" onClick={handleLanguageSwitch}>
                        {language === 'en' ? 'RU' : 'EN'}
                    </button>
                    <h1>{translations.zodiac_signs}</h1>
                    <ZodiacList onSelectSign={handleSelectSign} language={language}/>
                </>
            ) : (
                <div className="horoscope" {...swipeHandlers}>
                    <button onClick={handleBack}>{translations.back}</button>
                    {isLoading ? (
                        <div className="loader">{translations.loading}</div>
                    ) : (
                        <>
                            <h1>{translations[selectedSign]}</h1>
                            <div className="today-date">{formattedDate}</div>
                            <p className='description'>{horoscope?.horoscopes?.[selectedSign]}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
