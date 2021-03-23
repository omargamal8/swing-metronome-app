import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import ArrowUp from './assets/ArrowUp.png'
import ArrowDown from './assets/ArrowDown.png'

class BpmPicker extends Component{
  constructor(props){
    super(props)
    this.state = {bpm:this.props.bpm}
  }

  render(){
    return (<View style={{display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"space-evenly", borderWidth:1 }}>
              <Image style={{height:30, width:30 }} onClick={(e=>{console.log("inc bpm, props_bpm:", this.props.bpm, "state bpm", this.state.bpm); this.props.setBPM(this.props.bpm+1)})} source={require('./assets/ArrowUp.png')} alt="bpm ++"></Image>
              <Text style={{fontSize:36, alignSelf:"center"}}>{this.props.bpm}</Text>
              <Image style={{height:30, width:30 }} onClick={(e=>{console.log("dec bpm"); this.props.setBPM(this.props.bpm-1)})} source={ArrowDown} alt="bpm --"></Image>
           </View>)
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
  

  export default BpmPicker;