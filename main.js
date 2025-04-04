// Form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Collect form data
  const formData = new FormData(form);
  
  // If "Other" practice is checked but input is empty, remove it
  const otherCheckbox = document.getElementById('practiceOther');
  const otherInput = document.getElementById('otherPracticeInput');
  if (otherCheckbox.checked && !otherInput.value.trim()) {
    formData.delete('practices[]');
  }
  
  // Send data to server
  fetch('survey_handler.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Show notification with server response
      notificationMessage.textContent = data.message;
      notification.classList.add('show');
      
      // Hide notification after delay
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
      
      // Optional: Reset form if successful
      if (data.success) {
        form.reset();
        updateProgress();
        document.querySelectorAll('.option-item').forEach(item => {
          item.classList.remove('selected');
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      notificationMessage.textContent = 'An error occurred. Please try again.';
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    });
});