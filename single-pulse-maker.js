import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Animated, Image } from 'react-native';
import Main_beat_track from './assets/Main_beat_track.png'
import Main_beat_track_h from './assets/Main_beat_track_highlighted.png'
import playLogo from './assets/Play.png'
import stopLogo from './assets/Stop.png'

export class SinglePulseMaker extends Component{
    constructor(props){
        super(props)
        this.state = {pulse_time_left:0, 
                      playing:false, 
                      timer:undefined,
                      total_pulses:0,
                      animValue: 0 }
        this.id = Math.floor(Math.random()*100)
        console.log("SINGLE PULSE MAKER!!", this.id)
        this.handlePlayStopButton = this.handlePlayStopButton.bind(this)
        this.onPulse = this.onPulse.bind(this)
    }
    
    // console.log("==Single Pulse Maker==", pulse_time_left, playing, onPulseCallback)
    onPulse(){
        console.log(this.id, "Internal tick number:", this.state.total_pulses+1)
        this.setState({total_pulses:this.state.total_pulses+1})
        const new_timeout_left = this.props.onPulseCallback()
        clearInterval(this.state.timer)
        this.setState({timer:setInterval(this.onPulse, new_timeout_left)})
        Animated.timing(this.state.animValue,{
            toValue:1,
            duration:100
        }).start(()=>{console.log("ANIMATION ENDED====");Animated.timing(this.state.animValue, {toValue:0, duration:100}).start()})
        // setPulseTimeLeft(new_timeout_left)
        // setNextTickTimer(setTimeout(onPulse, new_timeout_left))

    }
        
    componentDidMount(){
        if(this.state.playing){
            this.setState({timer:setInterval(onPulse, 600)})
        }
        this.setState({animValue:new Animated.Value(0)})
    }


    

    handlePlayStopButton(){
        if(this.state.playing){
           clearInterval(this.state.timer) 
           this.props.stopCleanUp()
           this.setState({playing:false})
        }
        else{            
            this.setState({timer:setInterval(this.onPulse, 0), playing:true})
        }
    }
    render(){
        console.log("animated value", this.state.animValue)
        // Image.getSize(require("./assets/Main_beat_track.png"), (width, height)=>{console.log("hobs=======?", width, height)}, (error)=>{console.log("errored======", error)})
        return (
                <Animated.View style={{position:"relative"}}>
                <Image source={Main_beat_track} alt="main track" style={{height:200, width:200}} />
                <Animated.Image source={Main_beat_track_h} alt="main track" style={{height:200, width:200, position:"absolute", opacity: this.state.animValue}} />
                {(!this.state.playing)?
                <a style={{position:"absolute", left:"40%", top:"30%"}} onClick={this.handlePlayStopButton} ><img src={playLogo} alt="play"/></a>
                :
                <a style={{position:"absolute", left:"30%", top:"30%"}} onClick={this.handlePlayStopButton} ><img src={stopLogo} alt="stop"/></a>
                }
                </Animated.View>
        )
        
    }
}





//   export default SinglePulseMaker