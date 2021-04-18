import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Touchable, Pressable } from 'react-native';
// import { Pressable } from 'react-native-gesture-handler';
import {BeatTracker, SixteenthNote, EighthNote, QuarterNote} from './beat-tracker'

class SubdivisionPicker extends Component {
    constructor(props){
        super(props)
        this.subdivs= [new QuarterNote(4,4), new EighthNote(4,4), new SixteenthNote(4,4) ]
        this.state = {            
            active_subd_i: 0,
        }
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }
  

    render(){
      console.log("RENDER", this.state.active_subd_i, this.state.count)
        return (
            <View style={{display:"flex", flexDirection:"column", borderWidth:1 }}>
              <Pressable style={{...styles.subdiv, opacity:(this.state.active_subd_i===0)?1:0.3}} onPress={(e=>{console.log("PRESSED", 0); this.setState({active_subd_i:0});this.props.setActiveSubD(this.subdivs[0])})}><Image source={require('./assets/sd-quarter.png')} alt=""></Image></Pressable>
              <Pressable style={{...styles.subdiv, opacity:(this.state.active_subd_i===1)?1:0.3}} onPress={(e=>{console.log("PRESSED", 1); this.setState({active_subd_i:1});this.props.setActiveSubD(this.subdivs[1])})}><Image source={require('./assets/sd-eight.png')} alt=""></Image></Pressable>
              <Pressable style={{...styles.subdiv, opacity:(this.state.active_subd_i===2)?1:0.3}} onPress={(e=>{console.log("PRESSED", 2); this.setState({active_subd_i:2});this.props.setActiveSubD(this.subdivs[2])})}><Image source={require('./assets/sd-sixteen.png')} alt=""></Image></Pressable>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  subdiv:{
    alignSelf:"center",
  },
  subdivs_active:{
      opacity: 1,
      alignSelf:"center",
  },
  subdivs_unactive:{
    opacity: 0.3,
    alignSelf:"center",
  }
});

export default SubdivisionPicker;