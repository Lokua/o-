;(function(window, o_, $, undefined) {
    
  o_ = window.o_ || {};
  
  o_.Dropdown = function(el, options) {
    this.$el = $(el);
    // this.options = options;
    this.init();
  };
  
  o_.Dropdown.prototype.init = function() {
    var dd = this;
    dd.$items = dd.$el.find('.o-dropdown-item');
    dd.$placeholder = dd.$el.find('.o-dropdown-placeholder');
    dd.$el.on('click', '.o-dropdown-item',  function() {
      var $this = $(this);
      dd.value = $this.attr('data-o-dropdown-val');
      dd.$placeholder.html($this.html())
        .attr('data-o-dropdown-val', dd.value);
    });
  };
  
  $(function() {
    $('.o-dropdown').each(function(i, el) {
      new o_.Dropdown(el);
    });
  });
  
})(window, null, jQuery);