import React from 'react'
import CustomDrawer from './Drawer.jsx'
import Button from '@material-ui/core/Button';
import { useTimer } from 'use-timer';
import TouchApp from '@material-ui/icons/TouchApp';
import SpeakerPhone from '@material-ui/icons/SpeakerPhone';

const settings = JSON.parse(localStorage.getItem('vocal_codes_settings'))

class DualInput extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      morseMessage: '',
      message: '',
      tap_sensitivity: settings.timeForDotToDash / 1000,
    }
  }

  translateTime(time) {
    let storage = JSON.parse(localStorage.getItem('vocal_codes_settings'))
    let shortPress = storage.dualInputShortPress ? storage.dualInputShortPress : 'Yes';
    let longPress = storage.dualInputLongPress ? storage.dualInputLongPress : 'No';
    let indicator = (time < this.state.tap_sensitivity) ? shortPress : longPress;
    console.log(this.state.tap_sensitivity)
    this.setState({
      message: this.state.morseMessage + indicator,
    })
  }

  handleSpeech() {
    let utterance = new SpeechSynthesisUtterance(this.state.message);
    window.speechSynthesis.speak(utterance);
  }

  render() {
    return (
      <div id='dualInput_container'>
        <h1 className='header'>Dual Input</h1>
        <div className='message_box main_message dual_message'>{this.state.message}</div>
        <div id='input_container'>
          <UserInput translateTime={this.translateTime.bind(this)}/>
          <div id='alternate_inputs'>
            <CustomDrawer />
            <Button id='green_button' variant="contained"
                          onClick={this.handleSpeech.bind(this)}><SpeakerPhone /></Button>
          </div>
        </div>
      </div>
    )
  }
}

const UserInput = (props) => {
  const { time: charTime, start: charStart, pause: charPause, reset: charReset } = useTimer({interval: 100});

  return (
    <Button variant="contained" id='morse_input'
         onTouchStart={() => {
          charStart();
         }}
         onTouchEnd={() => {
          charPause();
          props.translateTime(charTime / 10);
          charReset();
         }}
         ><TouchApp /></Button>
  )
}

export default DualInput