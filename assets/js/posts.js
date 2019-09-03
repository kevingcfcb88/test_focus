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
            $.each(json, function (id, value) {
                const urlNameGender = "https://api.genderize.io/?name="+getSingleName(value.name);
                ajaxCall(urlNameGender, function(json){
                    var sDiv = "<img class='joe' src='//joeschmoe.io/api/v1/"+json.gender+"/random'><div id='"+id+"' class='user'>" + value.name + "</div>";
                    $("#content").append(sDiv);
                    const urlPostByUser = "https://jsonplaceholder.typicode.com/posts?userId="+id;
                    ajaxCall(urlPostByUser, function(jsonPost){
                        var sPosts = "<ul>";
                        for (i = 0; i < jsonPost.length; i++){
                            sPosts += "<li>"+jsonPost[i].title+"</li>";
                        }
                        sPosts += "</ul>";
                        document.getElementById(id).insertAdjacentHTML('beforeend', sPosts);
                    });
                });                
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
                //alert("The request is complete!");
            });
    }

    /**
     * Function created to return the first names without titles
     * sName Full Name
     * return the First name without titles
     */
    function getSingleName(sName){
        var aName = sName.split(" ");
        if(aName[0] === "Mr." || aName[0] === "Mrs."){
            return aName[1];
        }else{
            return aName[0];
        }
    }

});