import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Animated, Image, TouchableOpacity } from 'react-native';
import Main_beat_track from './assets/Main_beat_track.png'
import Main_beat_track_h from './assets/Main_beat_track_highlighted.png'
import playLogo from './assets/Play.png'
import stopLogo from './assets/Stop.png'
import CircularSlider from "./circular-slider"
var accurateInterval = require('accurate-interval');

export class SinglePulseMaker extends Component{
    constructor(props){
        super(props)
        this.state = {pulse_time_left:0, 
                      playing:false, 
                      timer:undefined,
                      total_pulses:0,
                      animValue: 0,
                      circle_r: 0 }
        this.id = Math.floor(Math.random()*100)
        this.last = (new Date().getTime())
        console.log("SINGLE PULSE MAKER!!", this.id)
        this.handlePlayStopButton = this.handlePlayStopButton.bind(this)
        this.onPulse = this.onPulse.bind(this)
        this.setXY = this.setXY.bind(this)
        
    }
    
    // console.log("==Single Pulse Maker==", pulse_time_left, playing, onPulseCallback)
    async onPulse(){
        let c = (new Date()).getTime()
        // console.log("interval:", (c-this.last) )
        this.last = c
        console.log(this.id, "Internal tick number:", this.state.total_pulses+1)
        // this.setState({total_pulses:this.state.total_pulses+1})
        const new_timeout_left = this.props.onPulseCallback()
        // console.log("TIMEOUT LEFT", new_timeout_left)
        // clearInterval(this.state.timer)
        this.setState({timer:setTimeout(this.onPulse, c + new_timeout_left - ((new Date()).getTime()))})
        Animated.timing(this.state.animValue,{
            toValue:1,
            duration:50,
            useNativeDriver:true
        }).start(()=>{Animated.timing(this.state.animValue, {toValue:0, duration:50, useNativeDriver:true}).start()})
        // setPulseTimeLeft(new_timeout_left)
        // setNextTickTimer(setTimeout(onPulse, new_timeout_left))

    }
        
    setExactInterval(callback, duration, resolution) {
        let start = (new Date()).getTime();
        let start_i = (new Date()).getTime();
        const timeout = setInterval(function(){
            const c = (new Date()).getTime()
            console.log("small interval",c - start_i)
            start_i = c
            if (c - start > duration) {
                // console.log("INTERVAL", c- start)
                callback();
                start = c;
                // clearInterval(timeout);
            }
        }, resolution);
    
        return timeout;
    };

    componentDidMount(){
        if(this.state.playing){
            this.setState({timer:setExactInterval(onPulse, 600, 60)})
        }
        this.setState({animValue:new Animated.Value(0)})
        // let last = (new Date()).getTime();
        // var foo = accurateInterval(function(scheduledTime) {
        //     const c = (new Date()).getTime()
        //     console.log("Interval", c - last)
        //     last = c
        //     // console.log('Actual time: ' + Date.now() + ' -- Scheduled time: ' + scheduledTime);
        // }, 200, {aligned: true, immediate: true});
        
        // setTimeout(()=>{foo.clear()}, 10000)
    }

    componentWillUnmount(){
        if(this.state.timer !== undefined)
            clearTimeout(this.state.timer)
    }
    accurateInterval(func, interval, opts) {

        if (!opts) opts = {};
    
        var clear, nextAt, timeout, wrapper, now;
    
        now = new Date().getTime();
    
        nextAt = now;
    
        if (opts.aligned) {
            nextAt += interval - (now % interval);
        }
        if (!opts.immediate) {
            nextAt += interval;
        }
    
        timeout = null;
    
        wrapper = function wrapper() {
            func(scheduledTime);
            var scheduledTime = nextAt;
            nextAt += interval;
            timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        };
    
        clear = function clear() {
            return clearTimeout(timeout);
        };
    
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    
        return {
            clear: clear
        };
    
      };
    

    handlePlayStopButton(){
        if(this.state.playing){
           clearInterval(this.state.timer) 
           this.props.stopCleanUp()
           this.setState({playing:false})
        }
        else{            
            // const new_timeout_left = this.props.onPulseCallback()
            this.setState({timer:setTimeout(this.onPulse, 0), playing:true})
        }
    }
    setXY(x, y){
        this.setState({xx:x, yy:y})
    }
    render(){
        // console.log("RERENDER", this.state.xx, this.state.yy)
        // console.log("animated value", this.state.animValue)
        // Image.getSize(require("./assets/Main_beat_track.png"), (width, height)=>{console.log("hobs=======?", width, height)}, (error)=>{console.log("errored======", error)})
        // console.log("PARENT CIRCLE_R", this.state.circle_r)
        return (
                <Animated.View style={{borderWidth: 1, display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Image onLayout={event => {
                const layout = event.nativeEvent.layout;
                // console.log('Circ height:', layout.height);
                // console.log('Circ width:', layout.width);
                // console.log('Circ x:', layout.x);
                // console.log('Circ y:', layout.y);
                this.setState({circle_r:layout.height/2})
                }}
                source={Main_beat_track} alt="main track" style={{height:250, width:250 }} />
                <Animated.Image source={Main_beat_track_h} alt="main track" style={{height:250, width:250, position:"absolute", opacity: this.state.animValue}} />
                {(!this.state.playing)?
                <TouchableOpacity onPress={this.handlePlayStopButton}  style={{position:"absolute"}}><Image style={{height:50, width:50}} source={playLogo} alt="play"/></TouchableOpacity>
                : 
                <TouchableOpacity onPress={this.handlePlayStopButton}  style={{position:"absolute"}}><Image style={{height:50, width:50}} source={stopLogo} alt="stop"/></TouchableOpacity>
                }
                <CircularSlider style={{position:"absolute"}} circle_r={this.state.circle_r} starting_theta={-Math.PI/2}></CircularSlider>
                <CircularSlider style={{position:"absolute"}} circle_r={this.state.circle_r} starting_theta={0}></CircularSlider>
                <CircularSlider style={{position:"absolute"}} circle_r={this.state.circle_r} starting_theta={Math.PI/2}></CircularSlider>
                <CircularSlider style={{position:"absolute"}} circle_r={this.state.circle_r} starting_theta={Math.PI}></CircularSlider>
                </Animated.View>
        )
        
    }
}





//   export default SinglePulseMaker