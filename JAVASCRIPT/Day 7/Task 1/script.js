document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("loginButton");

    usernameInput.addEventListener("blur", function () {
        if (usernameInput.value.trim().length >= 3) {
            usernameInput.classList.remove("is-invalid");
            usernameInput.classList.add("is-valid");
        } else {
            usernameInput.classList.remove("is-valid");
            usernameInput.classList.add("is-invalid");
        }
    });

    passwordInput.addEventListener("blur", function () {
        if (passwordInput.value.trim().length >= 8) {
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");
        } else {
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");
        }
    });

    loginButton.addEventListener("click",async function () {

        event.preventDefault();

        const isUsernameValid = usernameInput.classList.contains("is-valid");
        const isPasswordValid = passwordInput.classList.contains("is-valid");

        const enteredUsername = usernameInput.value;
        const enteredPassword = passwordInput.value;


        if (!isUsernameValid || !isPasswordValid) {
            alert("Please fill out all fields correctly.");
        } else {
            alert("Fields validated correctly")
        }

        if (!enteredUsername || !enteredPassword) {
            alert("Please fill out all fields.");
            return;
        }

        try{
            // const proxyUrl = "https://cors-anywhere.herokuapp.com/";
            const apiUrl = "http://trainingsampleapi.satva.solutions/api/auth/login";
            const response = await fetch(apiUrl, {
                method: `POST`,
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    Email: enteredUsername,
                    Password: enteredPassword,
                }),
            })

            if(response.ok){
                const data = await response.json();
                const token  = data.token;

                if (token) {
                    localStorage.setItem("jwtToken", token);
                    alert("Login Successful!");
                    window.location.href = "dashboard.html";
                }else{
                    alert("Failed to retrieve token");
                }
            }else{
                const errorData = await response.json();
                alert(errorData.message || "Login failed. Please check your credentials.");
            }
        }catch(error){
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again later.");
        }
    });
});