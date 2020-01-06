import React from 'react';
import ReactDOM from 'react-dom';
import {RouteManager as Root} from'./router.jsx';

const defaultSettings = {
  timeBetweenWords: 1000,
  timeBetweenSpaces: 2000,
  timeForDotToDash: 200,
  dualInputShortPress: 'Yes',
  dualInputLongPress: 'No'
}

if(!localStorage.getItem('vocal_codes_settings')){
  localStorage.setItem('vocal_codes_settings', JSON.stringify(defaultSettings))
}

ReactDOM.render(<Root />, document.getElementById('root'));