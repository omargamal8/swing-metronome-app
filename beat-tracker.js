import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class BeatTracker {
    constructor(ts_a, ts_b, beat=0, bar=1){
        this.ts_a = ts_a
        this.ts_b = ts_b
        this.beat = beat
        this.bar  = bar
        this.swing_ratios = []
    }

    getNextTickInterval(){}

    incrementTickCounter(){}
    
    isDownBeat(){
        return !(this.e || this.and || this.a )
    }

    clearCounters(){
        this.beat=0 
        this.bar=1
    }

    updateSwingRatios(ratios){
        this.swing_ratios = ratios
    }
}

export class QuarterNote extends BeatTracker{
    constructor(ts_a, ts_b, beat=0, bar=1){
        super(ts_a, ts_b)
    }

    getNextTickInterval(){
        return 1
    }
    
    incrementTickCounter(){
        // console.log("TICK IN QUARTER")
        this.beat += 1
        if(this.beat === this.ts_a+1){
            this.beat = 1
            this.bar += 1
        }
    }
}

export class EighthNote extends QuarterNote{
    constructor(ts_a, ts_b, beat=0, bar=1){
        super(ts_a, ts_b)
        this.and = 0
        
    }
    
    getNextTickInterval(){
        return super.getNextTickInterval() / 2
    }
    
    incrementTickCounter(){
        console.log("TICK IN EIGHT")

        if(this.beat === 0){
            super.incrementTickCounter()
            return 
        }

        if(this.and){
            this.and = 0
            super.incrementTickCounter()
        }
        else{
            this.and = 1
        }
    }

    clearCounters(){
        super.clearCounters()
        this.and = 0
    }

}

export class SixteenthNote extends EighthNote{
    constructor(ts_a, ts_b, beat=0, bar=1){
        super(ts_a, ts_b)
        this.e  = 0
        this.da = 0
        this.swing_ratios = [0,0,0,0]
    }
    
    getNextTickInterval(){
        // console.log("CURRENT SWING RATIOS", this.swing_ratios)
        const base = super.getNextTickInterval() / 2
        if(this.da)
            return base - this.swing_ratios[3] 

        if(this.and)
            return base + this.swing_ratios[3] - this.swing_ratios[2]

        if(this.e)
            return base + this.swing_ratios[2] - this.swing_ratios[1]
        
        return base + this.swing_ratios[1]
        
    }
    getToString(){
    return {BAR: this.bar, BEAT:this.beat, e:this.e, and:this.and, da:this.da}
    }
    incrementTickCounter(){
        console.log("TICK IN SIXTEEN")
        if(this.beat === 0){
            super.incrementTickCounter()
            return 
        }

        if(this.e === 0){
            this.e = 1
            return
        }

        if(this.and === 0){
            super.incrementTickCounter()
            return
        }

        if(this.da === 0){
            this.da = 1
            return
        }

        this.e = 0
        this.da  = 0
        super.incrementTickCounter()
    }

    clearCounters(){
        super.clearCounters()
        this.e = 0
        this.da = 0
    }
}

