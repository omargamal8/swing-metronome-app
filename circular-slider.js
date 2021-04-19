import React, {Component} from 'react';
import { StyleSheet, Button,  Text, View, Image, Pressable, PanResponder } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { abs } from 'react-native-reanimated';


class CircularSlider extends Component {
    constructor(props){
        super(props)
        this.state = {            
            current_x: this.getXYFromTheta(this.props.starting_theta)[0],
            current_y: this.getXYFromTheta(this.props.starting_theta)[1],
            page_x:0,
            page_y:0,
            height:0,
            width:0,
        }
        this.circle_slider = null
        this.setSliderRef = element => { this.circle_slider = element}
        this.pan_responder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>
              true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
              true,
        
            onPanResponderGrant: (evt, gestureState) => {
              // The gesture has started. Show visual feedback so the user knows
              // what is happening!
              // gestureState.d{x,y} will be set to zero now
            },
            onPanResponderMove: (evt, gestureState) => {
                // console.log("MOVE", evt, gestureState)
                // console.log("EVT", evt.nativeEvent.locationX, evt.nativeEvent.locationY)
                // console.log("PAGE", evt.nativeEvent.pageX, evt.nativeEvent.pageY, gestureState.moveX, gestureState.moveY)
                // console.log("MOVE", evt.nativeEvent.locationX)
                // console.log("GEST", gestureState.moveX)
                this.handleMove(gestureState)
              // The most recent move distance is gestureState.move{X,Y}
              // The accumulated gesture distance since becoming responder is
              // gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => {console.log("TERMINATION REQUESTT"); return true},
            onPanResponderRelease: (evt, gestureState) => {
                // console.log("RELEASED")
              // The user has released all touches while this view is the
              // responder. This typically means a gesture has succeeded
            },
            onPanResponderTerminate: (evt, gestureState) => {
                console.log("PAN RESPONDER TERMINATEE")
              // Another component has become the responder, so this gesture
              // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              // Returns whether this component should block native components from becoming the JS
              // responder. Returns true by default. Is currently only supported on android.
              return true;
            }
        })              
        this.handleMove = this.handleMove.bind(this)
    }

    turnFirstQuadrantToNegative(theta){
        if(theta * (180 / Math.PI) > 270 && theta * (180 / Math.PI) <= 360)
            return theta - 2 * Math.PI
        return theta
    }
    isAllowedTheta(theta){
        // return true
        // const dists = this.props.sliders_pos.map(n_t=> Math.abs(theta - n_t))
        // const violated = this.props.sliders_pos.filter(n_t=> Math.abs(theta - n_t) < 0.5)
        // console.log("THETA violated length", violated.length)
        const [starting_theta, ending_theta] = this.props.theta_range
        if(starting_theta < ending_theta){
            if((theta > starting_theta && theta > starting_theta+0.25) && theta < ending_theta - 0.25 )
                return true
        }
        else{
            // console.log(theta > starting_theta + 0.25 || theta < ending_theta - 0.25)
            // console.log(theta < ending_theta - 0.25)
            if(((theta > starting_theta && theta <= 2*Math.PI) || (theta >= 0 && theta < ending_theta)) &&
                (theta > starting_theta + 0.25 || theta < ending_theta - 0.25))
             return true
        }
        return false
        // let theta_mutated = this.turnFirstQuadrantToNegative(theta), starting_theta = this.turnFirstQuadrantToNegative(this.props.theta_range[0]), ending_theta = this.turnFirstQuadrantToNegative(this.props.theta_range[1])
        // console.log("THETA", theta, starting_theta, ending_theta)
        // if(theta_mutated >= starting_theta + 0.5 &&  theta_mutated < ending_theta -  0.5)
            // return true
        // return  violated.length === 0
    }
    
    getXYFromTheta = (theta)=>[this.props.circle_r * Math.cos(theta), this.props.circle_r * Math.sin(theta)]
    handleMove(e){
        // console.log(e.nativeEvent.locationX, e.nativeEvent.locationY)
        // console.log(e.nativeEvent.pageX)
        // console.log(e.moveX, e.moveY)
        const x = this.state.current_x+((e.moveX- (this.state.width / 2)) - this.state.page_x)
        const y = this.state.current_y+((e.moveY - (this.state.height / 2)) - this.state.page_y)

        
        let theta = Math.atan(y/x) + ((x < 0) ? Math.PI : (y<0)? 2* Math.PI : 0)

        const [new_x, new_y] = this.getXYFromTheta(theta)

        const displacment = (theta > 3*Math.PI/2 && theta < 2*Math.PI) ? (theta - 2*Math.PI) - this.state.orig_theta : theta - this.state.orig_theta
        // console.log("TDXY",theta, theta * (180 / Math.PI), x, y)
        const allowed = this.isAllowedTheta(theta)
        console.log("T TR",theta, this.props.theta_range, "allowed", allowed, "displacment", displacment * (180 / Math.PI))
        // console.log(x , y < 50)
        const dx = new_x - this.state.current_x , dy = new_y - this.state.current_y 
        if(allowed ){
            this.setState({current_x:new_x, current_y:new_y, page_x: this.state.page_x + dx, page_y: this.state.page_y + dy})
            this.props.update_pos([theta, displacment])
        }
    }
    componentDidMount(){
        //The following code executes inside one of your component's methods, post render
        console.log("MOUNTED~!!!")
 
    }
    componentDidUpdate(prevProps) {
        if (prevProps.circle_r !== this.props.circle_r) {
            setTimeout(() => {
                this.circle_slider.measure((x, y, width, height, pageX, pageY) => {
                    this.setState({page_x:pageX, page_y:pageY})
                    })
            }, 600); 
            this.setState({current_x: this.getXYFromTheta(this.props.starting_theta)[0],
                current_y: this.getXYFromTheta(this.props.starting_theta)[1],
                orig_theta: this.props.starting_theta})
        }
      }


      shouldComponentUpdate(nextProps, nextState){
        if(this.props.circle_r === nextProps.circle_r && this.state.current_x === nextState.current_x){
            return false
        }
        else
            return true
    }
    render(){
        console.log("================ CIRC SLIDER "+this.props.ID+" ==================", this.props.starting_theta, this.props.theta_range)
        return (
        <View onLayout={event => {
            // event.target.measure(
            //     (x, y, width, height, pageX, pageY) => {console.log("HOBA?", pageX, pageY)}
            // )
            const layout = event.nativeEvent.layout;
            // console.log('height:', layout.height);
            // console.log('width:', layout.width);
            console.log("LAYOUT", layout)
            console.log('x:', layout.x, layout.left );
            console.log('y:', layout.y, layout.top);
            this.setState({height:layout.height, width:layout.width, page_x:layout.left, page_y:layout.top})
            }} 
            style={{borderRadius:50, height:25, width:25, borderWidth:1,backgroundColor:"white" ,position:"absolute", 
                            transform:[{translateY:this.state.current_y}, {translateX:this.state.current_x}],}}
            onClick={(e)=>{console.log("pressed", e.nativeEvent, e.nativeEvent.locationY)}} onPressOut={()=>{console.log("press out!")}} 
            {...this.pan_responder.panHandlers}
            ref = {this.setSliderRef}
            ></View>
        );
    }
}

export default CircularSlider;