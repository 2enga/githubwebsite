/*
	index.js
*/

$(document).ready(function () {

"use strict";
var msg = "Hello JavaScript";
console.log(msg);

var resultsDisplayed = document.getElementById("results");
//resultsDisplayed.innerHTML = "<p>This is from JavaScript</p>";

console.log("msg is : " + typeof(msg));
console.log("resultsDisplayed is : "+ typeof(resultsDisplayed));

var resultList = $("#resultList");
//resultList.text("While this is JQuery");

var toggleButton = $("#toggleButton");
toggleButton.on("click", function(){
	resultList.toggle(500);

	if(toggleButton.text() == "Hide") toggleButton.text("Show");
	else toggleButton.text("Hide");
});

var listItems = $("header nav li");
listItems.css("font-weight", "bold");
listItems.css("font-size", "20px");
listItems.filter(":first").css("font-size", "14px");

$("#githubSearchForm").on("submit", function() {


		var searchPhrase = $("#searchPhrase").val();
		var useStars = $("#useStars").val();
		var langChoice = $("#langChoice").val();

		if(searchPhrase){

			resultList.text("Performing search...");

			var gitHubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);

			if(langChoice != "All"){
				gitHubSearch += "+language:" + encodeURIComponent(langChoice);
			}

			if(useStars){
				gitHubSearch += "&sort=stars";
			}

		   $.get(gitHubSearch)
		   .done(function(r){ // success.function(r) is deprecated so done is supposed to be used instead 
		   //	console.log(r.items.length);
		   displayResults(r.items);
		   })
		   .fail(function(err){
		 	console.log("Failed to query Github");
		   });
		}

	return false;
});

// var results = [{
// 	name: "JQeury",
// 	language: "JavaScript",
// 	Score: 4.5,
// 	showLog: function() {
		
// 	}, 
// 	owner: {
// 		login: "nzenga",
// 		id: 12345
// 	}
// }, {
// 	name: "jQuery UI",
// 	language: "JavaScript",
// 	score: 3.5,
// 	showLog: function(){

// 	},
// 	owner: {
// 		login: "zengasiwingwa",
// 		id: 54545 
// 	}
// }];

function displayResults(results){
	$.each(results, function(i, item) {

	var newResult = $("<div class='result'>" + "</div>" +
	"<div class='title'>" + item.name + "</div>" +
	"<div>Language: " + item.language + "</div>" +
	"<div>Owner: " + item.owner.login + "</div>" +
	"</div>");

	newResult.hover(function(){
		$(this).css("background-color", "lightgray");
	}, function(){
		$(this).css("background-color", "transparent");
	});

	resultList.append(newResult);

	});
}
resultList.empty();

});


