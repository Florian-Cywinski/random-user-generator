// We are going to build a random user generator like it is on https://randomuser.me
function fetchUser() {  // The function to fetch random user data from a public API
    showSpinner();  // To have a spinner effect during the fetch
    
    fetch('https://randomuser.me/api')  // The URL
    // fetch('https://randomuser.me/api1')  // To mime an error
        .then(response => { 
            if (!response.ok) { // If the response isn't okay
                throw new Error('Request Failed')   // To return an error message (it's caught in the .catch)
            }

            return response.json() // To get the fetch response
        })  
        .then(data => { // The fetched data
            hideSpinner();  // To stop the spinner effect after the fetch
            displayUser(data.results[0])    // Call of the function displayUser - the input (data.results[0]) is the first element of an array which contains all data we need
        })
        .catch(errorMessage => {
            hideSpinner();  // To hide the spinner effect in case of an error (when the response isn't okay)
            document.getElementById('user').innerHTML = `<p class="text-xl text-center text-red-500 mb-5">${errorMessage}</p>`; // To show the error message in the DOM
        })
}


function displayUser(user) {    // user = data.results[0] (the first element of an array which contains all data we need)
    const userDisplay = document.getElementById('user');    // To select the user div ehere we want to put everything in
    
    // An if-else statement to change the backgroundcolor for male or female
    if (user.gender === 'female') {
        document.body.style.backgroundColor = 'rebeccapurple';
    } else {
        document.body.style.backgroundColor = 'steelblue';
    }

    userDisplay.innerHTML = `         
    <div class="flex justify-between">
        <div class="flex">
        <img
            class="w-48 h-48 rounded-full mr-8"
            src="${user.picture.large}"
        />
        <div class="space-y-3">
            <p class="text-xl">
            <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
            </p>
            <p class="text-xl">
            <span class="font-bold">Email: </span> ${user.email}
            </p>
            <p class="text-xl">
            <span class="font-bold">Phone: </span> ${user.phone}
            </p>
            <p class="text-xl">
            <span class="font-bold">Location: </span> ${user.location.city} ${user.location.country}
            </p>
            <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
        </div>
        </div>
    </div>`

}

// The following two functions are to display the spinner effect or not
function showSpinner() {
    document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
    document.querySelector('.spinner').style.display = 'none';
}

// To select the button and to add an event listener on it to fetch the user data
document.getElementById('generate').addEventListener('click', fetchUser);

fetchUser();    // To call the function which fetches the data