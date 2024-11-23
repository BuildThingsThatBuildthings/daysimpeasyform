// The form is now handled by Kit's embedded form
// Calendly handles the booking flow and redirect
// This file is kept for any future custom functionality that may be needed

// Listen for messages from Kit form
window.addEventListener('message', function(event) {
    // Verify the origin is from Kit
    if (event.origin !== 'https://hideout-golf-club.kit.com') return;

    try {
        const data = event.data;
        console.log('Received data from Kit:', data);
        
        // Check if this is a form submission event
        if (data && data.type === 'form_submit') {
            // Extract form data
            const formData = data.data;
            console.log('Form data:', formData);
            
            // Construct Calendly URL with prefill data
            const calendlyUrl = new URL('https://calendly.com/hideoutgolf/member-for-a-day');
            
            // Add Calendly configuration parameters
            calendlyUrl.searchParams.set('hide_landing_page_details', '1');
            calendlyUrl.searchParams.set('hide_gdpr_banner', '1');
            calendlyUrl.searchParams.set('background_color', 'ffffff');
            calendlyUrl.searchParams.set('text_color', '000000');
            calendlyUrl.searchParams.set('primary_color', '000000');
            calendlyUrl.searchParams.set('hide_event_type_details', '1');
            
            // Add form data as URL parameters
            if (formData.email) {
                calendlyUrl.searchParams.set('email', formData.email);
            }
            
            // Handle first and last name
            if (formData.fields) {
                const firstName = formData.fields['First Name'] || formData.fields['first_name'] || '';
                const lastName = formData.fields['Last Name'] || formData.fields['last_name'] || '';
                
                if (firstName) calendlyUrl.searchParams.set('first_name', firstName);
                if (lastName) calendlyUrl.searchParams.set('last_name', lastName);
                
                // Handle phone number
                const phone = formData.fields['phone'] || formData.fields['Phone'] || '';
                if (phone) {
                    const formattedPhone = phone.replace(/\D/g, '');
                    calendlyUrl.searchParams.set('a1', formattedPhone);
                }
            }
            
            console.log('Redirecting to Calendly:', calendlyUrl.toString());
            
            // Redirect directly to Calendly
            window.location.href = calendlyUrl.toString();
        }
    } catch (error) {
        console.error('Error processing form submission:', error);
    }
});
