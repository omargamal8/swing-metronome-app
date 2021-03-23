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
            <View style={{display:"flex", flexDirection:"column", borderWidth:1 }}>
              <View style={{display:"flex", flexDirection:"row"}}>
                <Image style={{height:10, width:10, alignSelf:"center"}} source={require("./assets/radio_button_selected.jpg")}></Image>  
                <Text>BEAT</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row"}}>
                <Image style={{height:10, width:10, alignSelf:"center"}} source={require("./assets/radio_button.jpg")}></Image>  
                <Text>SOUND</Text>
              </View>
              <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
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


export default SoundPicker;