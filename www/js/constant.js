angular.module('app.projectX').constant('menuConstant', {
	menuList:[{
		imagepath:"img/icons/wallet-travel.png",
		name:"Booking", 
		state: "main.booking"
	},{
		imagepath:"img/icons/ic_card_travel_black_24dp.png",
		name:"Booking History", 
		state: "main.yourBookings"
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
		imagepath:"img/icons/ic_person_black_24dp.png",
		name:"My Profile", 
		state: "main.account"
	}]
})

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  httpNotFound:'http-not-found'
})
.constant('errorMsgs', {
  invalidForm : 'Invalid Form',
  cityIsEmpty:  'Please select city.',
  itemCountIsEmpty: 'Please select number of Luggage.',
  numberIsEmpty:'Please enter mobile number.',
  pickupStreetIsEmpty:'Please select pickup street / landmark.',
  pickupSubStreetIsEmpty:'Please select pickup street / landmark.',
  dropStreetIsEmpty:'Please select drop street / landmark.',
  dropSubStreetIsEmpty:'Please select drop street / landmark.',
  pickupDateIsEmpty:'Please select pickup date.',
  dropDateIsEmpty:'Please select drop date.',

  invalidSelection : 'Invalid Selection',
  selectCityFirst : 'Please select city first'
})

/*.constant('CONTEXT_URL', {
  url: 'http://localhost:8080/web-service/api/'
})*/