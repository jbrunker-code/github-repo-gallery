//div where profile info appears
const overview = document.querySelector(".overview");
const username = "jbrunker-code";
const repoList = document.querySelector(".repo-list");

const reposElement = document.querySelector(".repos");
const repoDataElement = document.querySelector(".repo-data");

async function getData (){
    const retrieve = await fetch (`https://api.github.com/users/${username}`);
    const userData = await retrieve.json();
    console.log(userData);
    displayData(userData);
}

getData();

function displayData (userData){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
    `<figure>
      <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>`
    overview.append(div);
};

async function getRepos (){
    const retrievedRepoData = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await retrievedRepoData.json();
    console.log(repos);
    displayRepos(repos);
};

getRepos();

function displayRepos (repos){
    for (let repo of repos){
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(li);
    }
};

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

async function getRepoInfo (repoName){
    const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await repoResponse.json();
    const fetchLanguages = await fetch ("https://api.github.com/repos/jbrunker-code/github-repo-gallery/languages");
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let language in languageData){
        languages.push(language);
    };
    displayRepoInfo(repoInfo, languages);
};

function displayRepoInfo(repoInfo, languages){
    repoDataElement.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataElement.append(div);
    repoDataElement.classList.remove("hide");
    reposElement.classList.add("hide");
    }