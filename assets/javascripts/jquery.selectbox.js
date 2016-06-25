(function($){
  'use strict'

  function Select(select){
    this.originalSelect = $(select);
    this.styledSelect = this.generateStyledSelect();
    this.initialize();
  };

  Select.prototype.select = function(value){
    if(this.currentVal != value){
      var li = this.styledSelect.list.find('[data-value="' + value + '"]');
      this.styledSelect.current.text(li.text());
      this.originalSelect.val(li.data('value')).change();
      this.currentVal = value;
    }
    this.close();
  };

  Select.prototype.toggle = function(){
    if (!this.isOnScreen(this.styledSelect.find('ul')))
      this.styledSelect.addClass('direction-reverse');
    this.styledSelect.toggleClass('opened');
  };

  Select.prototype.close = function(){
   this.styledSelect.removeClass('opened');
  };

  Select.prototype.initialize = function(){
    var self = this;
    this.originalSelect.addClass('select-hidden');
    this.styledSelect.insertAfter(this.originalSelect);
    this.styledSelect.on('click', 'li', function(){ self.select(this.dataset.value); });
    this.styledSelect.on('click', '.select-current', function(){ self.toggle(); });
    $(document).click(function (e){
      if (!self.styledSelect.is(e.target) && self.styledSelect.has(e.target).length === 0){
        self.close();
      }
    });
  };

  Select.prototype.generateStyledSelect = function(){
    var container = $(document.createElement('div')).addClass('select-container');
    var current = container.current = $(document.createElement('div')).addClass('select-current');
    var list = container.list = $(document.createElement('ul'));

    Array.prototype.forEach.call(this.originalSelect[0].options, function(option){
      var li = $(document.createElement('li'));
      li.text(option.text);
      li.attr('data-value', option.value);
      list.append(li);
    });

    current.text(this.originalSelect.find(':selected').val());
    container.append(current);
    container.append(list);
    return container;
  };

  Select.prototype.isOnScreen = function(el){

    var viewport = {};
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();

    var height = el.outerHeight();
    var bounds = el.offset();
    bounds.bottom = bounds.top + height;

    var visible = !(viewport.bottom < bounds.top || viewport.top > bounds.bottom);

    if(!visible){
      return false;
    }

    var delta = {
      top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
      bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height)
    };

    return (delta.top * delta.bottom) >= 1;
  };
      

  Select.prototype.isOnScreen = function(el){

    var viewport = {}
    viewport.top = $(window).scrollTop();
    viewport.bottom = viewport.top + $(window).height();

    var height = el.outerHeight();
    var bounds = el.offset();
    bounds.bottom = bounds.top + height;

    var visible = !(viewport.bottom < bounds.top || viewport.top > bounds.bottom);

    if(!visible){
      return false;
    }

    var delta = {
      top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
      bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height)
    };

    return (delta.top * delta.bottom) >= 1;
  };
      

  $.fn.select = function(){
    this.each(function(){ new Select(this); });
  };
})(jQuery);
