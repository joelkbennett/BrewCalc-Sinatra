function VesselVisual(config) {
    this.config = config;

    this.init = function(config) {
        // Create height and width values based on IRL vessel measurement in cm and converted to a display value in pixels
        var setHeight = 10 * this.config.size;
        var setWidth = 2 * Math.abs(this.config.radius) * 10;
        this.config.el.css('height', setHeight);
        this.config.el.css('width', setWidth);

        this.setRadius();
    };

    this.setRadius = function() {
        var vessel = this.config.el.attr('id');

        switch (vessel) {
            case 'htl-visual':
                this.config.el.prev().html(system.htlWidth / 2 + ' cm');
                break;
            case 'mash-visual':
                this.config.el.prev().html(system.mashWidth / 2 + ' cm');
                break;
            case 'kettle-visual':
                this.config.el.prev().html(system.kettleWidth / 2 + ' cm');
                break;
        }
    };

    this.update = function(liquidHeight) {
        var newLiquidHeight = liquidHeight * 10;
        this.liquidSim();
        this.config.el.find('.liquid').animate({
            height: newLiquidHeight
        });
        this.config.el.find('.level-indicator').animate({
            bottom: newLiquidHeight - 15
        }, 1000);
        this.config.el.find('.level-indicator>.indicator-label').html(liquidHeight + " cm");
    };

    this.grainAmount = function(amount) {
        this.resetGrainBed();

        var theMash = document.getElementById('mash-grain');
        var grainBed = amount * 10;

        for ( var i = 0; i < grainBed; i++ ) {
            var grainEl = document.createElement("div");
            grainEl.className = "grain";
            theMash.appendChild(grainEl);
        }

        $(theMash).animate({
            opacity: .5
        }, 100);

        this.config.el.find('.grain-indicator>.indicator-label').html(brew.getAbsorption() + " litres");
    };

    this.resetGrainBed = function() {
        $('.grain').remove();
    };

    this.hopAmount = function(amount) {
        this.resetHops();

        var theKettle = document.getElementById('kettle-hops');
        var hops = amount * 10;

        for ( var i = 0; i < hops; i++ ) {
            var hopEl = document.createElement("div");
            hopEl.className = "hop";
            theKettle.appendChild(hopEl);
        }

        $(theKettle).animate({
            opacity: .5
        }, 100);

        this.config.el.find('.hop-indicator>.indicator-label').html(brew.getHopAbsorption(amount) + " litres");
    };

    this.resetHops = function() {
        $('.hop').remove();
    };

    this.liquidSim = function() {
        this.config.el.find('.liquid').addClass('liquid-sim');
    }
}
