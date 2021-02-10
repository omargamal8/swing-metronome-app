import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BpmPicker from './bpm-picker'
import {SinglePulseMaker} from './single-pulse-maker'
import {BeatTracker, SixteenthNote, EighthNote, QuarterNote} from './beat-tracker'
import  SubdivisionPicker  from './subdivision-picker'
import {Audio} from 'expo-av'
class MetronomeApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            bpm:20,
            active_subd: new QuarterNote(4,4),
            sound: undefined,
            dummy: false,
        }
        this.tick = this.tick.bind(this)
        this.setBPM = this.setBPM.bind(this)
        this.stopPressed = this.stopPressed.bind(this)
        this.setActiveSubD = this.setActiveSubD.bind(this)
    }

    componentDidMount(){
          console.log("Initializing sound")
          Audio.Sound.createAsync(
            require('./assets/MetronomeUp.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound:sound})
          });              
          console.log("DONE WITH THE SOUND BS")
          //   const a = 
    }

    componentWillUnmount(){
        console.log("CLEARING OUT SOUND OBJ")
        if(this.state.sound !== undefined)
          this.state.sound.sound.unloadAsync()        
    }
  
    setBPM(value){
        this.setState({bpm:value})
    }

  // React.useEffect(()=>{
  //   console.log("BPM CHANGED", bpm)
  // }, [bpm])

    tick(){
        // console.log("TICK", this.state.sound, this.state.bpm)
        // console.log("tick")
        // console.log("SIXTEen getting next interaal", active_subd.getNextTickInterval())
        this.state.sound.sound.playAsync().then(()=>{}).catch(err=>{console.log("errrorr===========")})
        this.state.active_subd.incrementTickCounter()
        // console.log("NEXT", this.state.bpm * (this.state.active_subd.getNextTickInterval() / 60) * 1000)
        // console.log("NEXT INTERVAL FRACTION", this.state.active_subd.getNextTickInterval())
        return (60 * this.state.active_subd.getNextTickInterval() / this.state.bpm) * 1000
    }

  // React.useEffect((new_subd)=>{
  //   console.log("SUBD Changed")
  //   setSubd(new_subd)
  // }, [active_subd])
  
  // React.useEffect(()=>{

  // }, [])
    stopPressed(){
      this.state.active_subd.clearCounters()
    }

    setActiveSubD(active_subd){
      this.state.active_subd.clearCounters()
      this.setState({active_subd})
    }
    render(){
        console.log("ReRender")
        return (
            <View style={styles.container}>
            <BpmPicker bpm={this.state.bpm} setBPM={this.setBPM} ></BpmPicker>
            <SubdivisionPicker setActiveSubD={this.setActiveSubD}></SubdivisionPicker>
                {console.log("GLOBAL BPM", this.state.bpm)}
            <SinglePulseMaker pulse_time_left={0} playing={false} onPulseCallback={this.tick} stopCleanUp={this.stopPressed}></SinglePulseMaker>
                {console.log("GLOBAL BPM", this.state.bpm)}
            {/* <StatusBar style="auto" /> */}
            {/* <button onClick={()=>{ */}
                {/* setSubd(new EighthNote(4, 4)) */}
            {/* }}>change sbd</button> */}

            {/* <button onClick={()=>this.setState({dummy:!this.state.dummy})}>refresh state</button> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MetronomeApp;