angular.module('indicative', [])

    .provider('Indicative', function(){
        var iURL = "http://api.indicative.com/service/event";

        this.apiKey = "";
        this.setApiKey = function(newAPI) {
            this.apiKey = newAPI;
        };

        this.$get = function($http) {
            var _this = this;

            var service = {
                getAPIKey: function() {
                    return _this.apiKey;
                },

                addEvent: function(obj) {
                    obj.apiKey = _this.apiKey;
                    return $http.post(iURL, obj, {});
                }
            };

            return service;
        };
    })

    .factory('iEventBuilder', ['Indicative', function(Indicative){
        this.eventName = undefined;
        this.eventUniqueId = undefined;
        this.properties = {};
        var _this = this;
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
                if(name && value) {
                    _this.properties[name] = value;
                }
                return this;
            },
            addCommonProps: function (obj) {
                for(var key in obj) {
                    _this.properties[key] = obj[key];
                }
            },
            done: function() {
                var sending = angular.copy(_this);
                var r_obj = {};
                r_obj.eventName = sending.eventName;
                r_obj.eventUniqueId = sending.eventUniqueId;
                r_obj.properties = sending.properties;

                //clear this object for future stats
                _this.eventName = undefined;
                _this.eventUniqueId = undefined;
                _this.properties = {};

                return Indicative.addEvent(r_obj);
            }
        };
    }])
;
