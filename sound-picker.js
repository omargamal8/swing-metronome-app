import React, {Component} from 'react';
import { StyleSheet, Button,  Text, View, Image } from 'react-native';
class SoundPicker extends Component {
    constructor(props){
        super(props)
        this.state = {            
            active_subd_i: 0
        }
    }


    render(){
        return (
            <View style={{display:"flex", flexDirection:"column", border:"solid 1px black", width:"20vw", marginRight:"10vw" }}>
              <View style={{display:"flex", flexDirection:"row"}}>
                <Image style={{height:10, width:10, alignSelf:"center", marginRight:"2px"}} source={require("./assets/radio_button_selected.jpg")}></Image>  
                <p1>BEAT</p1>
              </View>
              <View style={{display:"flex", flexDirection:"row"}}>
                <Image style={{height:10, width:10, alignSelf:"center", marginRight:"2px"}} source={require("./assets/radio_button.jpg")}></Image>  
                <p1>SOUND</p1>
              </View>
              <View style={{display:"grid", gridTemplateColumns:"0.5fr 0.5fr"}}>
                  <Button color="grey" title="1"/>
                  <Button color="grey" title="2"/>
                  <Button color="grey" title="3"/>
                  <Button color="grey" title="4"/>
                  <Button color="grey" title="5"/>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

export default SoundPicker;