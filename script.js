'use strict';

const projectsData = [
  {
    title: 'Portfolio layout',
    description: 'A Portfolio layout ready to be adjusted based on the users preference',
    tech: ['HTML', 'CSS'],
    image: 'port.png',
    link: '#'
  },
  {
    title: 'Music Player',
    description: 'A Spotify inspired music player where u can switch between audio and video',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: 'mplayer.png',
    link: '#'
  },
  {
    title: 'Roblox Map',
    description: 'A interactive Roblox map featuring shops and trading areas.',
    tech: ['Lua'],
    image: 'rblx1.png',
    link: '#'
  },
  {
    title: 'Pokematcher',
    description: 'A dating website layout designed for Pokemon.',
    tech: ['HTML', 'CSS'],
    image: 'pokematch.png',
    link: '#'
  }
];

const searchInput = document.querySelector('#project-search');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectList = document.querySelector('#project-list');
const projectCount = document.querySelector('#project-count');

let activeCategory = 'All';

function filterProjects(projects, searchTerm, category) {
  const cleanSearch = searchTerm ? searchTerm.trim().toLowerCase() : '';

  return projects.filter(function (project) {
    const matchesSearch = cleanSearch === '' || 
      project.title.toLowerCase().includes(cleanSearch) || 
      project.description.toLowerCase().includes(cleanSearch);

    const matchesCategory = category === 'All' || project.tech.includes(category);

    return matchesSearch && matchesCategory;
  });
}

function renderProjects(projectsToRender) {
  if (!projectsToRender || projectsToRender.length === 0) {
    projectCount.textContent = 'Showing 0 of ' + projectsData.length + ' projects.';
    projectList.innerHTML = '<div class="no-results"><p>No projects match your search criteria.</p></div>';
    return;
  }

  projectCount.textContent = 'Showing ' + projectsToRender.length + ' of ' + projectsData.length + ' projects.';

  let htmlContent = '';

  for (const project of projectsToRender) {
    let techItems = '';
    for (const tech of project.tech) {
      techItems += `<li>${tech}</li>`;
    }

    htmlContent += `
      <div class="project-item">
        <div class="project-details">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <ul class="tech-stack">
            ${techItems}
          </ul>
          <div class="project-links">
            <a href="${project.link}" class="visit-link">Visit Site &rarr;</a>
          </div>
        </div>
        <div class="project-image">
          <img src="${project.image}" alt="${project.title} Preview">
        </div>
      </div>
    `;
  }

  projectList.innerHTML = htmlContent;
}

function updateGallery() {
  const currentSearch = searchInput.value;
  const filteredList = filterProjects(projectsData, currentSearch, activeCategory);
  renderProjects(filteredList);
}

searchInput.addEventListener('input', updateGallery);

for (const button of filterButtons) {
  button.addEventListener('click', function () {
    for (const btn of filterButtons) {
      btn.classList.remove('active');
    }
    button.classList.add('active');
    activeCategory = button.getAttribute('data-filter');
    updateGallery();
  });
}

renderProjects(projectsData);