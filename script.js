// The form is now handled by Kit's embedded form
// Calendly handles the booking flow and redirect
// This file is kept for any future custom functionality that may be needed

// Listen for messages from Kit form
window.addEventListener('message', function(event) {
    // Verify the origin is from Kit
    if (event.origin !== 'https://hideout-golf-club.kit.com') return;

    try {
        const data = event.data;
        console.log('Received data from Kit:', data); // Debug log
        
        // Check if this is a form submission event
        if (data && data.type === 'form_submit') {
            // Extract form data
            const formData = data.data;
            console.log('Form data:', formData); // Debug log
            
            // Construct URL for booking page with form data
            const bookingUrl = new URL('booking.html', window.location.href);
            
            // Add form data as URL parameters
            if (formData.email) bookingUrl.searchParams.set('email', formData.email);
            
            // Handle first and last name separately
            if (formData.fields) {
                const firstName = formData.fields['First Name'] || '';
                const lastName = formData.fields['Last Name'] || '';
                bookingUrl.searchParams.set('firstName', firstName);
                bookingUrl.searchParams.set('lastName', lastName);
                
                // Handle phone number
                if (formData.fields.phone) {
                    const formattedPhone = formData.fields.phone.replace(/\D/g, '');
                    bookingUrl.searchParams.set('phone', formattedPhone);
                }
            }
            
            console.log('Redirecting to:', bookingUrl.toString()); // Debug log
            
            // Redirect to booking page
            window.location.href = bookingUrl.toString();
        }
    } catch (error) {
        console.error('Error processing form submission:', error);
    }
});
