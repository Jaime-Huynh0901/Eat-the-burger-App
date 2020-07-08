// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

    // Add a new burger.
    $("#addburger").on("click", event => {
        event.preventDefault();

        const newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then( () => {
            console.log("created new burger");
            location.reload();
        });
    });

    $(".eatburger").on("click", event => {
        event.preventDefault();

        let id = event.target.dataset.id;
        console.log(id);
        const devouredState = {
            devoured: true
        };

        // Send the PUT request.
        $.ajax(`/api/burgers/${id}`, {
            type: "PUT",
            data: devouredState
        }).then( () => {
            console.log("Burger devoured");
            location.reload();
        });
    });


})