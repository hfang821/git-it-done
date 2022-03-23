var issueContainerEl = document.querySelector("#issues-container");
var limitWaningEl = document.querySelector("#limit-warning");


var getRepoIssues = function (repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //when request was successful
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                displayIssues(data);

                //check if api has paginated issues: There will be no "Link" element in the Network Response Headers if less than 30 issues.
                if (response.headers.get("Link")){
                    displayWarning(repo);
                }
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
    if(issues.length === 0){
        issueContainerEl.textContent = "this repo has no open issues!";
        return;
    }
    for(var i=0; i < issues.length; i++) {
    //create a link element to take users to the issue on Github
    var issueEl = document.createElement("a");
    issueEl.classList="list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    //create a new tab instead of replacing current webpage.
    issueEl.setAttribute("target", "_blank");

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    
    //append to container
    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    //check if issue is an actual issue or a pul request
    if(issues[i].pull_request){
        typeEl.textContent = "(Pull Request)";
    } else {
        typeEl.textContent = "(Issue)";
    }

    //append to <a> container
    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
    }

};

var displayWarning = function(repo) {
    //add text to warning container
    limitWaningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWaningEl.appendChild(linkEl);
};

getRepoIssues("hfang821/git-it-done");