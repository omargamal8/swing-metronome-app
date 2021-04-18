import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import ArrowUp from './assets/ArrowUp.png'
import ArrowDown from './assets/ArrowDown.png'

class BpmPicker extends Component{
  constructor(props){
    super(props)
    this.state = {bpm:this.props.bpm, change_interval:undefined}
    this.modifyBPM = this.modifyBPM.bind(this)
    this.longPressBPM = this.longPressBPM.bind(this)
    this.onLongPressOut = this.onLongPressOut.bind(this)
  }

  modifyBPM(delta){
    this.props.setBPM(this.props.bpm+delta)
  }

  longPressBPM(delta){
    console.log("LONG PRESS")
    this.setState({change_interval:setInterval(()=>{this.modifyBPM(delta)},100)})
  }
  onLongPressOut(){
    console.log("LONG PRESS OUT")
    clearInterval(this.state.change_interval)
    this.setState({change_interval:undefined})
  }
  componentWillUnmount(){
    if(this.state.change_interval !== undefined)
      clearInterval(this.state.change_interval)
  }
  render(){
    return (<View style={{display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"space-evenly", borderWidth:1 }}>
              <Pressable onPress={(e=>{this.modifyBPM(1)})} onLongPress={()=>{this.longPressBPM(5)}} onPressOut={this.onLongPressOut}><Image style={{height:30, width:30 }} source={require('./assets/ArrowUp.png')} alt="bpm ++"></Image></Pressable>
              <Text style={{fontSize:36, alignSelf:"center"}}>{this.props.bpm}</Text>
              <Pressable onPress={(e=>{this.modifyBPM(-1)})} onLongPress={()=>{this.longPressBPM(-5)}} onPressOut={this.onLongPressOut}><Image style={{height:30, width:30 }} onClick={(e=>{console.log("dec bpm"); this.props.setBPM(this.props.bpm-1)})} source={ArrowDown} alt="bpm --"></Image></Pressable>
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