(function($) {

  $.fn.to_switch = function(options) {
    var settings = $.extend({
      container_class: "ui-switch"
    }, options);


    return new Switch(this, settings);
  };

  function Switch(origin, settings) {

    var _this = this;

    _this.labels = [];
    _this.values = [];
    _this.settings = $.extend({
      size: "medium"
    }, settings);

    _this.init = function() {

      origin.find("option").each(function(i,o) {
        _this.labels.push(o.text);
        _this.values.push(o.value);
      });

      _this.create_structure();
      _this.set_to_value_of_origin();

      _this.bind_events();

      origin.after(_this.switch);
      origin.hide();
    };

    _this.create_structure = function() {
      _this.switch = $("<div></div>");
      _this.switch.addClass(_this.settings.container_class).addClass(_this.settings.container_class + "-" + _this.settings.size);

      if(origin.prop("id") != "") {
        _this.switch.prop("id", origin.prop("id") + "-ui-switch");
      }

      if(_this.labels[0] != "") {
        _this.left_side = $("<div></div>").addClass("ui-switch-left");
        _this.left_side.text(_this.labels[0]).appendTo(_this.switch);
      }

      _this.slider = $("<div></div>").addClass("ui-switch-slider").appendTo(_this.switch);
      _this.track = $("<div></div>").addClass("ui-switch-track").appendTo(_this.slider);
      _this.knob = $("<div></div>").addClass("ui-switch-knob").appendTo(_this.slider);

      if(_this.labels[1] != "") {
        _this.right_side = $("<div></div>").addClass("ui-switch-right");
        _this.right_side.text(_this.labels[1]).appendTo(_this.switch);
      }

    };

    _this.bind_events = function() {
      _this.slider.on("click", _this.move_knob);
      if(_this.left_side) { _this.left_side.on("click", _this.move_to_left); }
      if(_this.right_side) { _this.right_side.on("click", _this.move_to_right); }
    };

    _this.move_knob = function() {
      if(_this.knob.hasClass("left")) {
        _this.move_to_right();
        origin.trigger("switch:right");
      } else {
        _this.move_to_left();
        origin.trigger("switch:left");
      }

      origin.trigger("change");

    };

    _this.move_to_right = function() {
      _this.knob.removeClass("left").addClass("right");
      _this.track.removeClass("left").addClass("right");
      if(_this.left_side) { _this.left_side.removeClass("active"); }
      if(_this.right_side) { _this.right_side.addClass("active"); }
      origin.val(_this.values[1]);
    };

    _this.move_to_left = function() {
      _this.knob.removeClass("right").addClass("left");
      _this.track.removeClass("right").addClass("left");
      if(_this.right_side) { _this.right_side.removeClass("active"); }
      if(_this.left_side) { _this.left_side.addClass("active"); }
      origin.val(_this.values[0]);
    };

    _this.set_to_value_of_origin = function() {
      var active_side = 0; // 0 = left side
      origin.find("option").each(function(i, e) {
        if(e.hasAttribute("selected")) {
          return active_side = i;
        }
      });

      active_side == 0 ? _this.move_to_left() : _this.move_to_right();
    };

    _this.init();

    return _this;
  }


}(jQuery));

