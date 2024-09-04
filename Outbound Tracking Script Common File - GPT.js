// Function to get query parameters from the URL
function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to get the current date and time
function getCurrentDateTime() {
    var now = new Date();
    var visitDate = now.toLocaleDateString(); // Get the local date
    var visitTime = now.toLocaleTimeString(); // Get the local time
    return { visitDate, visitTime };
}

// Function to send data to Google Sheets
function sendDataToGoogleSheet(firstName, lastName, email, campaign, asset, redirectUrl) {
    if (email) { // Check if the email exists to validate the visit
        var currentDateTime = getCurrentDateTime();
        fetch('https://script.google.com/macros/s/AKfycbyrcz0fm-osTsX-NDW4Pog9jnHuDp49GDDJniAQRluerJm89IP3hh0oOZLDZXU6OVks/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                campaign: campaign,
                asset: asset,
                visitDate: currentDateTime.visitDate,
                visitTime: currentDateTime.visitTime
            }),
        })
        .then(response => {
            console.log('Success:', response);
            window.location.href = redirectUrl;
        })
        .catch((error) => {
            console.error('Error:', error);
            window.location.href = redirectUrl;
        });
    } else {
        window.location.href = redirectUrl;
    }
}

// Main function to handle the page logic
function handlePageLogic(redirectUrl) {
    var firstName = getQueryParam('firstName');
    var lastName = getQueryParam('lastName');
    var email = getQueryParam('email');
    var campaign = getQueryParam('campaign');
    var asset = getQueryParam('asset');

    console.log(firstName, lastName, email, campaign, asset);

    if (firstName && lastName && email && campaign && asset) {
        sendDataToGoogleSheet(firstName, lastName, email, campaign, asset, redirectUrl);
    } else {
        window.location.href = redirectUrl;
    }
}
