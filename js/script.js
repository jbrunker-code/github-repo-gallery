//div where profile info appears
const overview = document.querySelector(".overview");
const username = "jbrunker-code";
const repoList = document.querySelector(".repo-list");

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
}