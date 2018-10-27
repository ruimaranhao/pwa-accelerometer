import React from 'react'

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
    landscape: false
  }

  componentDidMount () {
    window.addEventListener('devicemotion', this.handleAcceleration)
    window.addEventListener('orientationchange', this.handleOrientation)
  }

  componentWillUnmount () {
    window.removeEventListener('devicemotion', this.handleAcceleration)
    window.removeEventListener('orientationchange', this.handleOrientation)
  }

  handleOrientation = (event) => {
    const { orientation } = window
    this.setState(() => ({ landscape: orientation === 90 || orientation === -90 }))
  }

  handleAcceleration = (event) => {
    const { landscape } = this.state
    const { useGravity, multiplier } = this.props
    const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
    const rotation = event.rotationRate || null
    const { x, y, z } = acceleration

    this.setState(() => ({
      rotation,
      x: (landscape ? y : x) * multiplier,
      y: (landscape ? x : y) * multiplier,
      z: z * multiplier
    }))
  }

  render () {
    const {render} = this.props
    const {position, rotation} = this.state
    
    return (
      <div>
        {render({...position, ...rotation})}
      </div>
    )
  } 
}
