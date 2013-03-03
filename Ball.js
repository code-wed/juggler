$.easing.easeIn = function (e) {
    return Math.pow(e, 2);
};

$.easing.easeOut = function (e) {
    return 1 - Math.pow(1 - e, 2);
};

function Ball($el, options) {
    this.$el = $el;
    
    this.options = options;
    
    return this;
}

Ball.prototype.juggle = function (options) {
    var deferred = $.Deferred(),
        mid,
        offset;
    
    if (!this.startTime) {
         this.startTime = new Date().valueOf();
    }
    
    offset = new Date().valueOf() - this.startTime;
    
    mid = ((options.start.match(/\d*/) / 2) + (options.end.match(/\d*/) / 2)) + 'px';
    
    this.$el
        .css('left', options.start)
        .css('bottom', this.options.base);
    
    this.$el.animate({
        left: [mid, 'linear'],
        bottom: [this.options.apex, 'easeOut']
    }, this.options.tick * (this.options.duration / 2) - offset, function () {
        this.$el.animate({
            left: [options.end, 'linear'],
            bottom: [this.options.base, 'easeIn']
        }, this.options.tick * (this.options.duration / 2), function () {
            this.startTime += this.options.tick * this.options.duration;
            
            deferred.resolveWith(this, [parseInt(options.end.match(/\d*/)[0])]);
        }.bind(this))
    }.bind(this));
    
    return deferred.promise();
};

Ball.prototype.juggleToLeft = function () {
    return this.juggle({
        start: this.options.left,
        end: this.options.right
    });
};

Ball.prototype.juggleToRight = function () {
    return this.juggle({
        start: this.options.right,
        end: this.options.left
    });
};
