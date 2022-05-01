How app should be installed:

1. Cloning the React App
   by using command git clone:
   git clone ‘the code URL of the github repo’

2. Configuring your Cloned App
   npm install

3. Starting the React app
   run npm start on terminal.

How it works

Initialized the state by calling useState with two values current value and the function that is used to update.

Created constant formData and setFormData with initial state an object with names: description, vat, confirms, priceNetto – have an empty value.

Added attributes name and value equal formData.name to each input field to control the input value

Created the function handleChange for updating state formData. Added event handler onChange with function handleChange to each input filed

For the validation form, initialize a new state click and setClick with the initial state true. The added paragraph under each input with a conditional statement. These paragraphs will be shown when we try to send the form but our field has an incorrect value. Also for input priceNetto created a constant with value regular expression

The value of the input with the label Price Brutto EUR is calculated using the value from “Price netto EUR” text input and value from vat selector. At this field, added attribute readonly with value true. Initialize new state bruttoValue and function setBruttoValue with empty initial state. Function setBruttoValue with counting added to useEffect. UseEffect will be rerender when value priceNetto or vat changed.

Created the function sendRequest, with three parameters method URL and body equal null, for form sends via Ajax to rest API. At this function created a new promise and at this promise created a new object XMLHTTPRequest. We indicate that we want to receive data in json format. Created function onload which processes data and error responses from API. And created function send with parameter body.

For hid form and show success box after submitting, initialize new state showModal and set ShowModal with initial state true. And created a component Success Modal with text about success response.

For sending our form to an API created function handleSubmit where we add preventDefault used for don’t refresh the page after submitting, also added contional statetment if input value incorrect, state click will be changed from true on false and showed paragraf with message about error, else form is vallid, form will be send to a rest api by function sendRequest with paramatres method post, URL rest api and body is formData object. If will be success status value of formData will be reset , click changed from false on true, showModal changed from true on false and form be hedden and showed Success Modal.
