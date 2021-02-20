import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BpmPicker from './bpm-picker'
import {SinglePulseMaker} from './single-pulse-maker'
import {BeatTracker, SixteenthNote, EighthNote, QuarterNote} from './beat-tracker'
import  SubdivisionPicker  from './subdivision-picker'
import {Audio} from 'expo-av'
import BpmTapper from "./bpm-tapper"
import SoundPicker from "./sound-picker"
import NavBar from "./nav-bar"
import { Sound } from 'expo-av/build/Audio';

class MetronomeApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            bpm: 200,
            active_subd: new QuarterNote(4,4),
            sound: undefined,
            sound2: undefined,
            sounds: [],
            dummy: 0,
        }
        this.tick = this.tick.bind(this)
        this.setBPM = this.setBPM.bind(this)
        this.stopPressed = this.stopPressed.bind(this)
        this.setActiveSubD = this.setActiveSubD.bind(this)
    }

    componentDidMount(){
          console.log("Initializing sound")
          Audio.Sound.createAsync(
            require('./assets/1.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound:sound, sounds: [...this.state.sounds, sound]})
          });              
          Audio.Sound.createAsync(
            require('./assets/1.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound2:sound, sounds:[...this.state.sounds, sound]})
          });              
          Audio.Sound.createAsync(
            require('./assets/1.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound:sound, sounds: [...this.state.sounds, sound]})
          });              
          Audio.Sound.createAsync(
            require('./assets/1.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound2:sound, sounds:[...this.state.sounds, sound]})
          });              
          console.log("DONE WITH THE SOUND BS")
    }

    componentWillUnmount(){
        console.log("CLEARING OUT SOUND OBJ")
        if(this.state.sound !== undefined)
          this.state.sound.sound.unloadAsync()        
    }
  
    setBPM(value){
        this.setState({bpm:value})
    }


    tick(){
        // console.log("TICK", this.state.sound, this.state.bpm)
        this.state.sounds[this.state.dummy].sound.playAsync().then(()=>{}).catch(err=>{console.log("errrorr===========")})
        this.state.active_subd.incrementTickCounter()
        this.setState({dummy:(this.state.dummy+1)%4})
        return (60 * this.state.active_subd.getNextTickInterval() / this.state.bpm) * 1000
    }

    stopPressed(){
      this.state.active_subd.clearCounters()
    }

    setActiveSubD(active_subd){
      this.state.active_subd.clearCounters()
      this.setState({active_subd})
    }
    render(){
        return (
            <View style={{display:"flex", flexDirection:"column", border:"1px solid red", height:"100vh",justifyContent:"space-evenly"}}>
              <View style={{marginTop:"5vh", marginLeft:"10vw", display:"flex", height:"17vh", flexDirection:"row", justifyContent:"space-between"}}>
                <BpmPicker bpm={this.state.bpm} setBPM={this.setBPM} ></BpmPicker>
                <SubdivisionPicker style={{border:"solid 1px black"}} setActiveSubD={this.setActiveSubD}></SubdivisionPicker>
              </View>
                  {/* {console.log("GLOBAL BPM", this.state.bpm)} */}
              <View style={{height:"32vh"}}>
                <SinglePulseMaker  pulse_time_left={0} playing={false} onPulseCallback={this.tick} stopCleanUp={this.stopPressed}></SinglePulseMaker>
              </View>
                {/* {console.log("GLOBAL BPM", this.state.bpm)} */}
              <View style={{display:"flex", height:"17vh", flexDirection:"row", justifyContent:"space-between", border:"1px solid black"}}>
                <View style={{display:"flex", flexDirection:"column", marginLeft:"10vw"}}>
                  <BpmTapper style={{border:"1px solid black"}}></BpmTapper>
                  <h1 style={{border:"solid 1px black", width:"20vw", justifyItems:"center", textAlign:"center"}}> 4/4 </h1>
                </View>
                
                <SoundPicker/>

                {/* <View style={{display:"flex", flexDirection:"column", marginRight:"10vw"}}>
                  <BpmTapper style={{border:"1px solid black"}}></BpmTapper>
                  <h1 style={{border:"solid 1px black", width:"20vw", justifyItems:"center"}}> 4/4 </h1>
                </View> */}

                {/* <BpmPicker bpm={this.state.bpm} setBPM={this.setBPM} ></BpmPicker> */}
                {/* <SubdivisionPicker style={{border:"solid 1px black"}} setActiveSubD={this.setActiveSubD}></SubdivisionPicker> */}
              </View>
              <View style={{height:"10vh", border:"1px solid black"}}>3</View>
              <NavBar style={{height:"10vh", border:"1px solid black"}}>4</NavBar>
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