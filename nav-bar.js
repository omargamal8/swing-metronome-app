import React, {Component} from 'react';
import { StyleSheet, Image, Button, View, Text } from 'react-native';

const NavBar = ({props})=>{

    // const [last, setLast] = React.useState((new Date()).getTime())

    return (
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", borderWidth:1}}>
            <Text  onClick={()=>console.log("OPTIONS CLICKED")}>OPTIONS</Text>
            <Text  onClick={()=>console.log("TIMER CLICKED")}>TIMER</Text>
            <Text  onClick={()=>console.log("PRESETS CLICKED")}>PRESETS</Text>
        </View>
    );

}

export default NavBar;