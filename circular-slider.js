import React, {Component} from 'react';
import { StyleSheet, Button,  Text, View, Image, Pressable, PanResponder } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
class CircularSlider extends Component {
    constructor(props){
        super(props)
        this.state = {            
            relative_x:0,
            relative_y:-125,

            current_x:0,
            current_y:-125
        }
        this.panresponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gest)=>{console.log(gest.moveX, gest.moveY)}
        })
        this.handleMove = this.handleMove.bind(this)
    }

    handleMove(e){
        // console.log("X:", e.nativeEvent.locationX, "Y:", e.nativeEvent.locationY)
        const h = 99.5+125
        const k = 11.953125 + 125
        
        const x = this.state.current_x+(e.nativeEvent.locationX - 12.5)
        const y = this.state.current_y+(e.nativeEvent.locationY - 12.5)

            const theta = Math.atan(y/x)
            const new_x = Math.cos(theta) * 125
            const new_y = Math.sin(theta) * 125
            const approx_y = (Math.abs(y-new_y) < Math.abs(y-(new_y*-1)))? new_y : new_y*-1
            const approx_x = (Math.abs(x-new_x) < Math.abs(x-(new_x*-1)))? new_x : new_x*-1
            console.log("TXY",theta,new_x, new_y)
            this.setState({current_x:approx_x, current_y:approx_y})

        
        // this.props.setXY(p_x, p_y)

        
        // this.state.curr
        
    }
    componentDidMount(){
        this.state.current_x
    }
    render(){
        return (
        <View onLayout={event => {
            const layout = event.nativeEvent.layout;
            console.log('height:', layout.height);
            console.log('width:', layout.width);
            console.log('x:', layout.x);
            console.log('y:', layout.y);
            }} 
            onClick={(e)=>{console.log("pressed", e.nativeEvent, e.nativeEvent.locationY)}} onPressOut={()=>{console.log("press out!")}} style={{borderRadius:"50%", height:25, width:25, border:"solid 1px black",backgroundColor:"white" ,position:"absolute", 
                            transform:[{translateY:this.state.current_y}, {translateX:this.state.current_x}],}}
            onStartShouldSetResponder={this.onStartShouldSetResponder}
            onMoveShouldSetResponder={()=>true}
            onResponderMove={(e, gest)=>this.handleMove(e)}
            onResponderRelease={(e)=>{console.log("RELEASED!", e.nativeEvent); this.setState({})}}
            ></View>
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

export default CircularSlider;