import React, { useState, useEffect } from 'react';
import axios from 'axios';
// const chalk = require('chalk');

function Search() {
  const [term, setTerm] = useState('car');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  // // 2/3 riješenje IIF
  // (async () => {
  //   await axios.get('url');
  // })();

  // // 3/3 PROMISE
  // axios.get('url').then((res) => {
  //   console.log(res);
  // });

  // set debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);




  // debounce
  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });
      setResults(data.query.search);
      console.log(data.query.search);
    };

    search();
    return () => {
      // cleanup;
    };
  }, [debouncedTerm]);


  //  data for rendering
  const renderResults = results.map((data) => {
    // const regexSapnClass = /Dog/i;
    const regexSpanClass = /<span class="searchmatch">/gi;
    const regexSpan = /<\/span>/gi;
    let podatak = data.snippet.replace(regexSpanClass, ' Prije ');
    podatak = podatak.replace(regexSpan, ' Poslije ');

    return (
      <div key={data.pageid} className="item" style={{ display: 'flex' }}>
        <span>
          <div className="right floated content">
            <a
              className="ui button"
              href={`https://en.wikipedia.org?curid=${data.pageid}`}
            >
              Go
            </a>
          </div>
        </span>

        <div className="content">
          <div className="header">{data.title}</div>
          <span>{podatak}</span>
        </div>
      </div>
    );
  });


  // RENDER
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label> Enter text</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          ></input>
        </div>
      </div>
      <div>{renderResults}</div>
    </div>
  );
}

export default Search;
