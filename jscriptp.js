function openGallery(galleryId) {
    document.querySelectorAll('.gallery').forEach(gallery => {
        gallery.style.display = 'none';
    });

    document.getElementById(galleryId).style.display = 'block';

    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    alert('Your message has been sent!'); 
    this.reset();
});
