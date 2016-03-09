angular.module('app.projectX').constant('menuConstant', {
	menuList:[{
		imagepath:"img/icons/wallet-travel.png",
		name:"Booking", 
		state: "main.booking"
	},{
		imagepath:"img/icons/currency-inr.png",
		name:"Rate Card", 
		state: "main.pricing"
	},{
		imagepath:"img/icons/phone-in-talk.png",
		name:"ContactUs", 
		state: "main.contactUs"
	},{
		imagepath:"img/icons/alert-circle.png",
		name:"About Us", 
		state: "main.aboutUs"
	},{
		imagepath:"img/icons/alert-circle.png",
		name:"My Profile", 
		state: "main.account"
	}]
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
/*.constant('CONTEXT_URL', {
  url: 'http://localhost:8080/web-service/api/'
})*/