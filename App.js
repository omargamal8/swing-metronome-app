import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import BpmPicker from './bpm-picker'
import SinglePulseMaker from './single-pulse-maker'
import {BeatTracker, SixteenthNote, EighthNote, QuarterNote} from './beat-tracker'
import {Audio} from 'expo-av'
import MetronomeApp from './metronome'
export default function App() {
  return (<MetronomeApp></MetronomeApp>)
}