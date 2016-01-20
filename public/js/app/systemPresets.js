// Set system variables for each stainless kettle, batch size, etc.
var system = {
    // Vessel Volumes
    htlWidth: 30.5,
    htlRadius: 15.25,
    htlHeight: 25,
    mashWidth: 34.5,
    mashRadius: 17.25,
    mashHeight: 30,
    kettleWidth: 38,
    kettleRadius: 19,
    kettleHeight: 35,

    mashDenom: Math.pow(17.25, 2) * Math.PI, // based on radius 17.25
    kettleDenom: Math.pow(19, 2) * Math.PI, // based on radius 19
    liquorDenom: Math.pow(15.25, 2) * Math.PI, // based on radius 15.25

    // Batch Presets
    batchSize: 19, // in litres
    waterRatio: 1.2, // in litres per pound
    absorption: .45425, // litres per pound
    hopAbsorption: 425, // in millilitres
    evapVol: 4, // in litres, for 60 minutes
    mashDeadSpace: .42, // in litres
    shrinkage: .04 // cooling shrinkage
}