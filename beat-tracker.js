import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class BeatTracker {
    constructor(ts_a, ts_b, subd_count=1, beat=0, bar=1){
        this.ts_a = ts_a
        this.ts_b = ts_b
        this.beat = beat
        this.bar  = bar
        this.subd_count = subd_count
        this.swing_ratios = [...Array(subd_count)].map(el=>0)
        this.curr_subd = 0 //0 means nothing has been played
    }

    getNextTickInterval(){
        const base =  1 / this.subd_count
        if(this.swing_ratios.length != this.subd_count){
            console.warn("swing ratios count (" + this.swing_ratios.length+") not equal the subd count ("+this.subd_count+")... Ignoring swing ratios")
            return base
        }
        const swing_r_i = Math.max(this.curr_subd - 1, 0)
        return base - this.swing_ratios[swing_r_i] +  this.swing_ratios[swing_r_i+1]
    }

    incrementTickCounter(){
        // console.log("TICK IN QUARTER")
        this.curr_subd += 1
        if(this.curr_subd === this.subd_count){
            this.curr_subd = 0
            this.beat += 1
            if(this.beat === this.ts_a+1){
                this.beat = 1
                this.bar += 1
            }        
        }
    }
    
    isDownBeat(){
        return this.curr_subd === 0
    }

    clearCounters(){
        this.beat=0 
        this.bar=1
        this.curr_subd = 0
    }

    updateSwingRatios(ratios){
        this.swing_ratios = ratios
    }
}

export class QuarterNote extends BeatTracker{
    constructor(ts_a, ts_b, subd_count=1, beat=0, bar=1){
        super(ts_a, ts_b, subd_count, beat, bar)
    }
}

export class EighthNote extends QuarterNote{
    constructor(ts_a, ts_b, subd_count=2, beat=0, bar=1){
        super(ts_a, ts_b, subd_count, beat, bar)
    }
}

export class SixteenthNote extends EighthNote{
    constructor(ts_a, ts_b, subd_count=4, beat=0, bar=1){
        super(ts_a, ts_b, subd_count, beat, bar)
    }
}

