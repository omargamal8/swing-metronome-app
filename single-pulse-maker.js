import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Main_beat_track from './assets/Main_beat_track.png'
import playLogo from './assets/Play.png'
import stopLogo from './assets/Stop.png'

export class SinglePulseMaker extends Component{
    constructor(props){
        super(props)
        this.state = {pulse_time_left:0, 
                      playing:false, 
                      timer:undefined,
                      total_pulses:0 }
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
        // setPulseTimeLeft(new_timeout_left)
        // setNextTickTimer(setTimeout(onPulse, new_timeout_left))

    }
        
    componentDidMount(){
        if(this.state.playing){
            this.setState({timer:setInterval(onPulse, 600)})
        }
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
        return (<>
                <View style={{position:"relative"}}>
                <img src={Main_beat_track} alt="main track" />
                {(!this.state.playing)?
                <a style={{position:"absolute", left:"40%", top:"30%"}} onClick={this.handlePlayStopButton} ><img src={playLogo} alt="play" /></a>
                :
                <a style={{position:"absolute", left:"30%", top:"30%"}} onClick={this.handlePlayStopButton} ><img src={stopLogo} alt="play" /></a>
                }
                </View>
                
        </>)
    }
}





//   export default SinglePulseMaker