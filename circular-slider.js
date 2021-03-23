import React, {Component} from 'react';
import { StyleSheet, Button,  Text, View, Image, Pressable, PanResponder } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
class CircularSlider extends Component {
    constructor(props){
        super(props)
        this.state = {            
            current_x: this.getXYFromTheta(this.props.starting_theta)[0],
            current_y: this.getXYFromTheta(this.props.starting_theta)[1],
            height:0,
            width:0,
        }       
        this.handleMove = this.handleMove.bind(this)
    }
    getXYFromTheta = (theta)=>[this.props.circle_r * Math.cos(theta), this.props.circle_r * Math.sin(theta)]
    handleMove(e){
        const x = this.state.current_x+(e.nativeEvent.locationX - (this.state.width / 2))
        const y = this.state.current_y+(e.nativeEvent.locationY - (this.state.height / 2))
        let theta = Math.atan(y/x) + ((x < 0) ? Math.PI : 0)

        const [new_x, new_y] = this.getXYFromTheta(theta)

        console.log("TDXY",theta, theta * (180 / Math.PI), new_x, new_y)
        this.setState({current_x:new_x, current_y:new_y})
    }
    componentDidUpdate(prevProps) {
        if (prevProps.circle_r !== this.props.circle_r) {
            this.setState({current_x: this.getXYFromTheta(this.props.starting_theta)[0],
                current_y: this.getXYFromTheta(this.props.starting_theta)[1]})
        }
      }
    render(){
        return (
        <View onLayout={event => {
            const layout = event.nativeEvent.layout;
            // console.log('height:', layout.height);
            // console.log('width:', layout.width);
            // console.log('x:', layout.x);
            // console.log('y:', layout.y);
            this.setState({height:layout.height, width:layout.width})
            }} 
            style={{borderRadius:50, height:25, width:25, borderWidth:1,backgroundColor:"white" ,position:"absolute", 
                            transform:[{translateY:this.state.current_y}, {translateX:this.state.current_x}],}}
            onClick={(e)=>{console.log("pressed", e.nativeEvent, e.nativeEvent.locationY)}} onPressOut={()=>{console.log("press out!")}} 
            onStartShouldSetResponder={this.onStartShouldSetResponder}
            onMoveShouldSetResponder={()=>true}
            onResponderMove={(e, gest)=>this.handleMove(e)}
            onResponderRelease={(e)=>{console.log("RELEASED!", e.nativeEvent); this.setState({})}}
            ></View>
        );
    }
}

export default CircularSlider;