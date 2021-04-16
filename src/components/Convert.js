import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  console.log(language.value);

  const [translated, setTranslated] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  // set debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  //
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
          },
        },
      );

      console.log(data);
      setTranslated(data.data.translations[0].translatedText);
    };

    //  call function
    search();
  }, [language, debouncedText]);

  return (
    <div>
      <h1> {translated} </h1>
    </div>
  );
};

export default Convert;
