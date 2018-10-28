import React from 'react'
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export default class Accelerometer extends React.Component {

  static defaultProps = {
    multiplier: 1,
    useGravity: true,
    render: () => {}
  }

  state = {
    position: {
      x: null,
      y: null,
      z: null
    },
    rotation: {
      alpha: null,
      beta: null,
      gamma: null
    },
    landscape: false,

    html_processed: null,
  }

  componentDidMount () {
    //window.addEventListener('devicemotion', this.handleAcceleration)
    window.addEventListener('orientationchange', this.handleOrientation)

    fromEvent(window, 'orientationchange')
        .pipe(throttleTime(100))
        .subscribe((event) => {
            const { orientation } = window
            this.setState(() => ({ landscape: orientation === 90 || orientation === -90 }))});


    fromEvent(window, 'devicemotion')
        .pipe(throttleTime(100))
        .subscribe((event) => {
            const { landscape } = this.state
            const { useGravity, multiplier } = this.props
            const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
            const rotation = event.rotationRate || null
            const { x, y, z } = acceleration
        
            this.setState(() => ({
              rotation,
              position: {
                x: (landscape ? y : x) * multiplier,
                y: (landscape ? x : y) * multiplier,
                z: z * multiplier
              },
              html_processed: '<h1>TESTE</h1>'
            }))});
  }

  render () {
    const {render} = this.props
    const {position, rotation, html_processed} = this.state
    
    return (
      <div>
        {render({...position, ...rotation, html_processed})}
      </div>
    )
  } 
}