# SendMailWidget

How it works:
The widget is responsive.
User enters email address and click on add icon on the right or tab out of the text box to finish typing email.
User can delete the entered email by clicking in the email input box and pressing backspace when input box is empty or by clicking on the cross sign over the email box.
Validations will trigger when Send Mail button is clicked. 
If form is valid, it will be serialized and sent with an AJAX request to server.
A message will be displayed above the Send Mail button based on AJAX request’s response using success and error callback functions. 
In success, form data will be cleared.
This widget will take maximum 2 email address at a time. 
Also, if user enters a long email addresses, it will be shown with ellipses once he has done entering email. 

Note: 
The required AJAX calls which will be needed to GET/POST the data from/to server is written.
But these calls will go into error callback function as the server to handle these requests doesn’t exist. 
So, some success callback code is added in error callback as well.
