import React, {Component} from 'react';
import { useTimer } from 'use-timer';
import { endianness } from 'os';
import Button from '@material-ui/core/Button';
import wordData from '../../db/20k.js'
import Predictions from '../components/Predictions.jsx'

const morseLib = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9"
}

class Morse extends Component {
    constructor(props) {
        super(props)
        this.state = {
          morseMessage: '',
          message: '',
          tap_sensitivity: 0.2,
          space_sensitivity: 1,
          backspace_sensitivity: 2,
          predictions: {
            predictionOne: '',
            predictionTwo: '',
            predictionThree: ''
          },
          currentWord: ''
        };
    }

    translateTime(time) {
      //console.log(time);
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

    renderSpace() {
      this.translate(this.state.morseMessage)
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
          predictionOne: firstPrediction,
          predictionTwo: secondPrediction,
          predictionThree: thirdPrediction
        }
      })
    }

    render() {
        return (
            <div id='morse_container'>
              <h1 className='header'>Morse</h1>
              <div className='message_box main_message'>{this.state.message}</div>
              <div className='input_container'>
                <div className='message_box morse_current preview_left'>{morseLib[this.state.morseMessage]}</div>
                <div className='message_box morse_current'>{this.state.morseMessage}</div>
              </div>
              <Predictions predictions={this.state.predictions} />
              <MorseInput translateTime={this.translateTime.bind(this)}
                          space_sensitivity={this.state.space_sensitivity}
                          translate={this.translate}
                          renderSpace={this.renderSpace.bind(this)}/>
            </div>
        )
    }
}

const MorseInput = (props) => {
  const { time: charTime, start: charStart, pause: charPause, reset: charReset } = useTimer({interval: 100});

  return (
    <Button variant="contained" id='morse_input'
         onTouchStart={() => {
          charStart();
          window.clearTimeout(window.timeOutID);
         }}
         onTouchEnd={() => {
          charPause();
          props.translateTime(charTime / 10);
          charReset();

          window.timeOutID = window.setTimeout( function () {
            props.renderSpace()
          }.bind(this), 500)
         }}
         >Tap Here</Button>
  )
}

export default Morse;