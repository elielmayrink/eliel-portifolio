"use strict";

let projects = document.querySelector("#projects");
async function getGithubRepos() {
  const username = "elielmayrink";
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=12`
  );
  const response = await res.json();
  const repos = response.map((repo) => ({
    name: repo.name,
    id: repo.id,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    description: repo.description,
  }));
  for (let i = 0; i < repos.length; i++) {
    const project = document.createElement("div");
    project.className = "project";
    project.innerHTML = `<div class="project-name">
    <img src="./assets/imagens/icons/folder.png" alt="" />
    <h5>${repos[i].name}</h5>
  </div>
  <div class="project-description">
<p>
${
  repos[i].description
    ? repos[i].description
    : "Repositório sem descrição adicional"
}
</p>
  </div>
  <div class="project-complement">
    <div>
      <span>
        <img src="./assets/imagens/icons/star.png" alt="" />
        ${repos[i].stargazers_count}
      </span>
      <span>
        <img src="./assets/imagens/icons/git-branch.png" alt=""/>
        1
      </span>
    </div>
    <div>
      <span>
        <img src="./assets/imagens/icons/Ellipse.png" alt=""/>
        ${repos[i].language ? repos[i].language : "HTML"}
      </span>
    </div>
  </div>`;
    projects.appendChild(project);
  }
}
projects.addEventListener("load", getGithubRepos());
document.querySelectorAll("input[type='radio']").forEach(function (input) {
  input.onclick = function () {
    console.log("aqui");
    document.documentElement.classList.remove(
      ...document.documentElement.classList
    );

    document.documentElement.classList.add(input.id);
  };
});
