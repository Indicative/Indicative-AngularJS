Indicative-AngularJS
====================

Easy-to-use Indicative event builder and API wrapper for your Angular app.  Just follow the following steps to get started.  

This library will give you a provider that wraps the Indicative Javascript sdk and an easy to use Indicative event builder. 

Integration
-----------

Setup the Indicative JS client by adding the following to your Header (more information [here](http://support.indicative.com/main-documentation/#post-205)):
```html
    <script type="text/javascript">
      (function(apiKey) {
        var ind = document.createElement('script');
        ind.src = '//cdn.indicative.com/js/Indicative.min.js';
        ind.type = 'text/javascript';
        ind.async = 'true';
        var ind_init = false;
        ind.onload = ind.onreadystatechange = function() {
          var rs = this.readyState;
          if (ind_init || (rs && rs != 'complete' && rs != 'loaded')) return;

          ind_init = true;
          Indicative.initialize(apiKey);
        };

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ind, s);
      })("YOUR-API-KEY");
    </script>
```



Inject Indicative into your angular app by adding it to your app module:

	angular.module(‘myApp’, [‘indicative’]);



Now, you can start building events. In every Controller, Factory, Service… that you want to log a stat, be sure to inject iEventBuilder. Then, all you need is one line of code!  See the following example:

	.controller([‘$scope’, ‘iEventBuilder’, function($scope, iEventBuilder) {
		$scope.buttonClicked = function() {
			iEventBuilder
				.event(‘button_click’)
				.uniqueID(‘user123’)
				.addProperty(‘age’, 23)
				.addProperty(‘Gender’, ‘female’)
				.done();	
		};
	}])


The `iEventBuilder` factory gives you the following methods:

| Method Name   | Parameters                    | Returns              | Functionality                                                                                                                                                                                                                                                                                                                                                                           |
|---------------|-------------------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| event         | String: Event Name            | iEventBuilder object | sets the event name (mandatory)                                                                                                                                                                                                                                                                                                                                                         |
| uniqueID      | String: UniqueID              | iEventBuilder object | sets the unique id for this specific event, we recommend using the Indicative object to add this globally.                                                                                                                                                                                                                                                                              |
| addProperty   | String: Key, String: Value    | iEventBuilder object | adds a property to this specific event                                                                                                                                                                                                                                                                                                                                                  |
| addProperties | Object: {String, String}      | iEventBuilder object | adds multiple properties to this specific event                                                                                                                                                                                                                                                                                                                                         |
| done          | Function: Callback (optional) | no return object     | builds and sends the Indicative event.  This uses the event, uniqueID, and properties specified (if specified).  It will also use the global properties and uniqueID (if one isn't set here) set using the Indicative js client.  After sending up the event, it will clear the semi-stateful event name, uniqueID, and properties for the next event to be built up using the builder. |


You can also use methods discussed in the Javascript SDK by injecting `Indicative` into your services.  

Using the Javascript SDK, once a user logs into your app, set their uniqueID and common properties to be used with all future events:
```javascript
Indicative.setUniqueID("YOUR-USER'S-UNIQUE-ID"); //this could also be an email
Indicative.addProperties({"age": 26, "state": "premium"});
```

