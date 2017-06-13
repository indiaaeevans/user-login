$(function() {

    var displayname = "test";
    //--------------------------------------------------
    // This runs when a new user signs up
    //--------------------------------------------------
    $("#signupbutton").on("click", function(event) {
        
        event.preventDefault();

        // check if all fields are filled
        if ( $("input.newuser").val() ) {

            var userEmail = $("#newUserEmail").val().trim();
            var userPassword = $("#newUserPassword").val().trim();
            var userName = $("#newUserName").val().trim();

            // This will create a new object to go into the database
            var newUser = {
                name: userName,
                email: userEmail,
                password: userPassword,
            };

            console.log(newUser);
            
            // send to the database
            $.post("/api/signup", newUser, function() {

                displayname = newUser.name + "\'s";

                alert(displayname + " profile has been added to the database!");                
                

            }).fail(function(data) {

                alert("There was an error creating your user profile.");

            });
            // // This will get the users to identify the last user
            // $.get("/api/user", getUserIds)

        } else {
            $(".alertUser").text("Please fill all required fields.");
        }
    
    });