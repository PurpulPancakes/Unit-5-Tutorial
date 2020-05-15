"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Marcus Tinney
   Date: 5/15/2020
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

window.addEventListener("load", function() {
   var orderForm = document.orderForm;
   //This figures out what the exact date is and displays it on the website, like a reciept!
	orderForm.elements.orderDate.value = new Date().toDateString();
	orderForm.elements.model.focus();
	//This will find the cost of what is being ordered
	calcOrder();
});

function calcOrder() {
   //This makes a new variable to put into the order form and where it goes too
	var orderForm = document.forms.orderForm;
	
   //These variables are used to figure out what the starting cost is
   //Two indexes are used, one for the model, and one the quantity
	var xIndex = orderForm.elements.model.selectedIndex;
	var xCost = orderForm.elements.model.options[xIndex].value;
	var yIndex = orderForm.elements.qty.selectedIndex;
	var quantity = orderForm.elements.qty[yIndex].value;
	
	var initialCost = xCost*quantity;
	orderForm.elements.initialCost.value = formatUSCurrency(initialCost);
	
	//This was supposed to add the cost of the protection cost, but I can't get it working.
	var yCost = document.querySelector('input:checked').value*quantity;
	orderForm.elements.protectionCost.value = formatNumber(yCost, 2);
	
	//This figures out the final total without tax.
	orderForm.elements.subtotal.value = formatNumber(initialCost + yCost, 2);
	
	//This will get a five percent amount of the total, and add it as tax
	var salesTax = 0.05*(initialCost + yCost);
	orderForm.elements.salesTax.value = formatNumber(salesTax, 2);
	
	//This adds the tax to the final total
	var totalCost = initialCost + yCost + salesTax;
	orderForm.elements.totalCost.value = formatUSCurrency(totalCost);
   
}
//This formats the numbers to a simple 2 sigit leftover at all times.
function formatNumber(val, decimals) {
	return val.toLocaleString(undefined,{minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}
//This adds an additional dollar sign at the front of the values.
function formatUSCurrency(val) {
	return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}