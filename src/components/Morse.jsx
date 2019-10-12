import React, {Component} from 'react';
import { useTimer } from 'use-timer';
import Button from '@material-ui/core/Button';
import wordData from '../../db/20k.js'
import Predictions from '../components/Predictions.jsx'
import Backspace from '@material-ui/icons/Backspace';
import TouchApp from '@material-ui/icons/TouchApp';
import SpeakerPhone from '@material-ui/icons/SpeakerPhone';
import CustomDrawer from './Drawer.jsx'
import {morseLib} from './Dictionary.jsx'

class Morse extends Component {
    constructor(props) {
        super(props)
        this.state = {
          morseMessage: '',
          message: '',
          tap_sensitivity: 0.2,
          space_sensitivity: 1,
          predictions: {
            predictionOne: '',
            predictionTwo: '',
            predictionThree: ''
          },
          currentWord: '',
          letterSensitivity: 800,
          spaceSensitivity: 2000,
          renderSettings: false
        };
    }

    translateTime(time) {
      let indicator = (time < this.state.tap_sensitivity) ? '.' : '-';
      this.setState({
        morseMessage: this.state.morseMessage + indicator,
      })
    }

    translate(input){
      if(input) {
        let letter = morseLib[input];
        let newMessage = this.state.message + letter;
        this.setState({
          message: newMessage,
          morseMessage: ''
        }, () => {
          let lastWord = this.state.message.split(' ').reverse()[0].toLowerCase();
          this.setState({currentWord: lastWord}, this.updatePredictions(lastWord))
        })
  
        return input;
      }
    }

    renderLetter() {
      this.translate(this.state.morseMessage)
    }

    renderSpaces() {
      this.setState({
        message: this.state.message + ' '
      })
    }

    updatePredictions(string) {
      console.log(string)
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
      this.setState({
        predictions: {
          predictionOne: firstPrediction.toUpperCase(),
          predictionTwo: secondPrediction.toUpperCase(),
          predictionThree: thirdPrediction.toUpperCase()
        }
      })
    }

    selectPrediction(word) {
      let newMessageArray = this.state.message.split(' ');
      newMessageArray.pop();
      let newMessage = newMessageArray.join(' ') + ' ' + word + ' ';
      this.setState({
        message: newMessage,
        currentWord: '',
        predictions: {
          predictionOne: '',
          predictionTwo: '',
          predictionThree: ''
        },
      })
    }

    handleBackSpace() {
      this.setState({
        message: this.state.message.substring(0, this.state.message.length - 1)
      })
    }

    handleSpeech() {
      let utterance = new SpeechSynthesisUtterance(this.state.message);
      window.speechSynthesis.speak(utterance);
    }

    render() {
        return (

          this.state.renderSettings 
          ? null 
          :
            <div id='morse_container'>
              <h1 className='header'>Morse Interpreter</h1>
              <div className='message_box main_message'>{this.state.message}</div>
              <div className='input_container'>
                <div className='message_box morse_current preview_left'>{morseLib[this.state.morseMessage]}</div>
                <div className='message_box morse_current'>{this.state.morseMessage}</div>
              </div>
              <Predictions predictions={this.state.predictions} 
                          selectPrediction={this.selectPrediction.bind(this)}/>
              <div id='input_container'>
                <MorseInput translateTime={this.translateTime.bind(this)}
                            space_sensitivity={this.state.space_sensitivity}
                            translate={this.translate}
                            renderLetter={this.renderLetter.bind(this)}
                            renderSpaces={this.renderSpaces.bind(this)}
                            letterSensitivity={this.state.letterSensitivity}
                            spaceSensitivity={this.state.spaceSensitivity}/>
                <div id='alternate_inputs'>
                  <CustomDrawer />
                  <Button id='green_button' variant="contained"
                          onClick={this.handleSpeech.bind(this)}><SpeakerPhone /></Button>
                  <Button id='red_button' variant="contained"
                          onClick={this.handleBackSpace.bind(this)}><Backspace /></Button>
                </div>
              </div>
            </div>
        )
    }
}

const MorseInput = (props) => {
  const { time: charTime, start: charStart, pause: charPause, reset: charReset } = useTimer({interval: 100});
  const settings = JSON.parse(localStorage.getItem('vocal_codes_settings'));
  console.log(settings)

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