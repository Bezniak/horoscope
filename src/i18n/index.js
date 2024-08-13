import en from "./en";
import ru from "./ru";

const languages = {en, ru};

export const getTranslations = (language) => languages[language] || languages.en;