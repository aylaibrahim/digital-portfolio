const modal = document.getElementById('window');
const folderButton = document.querySelector('.folder-button');
const closeModal = document.querySelector('.window-control.close');

folderButton.addEventListener('click', () => {
    modal.style.display = 'block'; 
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const folderButtons = document.querySelectorAll('.folder-button');
const windows = document.querySelectorAll('.window');
const closeButtons = document.querySelectorAll('.window-control.close');

folderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        const target = button.getAttribute('data-target');

        if (type === 'pdf') {
            window.open(target, '_blank');
        } else if (type === 'link') {
            window.open(target, '_blank');
        } else {
            const targetWindowId = button.id.replace('-folder', '-window');
            const targetWindow = document.getElementById(targetWindowId);
            if (targetWindow) {
                targetWindow.style.display = 'block';
            }
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const windowToClose = button.closest('.window');
        if (windowToClose) {
            windowToClose.style.display = 'none';
        }
    });
});

window.addEventListener('click', (event) => {
    windows.forEach((window) => {
        if (event.target === window) {
            window.style.display = 'none';
        }
    });
});

let currentProject = 0;
const projects = [
    {
        title: "Capybara Game",
        image: "images/project1.png",
        tags: ["Java", "JavaFX", "SQL", "University"],
        description: "This project was done in Apache NetBeans for Programming Technology class. The goal is to guide the capybara through the forest to gather baskets and avoid crocodiles. It features 10 randomly generated levels and 3 base health. When the game ends, the player has the option to write their name and save their score in the database, however only top 10 scores are displayed (based on speed difficulty achieved within a round).",
        githubLink: "https://github.com/aylaibrahim/capybara-game"
    },
    {
        title: "Dress-up Game",
        image: "images/project2.png",
        tags: ["HTML", "CSS", "JavaScript", "Personal"],
        description: "This project is a Web based Dress-up game. I drew all the assets using Procreate and utilized the JavaScript and CSS together to allow the clothes to be layered and their visibility to be toggled on top of a base body. It is hosted through GitHub Pages and is currently an ongoing project as I intend to add more clothing designs and “game” functionality.",
        githubLink: "https://aylaibrahim.github.io/dressup-game/" 
    },
    {
        title: "Matching Game",
        image: "images/project3.png",
        tags: ["Python", "PyGame", "University"],
        description: "A simple card matching game. (Information to be added, and source code to be uploaded to github).",
        githubLink: "https://github.com/aylaibrahim/matching-game"
    },
    {
        title: "Valentines Game",
        image: "images/project4.png",
        tags: ["HTML", "CSS", "Personal"],
        description: "A simple valentines day project. (More info to be added).",
        githubLink: "https://github.com/aylaibrahim/valentines-2025" 
    },
    {
        title: "Philosophy Website",
        image: "images/project5.png",
        tags: ["HTML", "CSS", "JavaScript", "University"],
        description: "A simple philosophy themed website for Web Developement class. (More info to be added).",
        githubLink: "https://aylaibrahim.github.io/philosophy-website/" 
    },
    {
        title: "Environment Simulator",
        image: "images/project6.png",
        tags: ["C#", "University"],
        description: "Description to be added.",
        githubLink: "https://github.com/aylaibrahim/environment-simulator" 
    }
];

function changeProject(direction) {
    const projectContent = document.querySelector('.project-content');
    projectContent.classList.add('fade-out');

    setTimeout(() => {
        currentProject += direction;

        if (currentProject < 0) {
            currentProject = projects.length - 1;
        } else if (currentProject >= projects.length) {
            currentProject = 0;
        }

        updateProject();
        projectContent.classList.remove('fade-out');
    }, 500);
}

function updateProject() {
    const project = projects[currentProject];
    const projectImage = document.querySelector('.project-image img');
    const projectTitle = document.querySelector('.project-details h2');
    const projectTags = document.querySelector('.project-tags');
    const projectDescription = document.querySelector('.project-description p');
    const githubButton = document.querySelector('.project-image button');

    projectImage.src = project.image;
    projectTitle.textContent = project.title;
    projectTags.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    projectDescription.textContent = project.description;

    if (project.githubLink) {
        githubButton.style.display = 'block';
        githubButton.onclick = () => window.open(project.githubLink, '_blank');
    } else {
        githubButton.style.display = 'none';
    }
}

updateProject();

var words = document.getElementsByClassName('word');
var wordArray = [];
var currentWord = 0;

words[currentWord].style.opacity = 1;
for (var i = 0; i < words.length; i++) {
  splitLetters(words[i]);
}

function changeWord() {
  var cw = wordArray[currentWord];
  var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
  for (var i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }
  
  for (var i = 0; i < nw.length; i++) {
    nw[i].className = 'letter behind';
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }
  
  currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = 'letter out';
  }, i*80);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = 'letter in';
  }, 340+(i*80));
}

function splitLetters(word) {
  var content = word.innerHTML;
  word.innerHTML = '';
  var letters = [];
  for (var i = 0; i < content.length; i++) {
    var letter = document.createElement('span');
    letter.className = 'letter';
    letter.innerHTML = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }
  
  wordArray.push(letters);
}

changeWord();
setInterval(changeWord, 4000);