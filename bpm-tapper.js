import React, {Component} from 'react';
import { StyleSheet, Image, Button, View, Text } from 'react-native';

const BpmTapper = ({props})=>{

    const [last, setLast] = React.useState((new Date()).getTime())

    return (
        <View style={{display:"flex", justifyContent:"center", alignItems:"center", borderWidth:1}}>
            <Text  style={{fontSize:26}} onClick={()=>console.log("TAP CLICKED")}> TAP </Text>
        </View>
    );

}

export default BpmTapper;