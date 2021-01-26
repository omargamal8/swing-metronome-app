import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function BpmPicker({bpm, setBPM}){
    return (<View>
            <Text>{bpm}</Text>
            <View>
              <Button title="+" onPress={(e=>{console.log("inc bpm");/*bpm.current = bpm.current+1;*/ setBPM((prev_bpm)=>prev_bpm+1)})}></Button>
              <Button title="-" onPress={(e=>{/*bpm.current = bpm.current-1;*/ setBPM((prev_bpm)=>prev_bpm-1)})}></Button>
            </View>
           </View>)
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