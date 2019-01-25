    //initial array for animals
    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", 
                    "goldfish", "bird", "parrot", "turtle",
                    "squirrel", "crab", "gerbil", "goat",];

// Function for dumping the JSON content for each button into the div
function displayAnimalInfo(){
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);    

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response)  {
        console.log(response);
        


        var results = response.data;
       


            for(var i = 0; i < results.length; i++) {

                var animalDiv = $("<div class=gif>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                
                
                animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate', results[i].images.fixed_height.url);
                animalImage.attr('data-state', 'still');
                animalImage.addClass('gif');
                
                animalDiv.append(p);
                animalDiv.append(animalImage);
                
                $("#gifs-appear-here").prepend(animalDiv);

                console.log(rating);

            }
            $(".gif").on("click", function(){
                var state = $(this).attr("data-state");
                console.log(state); 
            
                if(state === 'still'){
                  var dataAnimate = $(this).attr("data-animate");
                  $(this).attr("src", dataAnimate);
                  $(this).attr('data-state','animate' );
                } else {
                  var dataStill = $(this).attr("data-still");
                  $(this).attr("src", dataStill);
                  $(this).attr('data-state','still' );
                }
            
            });

        });

         
    }
    


    // // Function for displaying animal data
    function renderButtons() {
        $("#buttons-view").empty();
        
        for(var i = 0; i < animals.length; i++){
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-animal", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-animal").on("click", function(event){
        event.preventDefault();

        var animal = $("#animal-input").val().trim();

        animals.push(animal);

        renderButtons();
    });



$(document).on("click", ".animal", displayAnimalInfo);

renderButtons();

