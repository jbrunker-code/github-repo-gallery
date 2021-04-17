//div where profile info appears
const overview = document.querySelector(".overview");
const username = "jbrunker-code";

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
}