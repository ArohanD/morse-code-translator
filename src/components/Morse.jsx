import React, {Component, useState, useEffect, useRef} from 'react';
import { useTimer } from 'use-timer';
import Button from '@material-ui/core/Button';
import wordData from '../../db/20k.js'
import Predictions from '../components/Predictions.jsx'
import Backspace from '@material-ui/icons/Backspace';
import TouchApp from '@material-ui/icons/TouchApp';
import SpeakerPhone from '@material-ui/icons/SpeakerPhone';
import CustomDrawer from './Drawer.jsx'
import {morseLib} from './Dictionary.jsx'

const Morse = () => {

  const settings = JSON.parse(localStorage.getItem('vocal_codes_settings'));
  console.log(settings)

  const blankPredictions = {
    predictionOne: '',
    predictionTwo: '',
    predictionThree: ''
  };
  const [morseMessage, setMorseMessage] = useState('')
  const currentMorseMessage = useRef(morseMessage);
  currentMorseMessage.current = morseMessage;
  const [message, setMessage] = useState('');
  const currentMessage = useRef(message);
  currentMessage.current = message;
  const [tap_sensitivity, setTap_sensitivity] = useState(settings.timeForDotToDash / 1000);
  const [predictions, setPredictions] = useState(blankPredictions);
  const [currentWord, setCurrentWord] = useState('');
  const [letterSensitivity, setLetterSensitivity] = useState(settings.timeBetweenWords);
  const [spaceSensitivity, setSpaceSensitivity] = useState(settings.timeBetweenSpaces);
  const [renderSettings, setRenderSettings] = useState(false);

  useEffect(() => {
    let lastWord = message.split(' ').reverse()[0].toLowerCase();
    setCurrentWord(lastWord);
  }, [morseMessage]);
  
  useEffect(() => {
    updatePredictions(currentWord);
  }, [currentWord]);

  const translateTime = (time) => {
    let indicator = (time < tap_sensitivity) ? '.' : '-';
    let newMorseMessage = morseMessage + indicator;
    setMorseMessage(newMorseMessage);
  }

  const translate = (input) => {
    if(input) {
      let letter = morseLib[input] ? morseLib[input] : '';
      let newMessage = message + letter;

      setMessage(newMessage);
      setMorseMessage('');

      return input;
    }
  }

  const renderLetter = () => {
    translate(currentMorseMessage.current)
  }

  const renderSpaces = () => {
    let newMessage = currentMessage.current + ' ';
    setMessage(newMessage);
  }

  const updatePredictions = (string) => {
    let firstPrediction = '', secondPrediction = '', thirdPrediction = '';
    for(let i = 0; i < wordData.length; i++){
      if( (wordData[i][0] === string[0]) && wordData[i].includes(string)){
        if(firstPrediction === ''){
          firstPrediction = wordData[i];
        } else if (secondPrediction === ''){
          secondPrediction = wordData[i];
        } else if (thirdPrediction === ''){
          thirdPrediction = wordData[i];
          break;
        }
      }
    }
    let newPredictions = {
      predictionOne: firstPrediction.toUpperCase(),
      predictionTwo: secondPrediction.toUpperCase(),
      predictionThree: thirdPrediction.toUpperCase()
    };

    setPredictions(newPredictions);
  }

  const selectPrediction = (word) => {
    let newMessageArray = message.split(' ');
    newMessageArray.pop();
    let newMessage = newMessageArray.join(' ') + ' ' + word + ' ';

    setMessage(newMessage);
    setCurrentWord('');
    setPredictions(blankPredictions);

  }

  const handleBackSpace = () => {
    const newMessage = message.substring(0, message.length - 1);
    setMessage(newMessage);
  }

  const handleSpeech = () => {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  return (

    renderSettings 
    ? null 
    :
      <div id='morse_container'>
        <h1 className='header'>Morse Interpreter</h1>
        <div className='message_box main_message'>{message}</div>
        <div className='input_container'>
          <div className='message_box morse_current preview_left'>{
            Object.keys(morseLib).includes(morseMessage) ? morseLib[morseMessage] : 'N/A'
          }
          </div>
          <div className='message_box morse_current'>{morseMessage}</div>
        </div>
        <Predictions predictions={predictions} 
                    selectPrediction={selectPrediction.bind(this)}/>
        <div id='input_container'>
          <MorseInput translateTime={translateTime.bind(this)}
                      translate={translate}
                      renderLetter={renderLetter.bind(this)}
                      renderSpaces={renderSpaces.bind(this)}
                      letterSensitivity={letterSensitivity}
                      spaceSensitivity={spaceSensitivity}/>
          <div id='alternate_inputs'>
            <CustomDrawer />
            <Button id='green_button' variant="contained"
                    onClick={handleSpeech.bind(this)}><SpeakerPhone /></Button>
            <Button id='red_button' variant="contained"
                    onClick={handleBackSpace.bind(this)}><Backspace /></Button>
          </div>
        </div>
      </div>
  )
}

const MorseInput = (props) => {
  const { time: charTime, start: charStart, pause: charPause, reset: charReset } = useTimer({interval: 100});
  const settings = JSON.parse(localStorage.getItem('vocal_codes_settings'));

  return (
    <Button variant="contained" id='morse_input'
         onTouchStart={() => {
          charStart();
          window.clearTimeout(window.timeOutLetters);
          window.clearTimeout(window.timeOutSpaces);
         }}
         onTouchEnd={() => {
          charPause();
          props.translateTime(charTime / 10);
          charReset();

          window.timeOutLetters = window.setTimeout( function () {
            props.renderLetter()
          }.bind(this), props.letterSensitivity)

          window.timeOutSpaces = window.setTimeout( function () {
            props.renderSpaces()
          }.bind(this), props.spaceSensitivity)
         }}
         ><TouchApp /></Button>
  )
}

export {Morse};