// Example queryURL for Giphy API
var queryURL =
  "https://api.giphy.com/v1/topics/trending?api_key=HHB4i4dH0Kihm4USGZhvn7gXw2EI4y8p";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});


      // Initial array of topics
      var topics = ["Torus", "Vesica Piscis", "Flower of Life", "Seed of Life", "Tree of Life", "Ankhs", "Metatron's Cube", "Icosidodecahedron", "Golden Mean Spiral"];

      // displayGifInfo function re-renders the HTML to display the appropriate content
      function displayGifInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&apikey=HHB4i4dH0Kihm4USGZhvn7gXw2EI4y8p";

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // Creating a div to hold the gif
          var gifDiv = $("<div class='gif'>");

          // Storing the rating data
          var rating = response.data[0].rating;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          gifDiv.append(pOne);

          // Storing the release year
          var released = response.Released;

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);

          // Displaying the release year
          gifDiv.append(pTwo);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);

          // Appending the plot
          gifDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          gifDiv.append(image);

          // Putting the entire gif above the previous topics
          $("#gifs-view").prepend(gifDiv);
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
          a.addClass("gif-btn");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a gif button is clicked
      $("#add-topic").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        if (topic != "") {
        // Adding gif from the textbox to our array
        topics.push(topic);
        // Calling renderButtons which handles the processing of our gif array
        renderButtons();
        }

      });

      // Adding a click event listener to all elements with a class of "gif-btn"
      $(document).on("click", ".gif-btn", displayGifInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();