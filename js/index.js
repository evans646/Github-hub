/* 
  index.js
*/
$(document).ready(function () {
  "use strict";
  var resultList = $("#resultList");
  resultList.text("This is from jQuery");

  var toggleButton = $("#toggleButton");
  toggleButton.on("click", function () {
    resultList.toggle(500);

    if (toggleButton.text() == "Hide") toggleButton.text("Show");
    else toggleButton.text("Hide");
  });

  var listItems = $("header nav li");
  listItems.css("font-weight", "bold");
  listItems.filter(":first").css("font-size", "18px");

  $("#gitHubSearchForm").on("submit", function () {
    var searchPhrase = $("#searchPhrase").val();
    var useStars = $("#useStars").val();
    var langChoice = $("#langChoice").val();

    if (searchPhrase) {

      resultList.text("Performing search...");

      var gitHubSearch = "https://api.github.com/search/repositories?q=" + encodeURIComponent(searchPhrase);

      if (langChoice != "All") {
        gitHubSearch += "+language:" + encodeURIComponent(langChoice);
      }

      if (useStars) {
        gitHubSearch += "&sort=stars";
      }

      $.get(gitHubSearch)
        .success(function (r) {
          //console.log(r.items.length);
          displayResults(r.items);
        })
        .fail(function (err) {
          console.log("Failed to query GitHub");
        })
        .done(function () {
          //
        });
    }
    return false;
  });
  
  
  function displayResults(results) {
    resultList.empty();
    $.each(results, function (i, item) {

      var newResult = $("<div class='result'>" +
        "<div class='title'>" + item.name + "</div>" +
        "<div>Language: " + item.language + "</div>" +
        "<div>Owner: " + item.owner.login + "</div>" +
        "</div>");

      newResult.hover(function () {
        // make it darker
        $(this).css("background-color", "lightgray");
      }, function () {
        //reverse
        $(this).css("background-color", "transparent");
      });
      resultList.append(newResult);
    });
  }
});
