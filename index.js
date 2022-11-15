"use strict";
let projects = document.querySelector("#projects");
async function getGithubRepos() {
  const username = "elielmayrink";
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const response = await res.json();
  for (let i = 0; i < response.length; i++) {
    const project = document.createElement("div");
    project.className = "project";
    project.innerHTML = `<div class="project-name">
    <img src="./assets/imagens/icons/folder.png" alt="" />
    <h5>${response[i].full_name}</h5>
  </div>
  <div class="project-description">
<p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
consectetur iure, reprehenderit molestiae fugiat molestias
</p>
  </div>
  <div class="project-complement">
<div>
<span
  ><img src="./assets/imagens/icons/star.png" alt="" />100</span
>
<span
  ><img
    src="./assets/imagens/icons/git-branch.png"
    alt=""
  />100</span
>
</div>
<div>
<span
  ><img
    src="./assets/imagens/icons/Ellipse.png"
    alt=""
  />javascript</span
>
</div>
  </div>`;
    projects.appendChild(project);
  }
}
projects.addEventListener("load", getGithubRepos());

// getGithubRepos();
