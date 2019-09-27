import React from 'react'
import { Slider, TextField } from '@material-ui/core';
import CustomDrawer from './Drawer.jsx'

const Settings = (props) => {
  return(
    <div id='settings_container'>
      <h1 id='settings_h1'>Settings</h1>
      <div id='settings_forms'>
        <h3>Time between words (milliseconds)</h3>
        <Slider className={'settings_slider'}
          defaultValue={800}
          valueLabelDisplay="auto"
          step={100}
          marks
          min={500}
          max={2000}
        />
        <h3>Time between spaces (milliseconds)</h3>
        <Slider className={'settings_slider'}
          defaultValue={2000}
          valueLabelDisplay="auto"
          step={500}
          marks
          min={100}
          max={6000}
        />
        <h3>Time for dot to become dash (ms)</h3>
        <Slider className={'settings_slider'}
          defaultValue={200}
          valueLabelDisplay="auto"
          step={100}
          marks
          min={100}
          max={2000}
        />
        <h3>Dual Input Fields</h3>
        <div className={'settings_input_equalizer'}>
          <TextField
            className={'input_field_label'}
            label="Short Press"
            value={'Yes'}
            margin="normal"
            variant="outlined"
          />
          <TextField
            className={'input_field_label'}
            label="Long Press"
            value={'No'}
            margin="normal"
            variant="outlined"
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