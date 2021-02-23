import React, {Component} from 'react';
import { StyleSheet, Image, Button, View } from 'react-native';

const NavBar = ({props})=>{

    // const [last, setLast] = React.useState((new Date()).getTime())

    return (
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", border:"1px solid black", width:"100vw"}}>
            <p  onClick={()=>console.log("OPTIONS CLICKED")}><b>OPTIONS</b></p>
            <p  onClick={()=>console.log("TIMER CLICKED")}><b>TIMER</b></p>
            <p  onClick={()=>console.log("PRESETS CLICKED")}><b>PRESETS</b></p>
        </View>
    );

}

export default NavBar;