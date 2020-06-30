import api from './api';

class App{
  constructor() {
    this.repositorios = [];

    this.formEl = document.getElementById('repo-form');
    this.inputEl = document.querySelector('input[name=repository]');
    this.listEl = document.getElementById('repo-list');

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0)
      return;

    const reponse = await api.get(`/repos/${repoInput}`);
    
    const {name, description, html_url, owner:{ avatar_url}} = reponse.data;

    this.repositorios.push({
      name,
      description,
      avatar_url,
      html_url,
    });

    this.render();
  }

  render(){
    this.listEl.innerHTML = '';

    this.repositorios.forEach(repo =>{
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement('p');
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let htmlEl = document.createElement('a');
      htmlEl.setAttribute('target', '_blank');      
      htmlEl.setAttribute('href',repo.html_url);
      htmlEl.appendChild(document.createTextNode('Acessar'));

      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(htmlEl);

      this.listEl.appendChild(listItemEl);

    });
  }
}

new App();