import React from 'react'
import CustomDrawer from './Drawer.jsx'

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

let keyArray = Object.keys(morseLib)
let valueArray = Object.values(morseLib)

const Dictionary = () => {
  return (
    <div>
      <h1 className='header'>Dictionary</h1>
      <div className={'dictionary_entry_container'}>
        {
          keyArray.map((code, index) => {
            return (
              <div key={morseLib[code]} className={'dictionary_entry'}>
                <span className={'dictionary_text'}>{morseLib[code]}</span>
                <span className={'dictionary_text'}>{code}</span>
              </div>
            )
          })
        }
      </div>
      <div className={'fixed_menu'}>
        <CustomDrawer />
      </div>
    </div>
  )
}

export { Dictionary, morseLib }