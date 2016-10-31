(function(angular) {
  "use strict";

  angular.module('indicative', [])
    .provider('Indicative', IndicativeProvider)
    .factory('iEventBuilder', ['Indicative', iEventBuilder]);

  function IndicativeProvider() {
    this.$get = getter;

    function getter() {
      return window.Indicative;
    }
  }

  function iEventBuilder(Indicative) {
    var _this = this;

    this.eventName = undefined;
    this.eventUniqueId = undefined;
    this.properties = {};

    return {
      event: function(name) {
        _this.eventName = name;
        return this;
      },
      uniqueID: function (uniqueID) {
        _this.eventUniqueId = uniqueID;
        return this;
      },
      addProperty: function (name, value) {
        if(name && (value || value === false)) {
          _this.properties[name] = value;
        }
        return this;
      },
      addProperties: function (obj) {
        for(var key in obj) {
          this.addProperty(key, obj[key]);
        }
        return this;
      },
      done: function(callback) {
        callback = callback || function() {};
        var sendEvent = angular.copy(_this);
        if (sendEvent.eventUniqueId) {
          Indicative.buildEvent(sendEvent.eventName,
                                sendEvent.eventUniqueId,
                                sendEvent.properties,
                                callback);
        } else {
          Indicative.buildEvent(sendEvent.eventName,
                                sendEvent.properties,
                                callback);
        }


        //clear this object for future stats
        _this.eventName = undefined;
        _this.eventUniqueId = undefined;
        _this.properties = {};
      }
    };
  }
})(angular);

