import React from 'react'

const Predictions = (props) => {
  return (
    <div className='predictions'>
      <div className='message_box prediction'>{props.predictions.predictionOne}</div>
      <div className='message_box prediction'>{props.predictions.predictionTwo}</div>
      <div className='message_box prediction'>{props.predictions.predictionThree}</div>
    </div>
  )
}

export default Predictions;