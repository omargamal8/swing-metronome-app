import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import BpmPicker from './bpm-picker'
import {SinglePulseMaker} from './single-pulse-maker'
import {BeatTracker, SixteenthNote, EighthNote, QuarterNote} from './beat-tracker'
import  SubdivisionPicker  from './subdivision-picker'
// import {Audio} from 'expo-av'
import BpmTapper from "./bpm-tapper"
import SoundPicker from "./sound-picker"
import NavBar from "./nav-bar"
import NoteCountPicker from "./note-count-picker"

import { Audio } from 'expo-av';
// import {}
class MetronomeApp extends Component {
    constructor(props){
        super(props)
        this.state = {
            bpm: 60,
            active_subd: new QuarterNote(4,4),
            down_sounds: [undefined, undefined, undefined],
            sound: undefined,
            sound2: undefined,
            sounds: [],
            dummy: 0,
            notes_levels: [2,2,2,2]
        }
        this.last = (new Date()).getTime()
        this.tick = this.tick.bind(this)
        this.setBPM = this.setBPM.bind(this)
        this.stopPressed = this.stopPressed.bind(this)
        this.setActiveSubD = this.setActiveSubD.bind(this)
        this.updateSwingValues = this.updateSwingValues.bind(this)
    }

    componentDidMount(){
          console.log("Initializing sound")
          // Import the react-native-sound module
          
          // Enable playback in silence mode
          // Sound.setCategory('Playback');
          
          // Load the sound file 'whoosh.mp3' from the app bundle
          // See notes below about preloading sounds within initialization code below.
        
          Audio.Sound.createAsync(
            require('./assets/ss-down-high.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            let sounds = this.state.down_sounds
            sounds[2]=sound
            this.setState({sound:sound, sounds:[...this.state.sounds, sound], down_sounds:sounds})
          });    
          Audio.Sound.createAsync(
            require('./assets/ss-down-medium.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            let sounds = this.state.down_sounds
            sounds[1]=sound
            this.setState({sound:sound, sounds:[...this.state.sounds, sound], down_sounds:sounds})});    
          Audio.Sound.createAsync(
            require('./assets/ss-down-low.wav')
          ).then((sound)=>{
            console.log("ACQUIRED Asset", sound)
            let sounds = this.state.down_sounds
            sounds[0]=sound
            this.setState({sound:sound, sounds:[...this.state.sounds, sound], down_sounds:sounds})});              
            
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
            this.setState({sound2:sound, sounds: [...this.state.sounds, sound]})
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
        // console.log("TICK", this.state.sound, this.state.bpm)
        const c = (new Date()).getTime()
        // console.log("INTERVAL:", c - this.last)
        this.last = c
        const tick = (new Date()).getTime()
        this.state.active_subd.incrementTickCounter()
        // the beat that was just ticked , was it down beat?
        const downbeat = this.state.active_subd.isDownBeat()
        const curr_level_index = ((this.state.active_subd.beat - 1) % this.state.notes_levels.length)
        console.log("DOWNBEAT?", downbeat, "CURR LEVEL INDEX", curr_level_index)
        const sound = (downbeat)? this.state.down_sounds[this.state.notes_levels[curr_level_index]] : this.state.sound2
        sound.sound.replayAsync().then(()=>{}).catch(err=>{console.log("errrorr===========")})
      
        // this.setState({dummy:(this.state.dummy+1)%4})
        // console.log(this.state.active_subd.getToString(), "NEXT TIMEOUT",
        // (60 * this.state.active_subd.getNextTickInterval(this.state.displacments) / this.state.bpm) * 1000)
        // console.log("NEXT TICK INTERVAL", this.state.active_subd.getNextTickInterval(this.state.displacments))
        return (60 * this.state.active_subd.getNextTickInterval(this.state.displacments) / this.state.bpm) * 1000
    }

    stopPressed(){
      this.state.active_subd.clearCounters()
    }

    setActiveSubD(active_subd){
      this.state.active_subd.clearCounters()
      this.setState({active_subd})
    }

    updateSwingValues(displacments){
      this.state.active_subd.updateSwingRatios(displacments.map(d=>d/(2*Math.PI)))
    }

    handleAccentPress(note_index){
      let levels = JSON.parse(JSON.stringify(this.state.notes_levels))
      levels[note_index] = (levels[note_index]+1)%3
      this.setState({notes_levels:levels})
    }

    render(){
        return (
          <View style={{display:"flex", flexDirection:"column", flex:1,justifyContent:"space-evenly"}}>
              <View style={{display:"flex", flex:1, flexDirection:"row", justifyContent:"space-between"}}>
                <BpmPicker bpm={this.state.bpm} setBPM={this.setBPM} style={{flex:1}}></BpmPicker>
                <SubdivisionPicker style={{flex:1}} setActiveSubD={this.setActiveSubD}></SubdivisionPicker>
              </View>
              <View style={{flex:1.6, borderWidth:1, borderColor:'red'}}>
                <SinglePulseMaker  pulse_time_left={0} playing={false} onPulseCallback={this.tick} stopCleanUp={this.stopPressed} updateSwingValues={this.updateSwingValues}></SinglePulseMaker>
              </View>
              <View style={{display:"flex", flex:1, flexDirection:"row", justifyContent:"space-between", borderWidth:1}}>
                <View style={{display:"flex", flexDirection:"column"}}>
                  <BpmTapper style={{flex:1}}></BpmTapper>
                  <Text style={{flex:1, fontSize:32}}>4/4</Text>
                </View>
                {/* <NoteCountPicker style={{flex:1}}>  </NoteCountPicker> */}
                <SoundPicker style={{flex:1}}/>
              </View>
              <View style={{flex:0.6, height:'100%', width:'80%', alignSelf:'center', backgroundColor:'darkgrey'}}>
                  <View style={{alignSelf:'center', display:'flex', flexDirection:'row', justifyContent:'center', height:'100%', width:'80%',backgroundColor:'darkgrey'}}>
                      {this.state.notes_levels.map((v,i)=><Pressable onPress={()=>{this.handleAccentPress(i)}} style={{flex:1, backgroundColor:'#585858', height:this.state.notes_levels[i]*100/3+(100/3)+"%", alignSelf:'flex-end', borderWidth:1, borderColor:'white'}}><View></View></Pressable>)}
                  </View>
              </View>
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