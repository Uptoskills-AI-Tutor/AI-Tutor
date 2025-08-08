<<<<<<< HEAD
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [translatedTexts, setTranslatedTexts] = useState({});

  const translateText = async (text, targetLang) => {
    try {
      const response = await fetch(
        `${encodeURIComponent(text)}&target=${targetLang}`
      );
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const getLanguageCode = (language) => {
    const languageCodes = {
      'English': 'en',
      'Hindi': 'hi',
      'Bengali': 'bn',
      'Odia': 'or'
    };
    return languageCodes[language] || 'en';
  };

  const translateAllTexts = async (texts, targetLang) => {
    const newTranslations = {};
    for (const [key, value] of Object.entries(texts)) {
      if (typeof value === 'object') {
        newTranslations[key] = {};
        for (const [subKey, subValue] of Object.entries(value)) {
          try {
            const translatedText = await translateText(subValue, getLanguageCode(targetLang));
            newTranslations[key][subKey] = translatedText;
          } catch (error) {
            console.error(`Error translating ${key}.${subKey}:`, error);
            newTranslations[key][subKey] = subValue;
          }
        }
      } else {
        try {
          const translatedText = await translateText(value, getLanguageCode(targetLang));
          newTranslations[key] = translatedText;
        } catch (error) {
          console.error(`Error translating ${key}:`, error);
          newTranslations[key] = value;
        }
      }
    }
    setTranslatedTexts(newTranslations);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        translatedTexts, 
        translateAllTexts,
        getLanguageCode 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
=======
import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');
  const [translatedTexts, setTranslatedTexts] = useState({});

  const translateText = async (text, targetLang) => {
    try {
      const response = await fetch(
        `${encodeURIComponent(text)}&target=${targetLang}`
      );
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const getLanguageCode = (language) => {
    const languageCodes = {
      'English': 'en',
      'Hindi': 'hi',
      'Bengali': 'bn',
      'Odia': 'or'
    };
    return languageCodes[language] || 'en';
  };

  const translateAllTexts = async (texts, targetLang) => {
    const newTranslations = {};
    for (const [key, value] of Object.entries(texts)) {
      if (typeof value === 'object') {
        newTranslations[key] = {};
        for (const [subKey, subValue] of Object.entries(value)) {
          try {
            const translatedText = await translateText(subValue, getLanguageCode(targetLang));
            newTranslations[key][subKey] = translatedText;
          } catch (error) {
            console.error(`Error translating ${key}.${subKey}:`, error);
            newTranslations[key][subKey] = subValue;
          }
        }
      } else {
        try {
          const translatedText = await translateText(value, getLanguageCode(targetLang));
          newTranslations[key] = translatedText;
        } catch (error) {
          console.error(`Error translating ${key}:`, error);
          newTranslations[key] = value;
        }
      }
    }
    setTranslatedTexts(newTranslations);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        translatedTexts, 
        translateAllTexts,
        getLanguageCode 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
}; 