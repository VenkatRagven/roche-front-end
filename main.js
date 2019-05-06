import users from './users.js'

Promise.all(users.userNames()
.map(name => fetch(`https://api.github.com/users/${name}/repos?per_page=1000`)))
.then(users => Promise.all(users.map(user => user.json())))
.then(data => data.map(datum => new User(datum)))
.then(appendUsersToDom)
.catch(console.log);

class User {
  constructor(data) {
    this.name = data[0].owner.login;
    this.projects = data.length;
    this.stars = data
    .reduce((allStars, {stargazers_count}) => allStars += stargazers_count, 0)
  }

}

function appendUsersToDom(users) {
  const tableBody = document.querySelector('.user-list__table > tbody');
  users.forEach(user => {
    const tr = document.createElement('tr');
    const name = document.createElement('td');
    const projects = document.createElement('td');
    const stars = document.createElement('td');

    name.innerText = `Name : ${user.name}`;
    projects.innerText = `Projects : ${user.projects}`;
    stars.innerText = `Stars : ${user.stars}`;

    tr.append(name);
    tr.append(projects);
    tr.append(stars);

    tableBody.append(tr);
  });
}
