$(document).ready(function () {

    renderUsers();

    /** JQuery Calls */

    $("#post").on("click", function () {
        renderPosts();
    });

    /** Functions */
    function renderUsers() {
        const urlUsers= "https://jsonplaceholder.typicode.com/users";
        ajaxCall(urlUsers, function(json){
            console.log(json);
            $.each(json, function (id, value) {
                const urlNameGender = "https://api.genderize.io/?name="+getSingleName(value.name);
                var sGender = "";
                ajaxCall(urlNameGender, function(json){
                    sGender = json.gender;
                });
                var sDiv = "<img src='//joeschmoe.io/api/v1/"+sGender+"/random'><div id='"+id+"' class='user'>" + value.name + "</div>";
                $("#content").append(sDiv);
            }); 
        });
    }

    function ajaxCall(url, callback) {
        $.ajax({
            // The URL for the request
            url: url,
            // Whether this is a POST or GET request
            type: "GET",
            // The type of data we expect back
            dataType: "json",
        })
            // Code to run if the request succeeds (is done);
            // The response is passed to the function
            .done(function (json) {
                callback(json);
            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                alert("Sorry, there was a problem!");
            })
            // Code to run regardless of success or failure;
            .always(function (xhr, status) {
                alert("The request is complete!");
            });
    }

    function getSingleName(sName){
        var aName = sName.split(" ");
        if(aName[0] === "Mr." || aName[0] === "Mrs."){
            return aName[1];
        }else{
            return aName[0];
        }
    }

});