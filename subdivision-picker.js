import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {BeatTracker, SixteenthNote, EighthNote, QuarterNote} from './beat-tracker'
import mmsub1 from './assets/mmsub1.png'
import mmsub2 from './assets/mmsub2.png'
import mmsub3 from './assets/mmsub3.png'

class SubdivisionPicker extends Component {
    constructor(props){
        super(props)
        this.subdivs= [new QuarterNote(4,4), new EighthNote(4,4), new SixteenthNote(4,4)]
        this.state = {            
            active_subd_i: 0
        }
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }
  

    render(){
        return (
            <View style={{position:"relative", left:"22%", top:"-27%"}}>
              <Image style={(this.state.active_subd_i===0)?styles.subdivs_active:styles.subdivs_unactive} onClick={(e=>{this.setState({active_subd_i:0});this.props.setActiveSubD(this.subdivs[this.state.active_subd_i])})} source={require('./assets/mmsub1.png')} alt=""></Image>
              <Image style={(this.state.active_subd_i===1)?styles.subdivs_active:styles.subdivs_unactive} onClick={(e=>{this.setState({active_subd_i:1});this.props.setActiveSubD(this.subdivs[this.state.active_subd_i])})} source={require('./assets/mmsub3.png')} alt=""></Image>
              <Image style={(this.state.active_subd_i===2)?styles.subdivs_active:styles.subdivs_unactive} onClick={(e=>{this.setState({active_subd_i:2});this.props.setActiveSubD(this.subdivs[this.state.active_subd_i])})} source={require('./assets/mmsub2.png')} alt=""></Image>
              {/* <Text style={{fontSize:"36px"}}>{this.props.bpm}</Text> */}
              {/* <Image style={{marginTop:"20px", height:"40px", width:"40px"}} onClick={(e=>{console.log("dec bpm"); this.props.setBPM(this.props.bpm-1)})} source={ArrowDown} alt="bpm --"></Image> */}
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
  subdivs_active:{
      height: "50px",
      width: "50px", 
      opacity: "1"
  },
  subdivs_unactive:{
    height: "50px",
    width: "50px", 
    opacity: "0.3"
  }
});

export default SubdivisionPicker;