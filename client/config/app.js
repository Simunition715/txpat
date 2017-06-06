var app = angular.module('app',['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'partials/users_new.html',
		controller: 'UsersController as UC'
	})
	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: 'UsersController as UC'
	})
	.when('/comment/:id',{
		templateUrl: 'partials/comments.html',
		controller: 'UsersController as UC'
	})
	.when('/myposts/:id',{
		templateUrl: 'partials/myposts.html',
		controller: 'UsersController as UC'
	})
	.otherwise('/')
})