import React, {Component} from 'react';
import { StyleSheet, Image, Button, View } from 'react-native';

const BpmTapper = ({props})=>{

    const [last, setLast] = React.useState((new Date()).getTime())

    return (
        <View style={{display:"flex", justifyContent:"center", alignItems:"center", border:"1px solid black", width:"20vw"}}>
            <h2  onClick={()=>console.log("TAP CLICKED")}> TAP </h2>
        </View>
    );

}

export default BpmTapper;