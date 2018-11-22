const credentials = require('./sendgridcredentials.js');

const express = require('express');

const server = express ();

server.use (express.urlencoded ({ extended: false}))

server.post('/sendemail', (request, response) => {
    console.log(request.body);
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(credentials.key);

    const ip = request.headers['x-forwarded-for'] || 
     request.connection.remoteAddress || 
     request.socket.remoteAddress ||
     (request.connection.socket ? request.connection.socket.remoteAddress : null);

    const message = `
    from: ${request.body.email}
    subject: ${request.body.subject}
    message: ${request.body.message}
    `;
    
    const htmlmessage = message.replace(/\n/g,"<br>");

    const msg = {
        to: 'brandonpark206@gmail.com',
        from: 'emaildaemon@gmail.com',
        subject: 'message received from server',
        text: message,
        html: htmlmessage,
    };
    sgMail.send(msg).then( function (sendgridResponse) {
        response.send({success:true});
    });
})

server.listen(3000 , () => {
    console.log('server is listening on port 3000');
})