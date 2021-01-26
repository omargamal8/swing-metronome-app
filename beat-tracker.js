import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class BeatTracker {
    constructor(ts_a, ts_b, beat=0, bar=1){
        this.ts_a = ts_a
        this.ts_b = ts_b
        this.beat = beat
        this.bar  = bar
    }

    getNextTickInterval(){}

    incrementTickCounter(){}
    
    clearCounters(){
        this.beat=0
        this.bar=1
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
    }
    
    getNextTickInterval(){
        return super.getNextTickInterval() / 2
    }
    
    incrementTickCounter(){
        console.log({BAR: this.bar, BEAT:this.beat, e:this.e, and:this.and, da:this.da})
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

