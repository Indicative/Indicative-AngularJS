Indicative-AngularJS
====================

Easy-to-use Indicative event builder and REST API for your Angular app.  Just follow the following steps to get started.  

Inject the module into your app like so:

	angular.module(‘myApp’, [‘indicative’]);

In your config method, be sure to set your Indicative API key to the Indicative provider:

	.config(['IndicativeProvider', function (IndicativeProvider) {
		IndicativeProvider.setApiKey("Your-API-Key-Goes-Here");
	}])


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


The event, addProperty, and uniqueID methods return the factory instantiated by the injection.  This way, we store everything needed to build an event object.  The done method arranges all the given data via this call and sends it in the correct form to our services.
