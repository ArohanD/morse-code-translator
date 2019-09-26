import React from 'react'

const Predictions = (props) => {
  return (
    <div className='predictions'>
      <div className='message_box prediction' onClick={() => props.selectPrediction(props.predictions.predictionOne)}>{props.predictions.predictionOne}</div>
      <div className='message_box prediction' onClick={() => props.selectPrediction(props.predictions.predictionTwo)}>{props.predictions.predictionTwo}</div>
      <div className='message_box prediction' onClick={() => props.selectPrediction(props.predictions.predictionThree)}>{props.predictions.predictionThree}</div>
    </div>
  )
}

export default Predictions;