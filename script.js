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

const dockIcons = document.querySelectorAll('.dock .icon');

dockIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        const name = icon.getAttribute('data-name');
        const type = icon.getAttribute('data-type');
        const target = icon.getAttribute('data-target');

        if (type === 'pdf' || type === 'link') {
            window.open(target, '_blank');
        } else {
            const targetWindowId = `${name}-window`;
            const targetWindow = document.getElementById(targetWindowId);

            if (targetWindow) {
                windows.forEach((window) => {
                    window.style.display = 'none';
                });
                targetWindow.style.display = 'block';
            } else {
                console.error(`Window with ID "${targetWindowId}" not found.`);
            }
        }
    });
});
