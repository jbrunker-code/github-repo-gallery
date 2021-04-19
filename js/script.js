//div where profile info appears
const overview = document.querySelector(".overview");
const username = "jbrunker-code";
//ul showing all repos
const repoList = document.querySelector(".repo-list");

//section where repo list appears
const reposElement = document.querySelector(".repos");
//div containing back to repos button
const repoDataElement = document.querySelector(".repo-data");
//button that goes back to repo gallery
const backButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//fetches user data from github API, calls function to display data
async function getData (){
    const retrieve = await fetch (`https://api.github.com/users/${username}`);
    const userData = await retrieve.json();
    displayData(userData);
};

getData();

//creates div that displays user info
function displayData (userData){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>`
    overview.append(div);
    getRepos(username);
};

//fetches repo info from github API, calls function to display repos
async function getRepos (username){
    const retrievedRepoData = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await retrievedRepoData.json();

    displayRepos(repos);
};

//function to add filter input window, creates list items for each repo
function displayRepos (repos){
    filterInput.classList.remove("hide");
    for (let repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(li);
    }
};


//click event for each repo title, calls function to retrieve info about repo
repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//fetches info about specific repo, calls function to display the repo info and its languages
async function getRepoInfo (repoName){
    const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoResponse.json();
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let language in languageData){
        languages.push(language);
    }
    displayRepoInfo(repoInfo, languages);
};

//creates function that creates div displaying repo info, displays back button
function displayRepoInfo(repoInfo, languages){
    repoDataElement.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataElement.append(div);
    repoDataElement.classList.remove("hide");
    reposElement.classList.add("hide");
    backButton.classList.remove("hide");
};

backButton.addEventListener("click", function(){
    reposElement.classList.remove("hide");
    repoDataElement.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    const reposOnPage = document.querySelectorAll(".repo");
    const lowerSearchText = searchText.toLowerCase();
    for (let repo of reposOnPage){
        const lowercaseRepo = repo.innerText.toLowerCase();
        if (lowercaseRepo.includes(lowerSearchText)){
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    };
})