// Initial array of topics
var topics = [
  "Torus",
  "Vesica Piscis",
  "Flower of Life",
  "Ankhs",
  "Metatron's Cube",
  "Icosidodecahedron",
  "Golden Mean Spiral"
];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {
  var gif = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    gif +
    "&apikey=HHB4i4dH0Kihm4USGZhvn7gXw2EI4y8p&limit=10";

  // Creating an AJAX call for the specific gif button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log("TCL: displayGifInfo -> response", response);

    // Clear the gifs view for the next group of gifs
    $("#gifs-view").empty();

    var numReturnedGifs = response.data.length;

    if (numReturnedGifs > 0) {
        for (var i = 0; i < numReturnedGifs; i++) {
            // Creating a div to hold the gif
            var gifDiv = $('<div class="gif-div">');
      
            // Storing the rating data
            var rating = response.data[0].rating;
      
            // Creating an element to have the rating displayed
            var ratingLine = $("<p>").text("Rating: " + rating);
      
            // Displaying the rating
            gifDiv.append(ratingLine);
      
            // Retrieving the URL for the still image
            var stillImage = response.data[i].images.fixed_height_still.url;
      
            // Retrieving the URL for the still image
            var animatedImage = response.data[i].images.fixed_height.url;
      
            // Creating an image element that stores values for still and animated versions
            var image = $("<img>").attr({
              class: "gif",
              src: stillImage,
              "data-still": stillImage,
              "data-animate": animatedImage,
              "data-state": "still"
            });
      
            // Appending the image
            gifDiv.append(image);
      
            // Putting the entire gif above the previous topics
            $("#gifs-view").append(gifDiv);
          }
    } else {
        $("#gifs-view").html("<h1>No gifs found for this topic</h1>");
    }
    
  });
}

// Function for displaying gif data
function renderButtons() {
  // Deleting the topics prior to adding new topics
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generating buttons for each gif in the array
    var a = $("<button>");
    // Adding a class of gif-btn to our button
    a.addClass("topic-btn btn btn-primary");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

$(".form-inline").submit(function(e){
    return false;
});

// This function handles events where a gif button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var topic = $("#topic-input")
    .val()
    .trim();

  if (topic != "") {
    // Adding gif from the textbox to our array
    topics.push(topic);
    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
  }
  $("#topic-input").val('');
});

$(document).on("click", ".gif", function() {
  console.log("gif clicked");
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".topic-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();