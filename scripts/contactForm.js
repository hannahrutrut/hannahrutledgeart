// contactForm.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(form);
                
                // Log what we're sending for debugging
                console.log('Submitting to:', form.action);
                console.log('Form data:', Object.fromEntries(formData));
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Response status:', response.status);
                console.log('Response:', response);
                
                if (response.ok) {
                    formMessage.className = 'alert alert-success';
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    formMessage.style.display = 'block';
                    form.reset();
                } else {
                    const errorText = await response.text();
                    console.error('Error response:', errorText);
                    throw new Error(`Form submission failed: ${response.status}`);
                }
            } catch (error) {
                console.error('Full error:', error);
                formMessage.className = 'alert alert-danger';
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
                formMessage.style.display = 'block';
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }
});