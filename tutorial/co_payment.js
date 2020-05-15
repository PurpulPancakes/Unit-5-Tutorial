"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Payment Form Script
   
   Author: Marcus Tinney
   Date: 5/15/2020    
   
   Filename: co_payment.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateMonth()
      Validates that the user has selected the expiration month of the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/
//I couldn't get data to load properly sadly.
//These will make sure that everything on the card is proper info
window.addEventListener("load", function() {
	document.getElementById("subButton").onclick = runSubmit;
	document.getElementById("cardName").oninput = validateName;
	document.getElementById("cardNumber").oninput = validateNumber;
	document.getElementById("expMonth").onchange = validateMonth;
	document.getElementById("expYear").onchange = validateYear;
	document.getElementById("cvc").oninput = validateCVC;
});
function runSubmit() {
	validateName();
	validateCredit();
	validateNumber();
	validateMonth();
	validateYear();
	validateCVC();
}
//These will confirm if the cvc numbber is legit
function validateCVC() {
	var cardCVC = document.getElementById("cvc");
	var creditCard = document.querySelectorAll('input[name="credit"]:checked').value;
	
	if (cardCVC.validity.valueMissing) {
		alert("Please enter your CVC number!");
	} else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value===false))){
		alert("Please enter your proper CVC number!");
	} else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value===false))){
		alert("Please enter your proper CVC number!");
	}
}
//This will make sure if the expiration month is filled out.
function validateMonth() {
	var cardMonth = document.getElementById("expMonth");
	if (cardMonth.selectedIndex === 0) {
		alert("Please enter your expiration month!");
	}
}
//This will make sure if the expiration year is filled out.
function validateYear() {
	var cardYear = document.getElementById("expYear");
	if (cardYear.selectedIndex === 0) {
		alert("Please enter your expiration year!");
	}
}
//This will make sure if the card number is filled out.
function validateNumber() {
	var cardNumber = document.getElementById("cardNumber");
	if (cardNumber.validity.valueMissing) {
      alert("Please enter your card number!");
	} else if (luhn(cardNumber.value) === false) {
      //I couldn't get this one to work sadly
		alert("Please enter a real card number!");
	}
}
//This will make sure a credit card type is chosen.
function validateCredit() {
	var creditCard = document.forms.payment.elements.credit[0];
	if (creditCard.validity.valueMissing) {
		alert("Please select your credit card type!");
	}
}
//This will make sure a name is filled out.
function validateName() {
	var cardName = document.getElementById("cardName");
	if (cardName.validity.valueMissing) {
		alert("Please enter your name!");
	}
}
//These check the digits of the card number
function sumDigits(numStr) {
	var digitTotal = 0;
	for(var i=0; i <numStr.length; i++) {
		dialogTotal += parse(numStr.charAt(i));
	}
	return digitTotal;
}
//This function will identify each digit in the card number individually
function luhn(idNum) {
	var stringX = "";
	var stringY = "";
	//This will get the odd numbers
	for (var i= idNum.length -1; i >= 0; i-=2) {
		stringX += idNum.charAt(i);
	}
	//This will get the odd numbers
	for (var i= idNum.length - 2; i >= 0; i-=2) {
		stringY += 2*idNum.charAt(i);
	}
	//this will only return if the numbers are divisble by 10
	return sumDigits(stringX + stringY) % 10 ===0;
}
