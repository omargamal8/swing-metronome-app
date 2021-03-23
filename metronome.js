import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BpmPicker from './bpm-picker'
import {SinglePulseMaker} from './single-pulse-maker'
import {BeatTracker, SixteenthNote, EighthNote, QuarterNote} from './beat-tracker'
import  SubdivisionPicker  from './subdivision-picker'
// import {Audio} from 'expo-av'
import BpmTapper from "./bpm-tapper"
import SoundPicker from "./sound-picker"
import NavBar from "./nav-bar"
import SoundPlayer from 'react-native-sound-player'
// var Sound = require('react-native-sound');
import { Audio } from 'expo-av';
// import {}
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
        this.last = (new Date()).getTime()
        this.tick = this.tick.bind(this)
        this.setBPM = this.setBPM.bind(this)
        this.stopPressed = this.stopPressed.bind(this)
        this.setActiveSubD = this.setActiveSubD.bind(this)
    }

    componentDidMount(){
          console.log("Initializing sound")
          // Import the react-native-sound module
          
          // Enable playback in silence mode
          // Sound.setCategory('Playback');
          
          // Load the sound file 'whoosh.mp3' from the app bundle
          // See notes below about preloading sounds within initialization code below.
          // var whoosh = new Sound('./assets/1.wav', Sound.MAIN_BUNDLE, (error) => {
            // if (error) {
              // console.log('failed to load the sound', error);
              // return;
            // }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
          
          // });
          // this.setState({sound})          
        
          Audio.Sound.createAsync(
            require('./assets/2.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound:sound, sounds: [...this.state.sounds, sound]})
          });              
          Audio.Sound.createAsync(
            require('./assets/2.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound2:sound, sounds:[...this.state.sounds, sound]})
          });              
          Audio.Sound.createAsync(
            require('./assets/2.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            this.setState({sound:sound, sounds: [...this.state.sounds, sound]})
          });              
          Audio.Sound.createAsync(
            require('./assets/2.wav')
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
        if(this.state.sound !== undefined)
          this.state.sounds[0].sound.unloadAsync()       
    }
  
    setBPM(value){
        this.setState({bpm:value})
    }


    tick(){
        console.log("TICK", this.state.sound, this.state.bpm)
        const c = (new Date()).getTime()
        // console.log("INTERVAL:", c - this.last)
        this.last = c
        const tick = (new Date()).getTime()
        this.state.sounds[this.state.dummy].sound.playAsync().then(()=>{console.log("PLAYED IN:", (new Date()).getTime() - tick)}).catch(err=>{console.log("errrorr===========")})
          // Play the sound with an onEnd callback
        // whoosh.play((success) => {
        //   if (success) {
        //     console.log("PLAYED IN:", (new Date()).getTime() - tick);
        //   } else {
        //     console.log('playback failed due to audio decoding errors');
        //   }
        // });
      
        this.state.active_subd.incrementTickCounter()
        // this.setState({dummy:(this.state.dummy+1)%4})
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
          <View style={{display:"flex", flexDirection:"column", flex:1,justifyContent:"space-evenly"}}>
              <View style={{display:"flex", flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                <BpmPicker bpm={this.state.bpm} setBPM={this.setBPM} style={{flex:1}}></BpmPicker>
                <SubdivisionPicker style={{flex:1}} setActiveSubD={this.setActiveSubD}></SubdivisionPicker>
              </View>
              <View style={{flex:1.8}}>
                <SinglePulseMaker  pulse_time_left={0} playing={false} onPulseCallback={this.tick} stopCleanUp={this.stopPressed}></SinglePulseMaker>
              </View>
              <View style={{display:"flex", flex:1, flexDirection:"row", justifyContent:"space-between", borderWidth:1}}>
                <View style={{display:"flex", flexDirection:"column"}}>
                  <BpmTapper style={{flex:1}}></BpmTapper>
                  <Text style={{flex:1, textAlign:"center", fontSize:36}}> 4/4 </Text>
                </View>
                <SoundPicker style={{flex:1}}/>
              </View>
              <View style={{flex:1}}></View>
              <NavBar style={{flex:1}}></NavBar>
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