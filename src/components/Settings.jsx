import React from 'react'
import { Slider, TextField } from '@material-ui/core';
import CustomDrawer from './Drawer.jsx'


const Settings = (props) => {
  
  const saveSettings = (value, property) => {
    const store = JSON.parse(localStorage.getItem('vocal_codes_settings'));
    store[property] = value;
    localStorage.setItem('vocal_codes_settings', JSON.stringify(store));
    location.reload();
  }
  
  const saveTextChange = (event, property) => {
    const text = event.target.value;
    const store = JSON.parse(localStorage.getItem('vocal_codes_settings'));
    store[property] = text;
    localStorage.setItem('vocal_codes_settings', JSON.stringify(store))
  }
  const store = JSON.parse(localStorage.getItem('vocal_codes_settings'));

  return(
    <div id='settings_container'>
      <h1 id='settings_h1'>Settings</h1>
      <div id='settings_forms'>
        <h3>Time given to input letters (milliseconds, must be less than time between spaces)</h3>
        <Slider className={'settings_slider'}
          defaultValue={store.timeBetweenWords}
          valueLabelDisplay="auto"
          step={100}
          marks
          min={100}
          max={2000}
          onChangeCommitted={(e, value) => saveSettings(value, 'timeBetweenWords')}
        />
        <h3>Time between spaces (milliseconds)</h3>
        <Slider className={'settings_slider'}
          defaultValue={store.timeBetweenSpaces}
          valueLabelDisplay="auto"
          step={500}
          marks
          min={100}
          max={6000}
          onChangeCommitted={(e, value) => saveSettings(value, 'timeBetweenSpaces')}
        />
        <h3>Time for dot to become dash (ms, also used for dual input change)</h3>
        <Slider className={'settings_slider'}
          defaultValue={store.timeForDotToDash}
          valueLabelDisplay="auto"
          step={100}
          marks
          min={100}
          max={2000}
          onChangeCommitted={(e, value) => saveSettings(value, 'timeForDotToDash')}
        />
        <h3>Dual Input Fields</h3>
        <div className={'settings_input_equalizer'}>
          <div className={'dualInputModifierContainer'}>
            <TextField
              className={'input_field_label'}
              label="Short Press"
              //value={store.dualInputShortPress}
              margin="normal"
              variant="outlined"
              onChange={(e) => saveTextChange(e, 'dualInputShortPress')}
            />
          </div>
          <TextField
            className={'input_field_label'}
            label="Long Press"
            //value={store.dualInputLongPress}
            margin="normal"
            variant="outlined"
            onChange={(e) => saveTextChange(e, 'dualInputLongPress')}
          />

        </div>
      </div>
      <div className={'fixed_menu'}>
        <CustomDrawer />
      </div>
    </div>
  )
}


export default Settings;