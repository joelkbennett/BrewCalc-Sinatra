function VolCalc() {
    this.init = function(grainWeight) {
        this.grainWeight = parseInt(grainWeight);
        this.setDisplay();
    };

    // returns volume of mash water based on total grain weight
    this.getMashVol = function() {
        return this.grainWeight * system.waterRatio; // Use 1.2 l/lb for calculating water
    };

    // returns volume of water absorbed (and lost) into grain
    this.getAbsorption = function() {
        return Math.round((this.grainWeight * system.absorption) * 100) / 100;
    };

    // return the water absorbed by hops, for a better estimate of final volume into the fermenter
    this.getHopAbsorption = function(hopWeight) {
        this.hopWeight = parseInt(hopWeight);

        return this.hopWeight * system.hopAbsorption / 1000;
    };

    // returns the volume of the first run wort
    this.getFirstWort = function() {
        return this.getMashVol() - this.getAbsorption();
    };

    // return the total water collected from the mash
    this.getPreBoil = function() {
        return system.batchSize + system.evapVol;
    };

    // returns the sparge volumes
    this.getSpargeVol = function() {
        return this.getPreBoil() - this.getFirstWort();
    };

    // returns to post-boil volume (accounting for evaporation)
    this.getPostBoil = function() {
        return this.getPreBoil() - system.evapVol;
    };

    // returns the post-cooling volume
    // TODO 1: Figure out if I need to consider shrinkage. If I assume the wort expands at boiling, then drops back (shrinks), I think I can safely ignore it.
    this.getPostCool = function() {
        return this.getPostBoil() - (this.getPostBoil() * system.shrinkage);
    };

    // Determine the height. Checks if grainWeight is null to see if we're calculating the mash.
    this.getHeight = function(waterVol, radius) {
        var top = waterVol * 1000; // convert litre to millilitre
        var bottom = radius;
        return Math.round((top / bottom) * 100) / 100; // in centimetres
    };

    this.setDisplay = function() {
        mashVol.html(this.getMashVol() + " l @ " + this.getHeight(this.getMashVol(), system.mashDenom) + " cm");
        spargeVol.html(this.getSpargeVol() + " l @ " + this.getHeight(this.getSpargeVol(), system.liquorDenom) + " cm");
        preBoil.html(this.getPreBoil() + " l @ " + this.getHeight(this.getPreBoil(), system.kettleDenom) + " cm");
        // TODO 1: Figure out if I need to consider shrinkage. If I assume the wort expands at boiling, then drops back (shrinks), I think I can safely ignore it.
        //postBoil.html(this.getHeight(this.getPostBoil(), system.kettleDenom) + " cm");
        postCool.html(this.getPostBoil() + " l @ " + this.getHeight(this.getPostBoil(), system.kettleDenom) + " cm");
    }
}