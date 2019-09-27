import React from 'react'
import {Card, CardContent, Button} from '@material-ui/core'
import CustomDrawer from './Drawer.jsx'

const instructions = [
  {
    step: 1,
    text: 'Vocal Codes lets you communicate using morse code.'
  },
  {
    step: 2,
    text: 'You can type code in intervals. A dot is a short press, a dash a long press.'
  },
  {
    step: 3,
    text: 'After a short amount of time, your current input will be rendered as a letter. Wait a bit longer and a space will be added to your input. You can configure these timings in the settings panel.'
  },
  {
    step: 4,
    text: 'A dictionary is also included to help you get started, enjoy!'
  },
]

class Guide extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      instructionIndex: 0,
    };
  }

  advanceCard() {
    if(this.state.instructionIndex < instructions.length - 1){
      this.setState({instructionIndex: this.state.instructionIndex + 1})
    }
  }
  
  previousCard() {
    if(this.state.instructionIndex > 0){
      this.setState({instructionIndex: this.state.instructionIndex - 1})
    }
  }

  render() {
    return (
      <div id='guide_container'>
          <Card className={'guide_card'}>
            <CardContent className={'guide_card_content'}>{instructions[this.state.instructionIndex].text}</CardContent>
          </Card>
          <div id='guide_button_holder'>
            <Button variant='contained' 
                    className={ this.state.instructionIndex === 0 ? 'unclickable_button' : 'home_nav_button'}
                    onClick={this.previousCard.bind(this)}>Previous</Button>
            <Button variant='contained' 
                    className={ this.state.instructionIndex === instructions.length - 1 ? 'unclickable_button' : 'home_nav_button' }
                    onClick={this.advanceCard.bind(this)}>Next</Button>
          </div>
          <div className={'fixed_menu'}>
            <CustomDrawer />
          </div>
      </div>
    )
  }
}

export {Guide}

