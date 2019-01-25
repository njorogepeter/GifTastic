    //initial array for animals
    var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle",
        "sugar", "glider", "chinchilla", "hedgehog", "hermit", "crab", "gerbil", "pygmy", "goat",
        "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];

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

                var animalDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                
                
                animalImage = $("<img>");
                animalImage.attr("src", results[i].images.fixed_height.url);
                
                animalDiv.append(p);
                animalDiv.append(animalImage);
                
                $("#gifs-appear-here").prepend(animalDiv);

                console.log(rating);

            }

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
renderButtons();


