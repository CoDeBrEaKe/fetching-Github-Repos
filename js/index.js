//My main Vars
let inputUser = document.querySelector(".get-repos input");
let subButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

subButton.onclick = function(){
    getRepos(inputUser);
};
//Get Repos function
function getRepos(user){
    if (user.value == "")
    {
        return false;
    }else{

        fetch(`https://api.github.com/users/${user.value}/repos`)
        
        .then((res)=>{
          return res.json();
        })
        .then((repos)=>{
            console.log(repos);
            reposData.innerHTML = "";
    
            repos.forEach(repo=>{
    
                //Create Main Div
                let mainDiv = document.createElement("div");
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);

                // Create Repo Url
                let theUrl = document.createElement("a");
                let urlText = document.createTextNode("Visit");
                theUrl.appendChild(urlText);
                theUrl.href = `https://github.com/${user.value}/${repo.name}`;

                theUrl.setAttribute('target' , "_blank");
                mainDiv.appendChild(theUrl);

                let starsSpan = document.createElement("span");

                // Create The Stars Count Text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                // Add Stars Count Text To Stars Span
                starsSpan.appendChild(starsText);

                // Append Stars Count Span To Main Div
                mainDiv.appendChild(starsSpan);

                mainDiv.className = 'repo-box';

                reposData.appendChild(mainDiv);
    
            });
        })
    }
}
