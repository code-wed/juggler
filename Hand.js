function Hand($el, options) {
    this.$el = $el;
    
    this.options = options;
    
    this.pos = parseInt(this.$el.css(options.pos.origin).match(/\d*/)[0]);
    
    $(document).on('keypress', function (event) {
        if (event.which === options.keys.moveTo) {
            this.moveTo();
        } else if (event.which === options.keys.moveFrom) {
            this.moveFrom();
        }
    }.bind(this));
    
    return this;
}

Hand.prototype.moveTo = function () {
    var pos = this.options.pos,
        curPos = parseInt(this.$el.css(pos.origin).match(/\d*/)[0]);
    
    if (curPos === pos.min) {
        return;
    }
    
    this.pos = curPos - pos.inc;
    
    this.$el.css(pos.origin, this.pos);
};

Hand.prototype.moveFrom = function () {
    var pos = this.options.pos,
        curPos = parseInt(this.$el.css(pos.origin).match(/\d*/)[0]);
    
    if (curPos === pos.max) {
        return;
    }
    
    this.pos = curPos + pos.inc;
    
    this.$el.css(pos.origin, this.pos);
};
