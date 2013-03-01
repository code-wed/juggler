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
        mid;
    
    mid = ((options.start.match(/\d*/) / 2) + (options.end.match(/\d*/) / 2)) + 'px';
    
    this.$el
        .css('left', options.start)
        .css('top', this.options.base);
    
    this.$el.animate({
        left: [mid, 'linear'],
        top: [this.options.apex, 'easeOut']
    }, this.options.duration / 2, function () {
        this.$el.animate({
            left: [options.end, 'linear'],
            top: [this.options.base, 'easeIn']
        }, this.options.duration / 2, function () {
            deferred.resolve();
        })
    }.bind(this));
    
    return deferred.promise();
};

Ball.prototype.juggleLeft = function () {
    return this.juggle({
        start: this.options.left,
        end: this.options.right
    });
};

Ball.prototype.juggleRight = function () {
    return this.juggle({
        start: this.options.right,
        end: this.options.left
    });
};
