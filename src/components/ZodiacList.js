import React from 'react';
import {getTranslations} from '../i18n';
import './ZodiacList.css';

const ZodiacList = ({onSelectSign, language}) => {
    const translations = getTranslations(language);


    return (
        <div>
            <div className="zodiac-list">
                {Object.keys(translations.zodiac_dates).map((sign) => (
                    <div key={sign} className="zodiac-item" onClick={() => onSelectSign(sign)}>
                        <div className="zodiac-icon">{translations.zodiac_icons[sign]}</div>
                        <div className="zodiac-name">{translations[sign]}</div>
                        <div className="zodiac-date">{translations.zodiac_dates[sign]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZodiacList;
