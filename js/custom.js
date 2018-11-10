$(document).ready(function(){
    $("#send-button").click( sendEmail );
})


function sendEmail(){
    const email = $('.email-input').val();

    const testValues = [
        {
            field: '.name-input',
            regex: /[a-zA-Z ]{3,}/,
            message: 'name is invalid'
        },
        {
            field: '.email-input',
            regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'email is invalid'
        },    
        {
            field: '.age-input',
            regex: /\d{1,3}/,
            message: 'age is invalid'
        },        
    ]

    for(let i=0; i< testValues.length; i++){
        var value = $( testValues[i].field ).val();
        if( testValues[i].regex.test( value )){
            displayError(testValues[i].field, '');
        } else {
            displayError(testValues[i].field, testValues[i].message);
        }        
    }
}

function displayError( input, message ){
    $(input).parent().find('.error-message').text( message );
}