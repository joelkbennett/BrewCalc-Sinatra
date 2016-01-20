var brew = new VolCalc(),
    // ingredient inputs
    ingInputs = $('#grain-input'),
    grainInput = ingInputs.find('#grain'),
    hopInput = ingInputs.find('#hop')

    // Kettle vol inputs
    kettleVols = $('#kettle-input'),
    htlWidth = kettleVols.find('#htl-dimensions-width').val(system.htlRadius),
    mashWidth = kettleVols.find('#mash-dimensions-width').val(system.mashRadius),
    boilWidth = kettleVols.find('#boil-dimensions-width').val(system.kettleRadius),
    htlHeight = kettleVols.find('#htl-dimensions-height').val(system.htlHeight),
    mashHeight = kettleVols.find('#mash-dimensions-height').val(system.mashHeight),
    boilHeight = kettleVols.find('#boil-dimensions-height').val(system.kettleHeight),

    // System settings
    batchSettings = $('#batch-input'),
    batchSize = batchSettings.find('#batch-size').val(system.batchSize),
    waterRatio = batchSettings.find('#water-ratio').val(system.waterRatio),
    grainAbsorb = batchSettings.find('#grain-absorption').val(system.absorption),
    hopAbsorb = batchSettings.find('#hop-absorption').val(system.hopAbsorption),
    evapVol = batchSettings.find('#evaporation').val(system.evapVol),
    deadSpace = batchSettings.find('#dead-space').val(system.mashDeadSpace),
    shrinkage = batchSettings.find('#shrinkage').val(system.shrinkage),

    // Results
    mashDetails = $('#mash-details'),
    mashVol = mashDetails.find('#mash-vol'),
    spargeVol = mashDetails.find("#sparge-vol"),
    preBoil = mashDetails.find('#pre-boil-vol'),
    postCool = mashDetails.find('#cooled-vol');

// Input Changes

grainInput.on('change', function() {
    updateVisuals();
});

hopInput.on('change', function() {
    updateVisuals();
});

htlWidth.on('change', function () {
   var htlWidthVal = htlWidth.val();
   //htlVisual.init();
});

// Create a new visual object for the HTL
var htlVisual = new VesselVisual({
    el: $('#htl-visual'),
    size: htlHeight.val(),
    radius: htlWidth.val()
});

// Create a new visual object for the Mash
var mashVisual = new VesselVisual({
    el: $('#mash-visual'),
    size: mashHeight.val(),
    radius: mashWidth.val()
});

// Create a new visual for the Kettle
var kettleVisual = new VesselVisual({
    el: $('#kettle-visual'),
    size: boilHeight.val(),
    radius: boilWidth.val()
});

function updateVisuals () {
    var hopWeight = hopInput.val();
    var grainWeight = grainInput.val();
    brew.init(grainWeight);
    htlVisual.update(brew.getHeight(brew.getSpargeVol(), system.liquorDenom));
    mashVisual.update(brew.getHeight(brew.getMashVol(), system.mashDenom));
    mashVisual.grainAmount(grainWeight);
    kettleVisual.update(brew.getHeight(brew.getPreBoil(), system.kettleDenom));
    kettleVisual.hopAmount(hopWeight);
}

htlVisual.init();
mashVisual.init();
kettleVisual.init();

updateVisuals();