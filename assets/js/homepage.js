var getUserRepos = function(user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
    //asynchronous behavior: set aside the fetch request and continue to implement the rest of the code.
};

getUserRepos("hfang821");