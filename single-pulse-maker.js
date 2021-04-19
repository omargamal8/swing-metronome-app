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
                      circle_r: 0,
                      sliders_pos: this.createSliderPositions(this.props.subd_count),
                      displacments : [...Array(this.props.subd_count)].map(e=>0),
                      current_i : 0 ,
                      animValues: [...Array(this.props.subd_count)].map(e=>0)
                     }
        this.id = Math.floor(Math.random()*100)
        this.last = (new Date().getTime())
        this.handlePlayStopButton = this.handlePlayStopButton.bind(this)
        this.onPulse = this.onPulse.bind(this)
        this.setXY = this.setXY.bind(this)
        
    }
    
    createSliderPositions(subd_count){
        const segment = 2 * Math.PI / subd_count
        let sliders_pos = [0]
        sliders_pos = [...Array(subd_count-1)].reduce((p, c, i)=>{
            return p.concat([segment+p[i]])
        },[0])
        sliders_pos = sliders_pos.map(pos=>{
            pos = pos - (Math.PI/2)
            return (pos < 0)? 2*Math.PI + pos : pos 
        })

        return sliders_pos
    }
    // console.log("==Single Pulse Maker==", pulse_time_left, playing, onPulseCallback)
    async onPulse(){
        let c = (new Date()).getTime()
        // console.log("interval:", (c-this.last) )
        this.last = c
        // console.log(this.id, "Internal tick number:", this.state.total_pulses+1)
        // this.setState({total_pulses:this.state.total_pulses+1})
        const new_timeout_left = this.props.onPulseCallback()
        // console.log("timeout in ", new_timeout_left)
        console.log("TIMEOUT LEFT", new_timeout_left)
        // clearInterval(this.state.timer)
        this.setState({timer:setTimeout(this.onPulse, c + new_timeout_left - ((new Date()).getTime()))})
        // Animated.timing(this.state.animValue,{
        //     toValue:1,
        //     duration:50,
        //     useNativeDriver:true
        // }).start(()=>{Animated.timing(this.state.animValue, {toValue:0, duration:50, useNativeDriver:true}).start()})
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

    componentDidUpdate(prevProps, prevState){
        console.log("COMPONENT DID UPDATE?", prevProps.subd_count, this.props.subd_count)
        if(prevProps.subd_count !== this.props.subd_count)
            this.setState({sliders_pos:this.createSliderPositions(this.props.subd_count),
                            displacments: [...Array(this.props.subd_count)].map(e=>0),
                            animValues: [...Array(this.props.subd_count)].map(e=>0)})
    }

    shouldComponentUpdate(nextProps, nextState){
        return true
        // let {timer, ...cs} = this.state
        // if(JSON.stringify(nextProps) === JSON.stringify(this.props) && JSON.stringify(ns) === JSON.stringify(cs)){
            console.log("SHOULD UPDATE?", this.state.sliders_pos, nextState.sliders_pos)
        if(this.state.playing === nextState.playing && this.state.sliders_pos === nextState.sliders_pos && this.state.displacments === nextState.displacments && this.state.circle_r === nextState.circle_r){
            return false
        }
        else
            return true
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
        //    clearInterval(this.state.timer) 
           clearTimeout(this.state.timer)
           this.props.stopCleanUp()
           this.setState({playing:false})
        }
        else{            
            // const new_timeout_left = this.props.onPulseCallback()
            // this.setState({timer:setInterval(this.onPulse, new_timeout_left), playing:true})
            this.setState({timer:setTimeout(this.onPulse, 0), playing:true})
        }
    }
    setXY(x, y){
        this.setState({xx:x, yy:y})
    }
    updateSliderPos(i, v){
        const [new_pos, disp] = v
        let pos = this.state.sliders_pos
        pos[i]=new_pos
        let d = this.state.displacments
        d[i] = disp
        this.setState({displacments:d, sliders_pos:pos})
        this.props.updateSwingValues(d)
    }
    render(){
        // console.log("RERENDER", this.state.xx, this.state.yy)
        console.log("=======SINGLE PULSE MAKER RERENDER====", this.props.subd_count, this.state.sliders_pos)
        // console.log("animated value", this.state.animValue)
        // Image.getSize(require("./assets/Main_beat_track.png"), (width, height)=>{console.log("hobs=======?", width, height)}, (error)=>{console.log("errored======", error)})
        // console.log("PARENT CIRCLE_R", this.state.circle_r)
        return (this.props.subd_count === this.state.sliders_pos.length)?(
                <Animated.View style={{borderWidth: 1, display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Image onLayout={event => {
                const layout = event.nativeEvent.layout;
                // console.log('Circ height:', layout.height);
                // console.log('Circ width:', layout.width);
                // console.log('Circ x:', layout.x);
                console.log('Circ y:', layout.y);
                console.log('circ_positions', this.state.sliders_pos, this.state.sliders_pos.filter((v,i)=>i!==0))
                this.setState({circle_r:layout.height/2})
                }}
                source={Main_beat_track} alt="main track" style={{height:250, width:250 }} />
                <Animated.Image source={Main_beat_track_h} alt="main track" style={{height:250, width:250, position:"absolute", opacity: this.state.animValue}} />
                {(!this.state.playing)?
                <TouchableOpacity onPress={this.handlePlayStopButton}  style={{position:"absolute"}}><Image style={{width:50, height:50}} source={playLogo} alt="play"/></TouchableOpacity>
                : 
                <TouchableOpacity onPress={this.handlePlayStopButton}  style={{position:"absolute"}}><Image style={{width:50, height:50}} source={stopLogo} alt="stop"/></TouchableOpacity>
                }
                {[...Array(this.props.subd_count)].map((_,i)=>
                    <CircularSlider style={{position:"absolute"}} circle_r={this.state.circle_r} starting_theta={this.state.sliders_pos[i]} theta_range={[this.state.sliders_pos[Math.max(i-1,0)], this.state.sliders_pos[(i+1)%this.state.sliders_pos.length]]} update_pos={(v)=>this.updateSliderPos(i, v)} ID={i}></CircularSlider>
                )}
                </Animated.View>
        ):
        (<Text>Error</Text>)
        
    }
}





//   export default SinglePulseMaker