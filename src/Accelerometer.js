import React from 'react'
import {fromEvent} from 'rxjs';
import {throttleTime} from 'rxjs/operators';

export default class Accelerometer extends React.Component {

  static defaultProps = {
    multiplier: 1,
    useGravity: true,
    render: () => {}
  }

  state = {
    position: {
      x: null,
      x1: null,
      x2: null,
      y: null,
      y1: null,
      y2: null,
      z: null
    },
    rotation: {
      alpha: null,
      beta: null,
      gamma: null
    },
    landscape: false
  }

  componentDidMount () {
    fromEvent(window, 'devicemotion').pipe(
      throttleTime(500)
    ).subscribe((event) => {
      const { landscape } = this.state
      const { useGravity, multiplier } = this.props
      const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
      const rotation = event.rotationRate || null
      const { x, y, z } = acceleration
  
      this.setState(() => ({
        rotation: {
          alpha: rotation.alpha,
          beta: rotation.beta,
          gamma: rotation.gamma
        },
        position: {
          x: (landscape ? y : x) * multiplier,
          y: (landscape ? x : y) * multiplier,
          z: z * multiplier
        }
      }))
    })

    fromEvent(window,'orientationchange').pipe(
      throttleTime(500)
    ).subscribe(() => {
      const { orientation } = window
      this.setState(() => ({ landscape: orientation === 90 || orientation === -90 }))
    })
  }

  render () {
    const {render} = this.props
    const {position, rotation} = this.state
    
    console.log(rotation)

    return (
      <div>
        {render({...position, ...rotation})}
      </div>
    )
  } 
}
