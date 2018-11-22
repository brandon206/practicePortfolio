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
            field: '.subject-input',
            regex: /\w{3,}/,
            message: 'subject must be at least 3 characters'
        },
        {
            field: '.message-input',
            regex: /\w{3,}/,
            message: 'message must be at least 3 characters'
        }        
    ]

    var errors = 0;
    for(let i=0; i< testValues.length; i++){
        var value = $( testValues[i].field ).val();
        if( testValues[i].regex.test( value )){
            displayError(testValues[i].field, '');
        } else {
            displayError(testValues[i].field, testValues[i].message);
            errors++;
        }        
    }

    if(errors ===0){
        $.ajax({
            url: 'http://localhost:3000/sendEmail',
            method: 'post',
            dataType: 'json',
            data: {
                name: $('.name-input').val(),
                email: $('.email-input').val(),
                subject: $('.subject-input').val(),
                message: $('.message-input').val()
            },
            success: function (data) {
                console.log(data);
            }
        })
    }
}

function displayError( input, message ){
    $(input).parent().find('.error-message').text( message );
}