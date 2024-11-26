// Update Last Modified
var lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;

// Add Jungle-Themed Animations
document.addEventListener('DOMContentLoaded', () => {
  const formHeader = document.querySelector('header h1');
  const formFooter = document.querySelector('footer p');

  formHeader.style.transition = 'all 0.5s ease-in-out';
  formFooter.style.transition = 'all 0.5s ease-in-out';

  setTimeout(() => {
    formHeader.style.transform = 'scale(1.1)';
    formHeader.style.color = '#1e6f42';
  }, 500);

  setTimeout(() => {
    formHeader.style.transform = 'scale(1)';
  }, 1000);
});
