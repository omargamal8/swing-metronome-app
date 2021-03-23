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
            <View style={{display:"flex", flexDirection:"column", borderWidth:1 }}>
              <Image style={(this.state.active_subd_i===0)?styles.subdivs_active:styles.subdivs_unactive} onClick={(e=>{this.setState({active_subd_i:0});this.props.setActiveSubD(this.subdivs[this.state.active_subd_i])})} source={require('./assets/mmsub1.png')} alt=""></Image>
              <Image style={(this.state.active_subd_i===1)?styles.subdivs_active:styles.subdivs_unactive} onClick={(e=>{this.setState({active_subd_i:1});this.props.setActiveSubD(this.subdivs[this.state.active_subd_i])})} source={require('./assets/mmsub3.png')} alt=""></Image>
              <Image style={(this.state.active_subd_i===2)?styles.subdivs_active:styles.subdivs_unactive} onClick={(e=>{this.setState({active_subd_i:2});this.props.setActiveSubD(this.subdivs[this.state.active_subd_i])})} source={require('./assets/mmsub2.png')} alt=""></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  subdivs_active:{
      opacity: 1,
      flex:1,
      alignSelf:"center"
  },
  subdivs_unactive:{
    opacity: 0.3,
    flex:1,
    alignSelf:"center"
  }
});

export default SubdivisionPicker;