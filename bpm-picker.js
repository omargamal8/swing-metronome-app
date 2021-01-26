import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import ArrowUp from './assets/ArrowUp.png'
import ArrowDown from './assets/ArrowDown.png'

class BpmPicker extends Component{
  constructor(props){
    super(props)
    this.state = {bpm:this.props.bpm}
  }

  render(){
    return (<View style={{position:"relative", top:"-10%", left:"-10%"}}>
              <a style={{marginBottom:"20px"}} onPress={(e=>{console.log("inc bpm");/*bpm.current = bpm.current+1;*/ this.setState({bpm:this.state.bpm+1})})}><img src={ArrowUp} alt="bpm ++"></img></a>
              <Text style={{fontSize:"36px"}}>{this.state.bpm}</Text>
              <a style={{marginTop:"20px"}} onPress={(e=>{console.log("dec bpm");/*bpm.current = bpm.current+1;*/ this.setState({bpm:this.state.bpm-1})})}><img src={ArrowDown} alt="bpm --"></img></a>
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