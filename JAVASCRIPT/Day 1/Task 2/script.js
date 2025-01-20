
        var currentTab = 0;
        showTab(currentTab);

        function showTab(n) {
            var x = document.getElementsByClassName("tab");
            x[n].style.display = "block";

            if (n == 0) {
                document.getElementById("previousBtn").style.display = "none";
            } else {
                document.getElementById("previousBtn").style.display = "inline";
            }
            if (n == (x.length - 1)) {
                document.getElementById("nextBtn").innerHTML = "Submit";
            } else {
                document.getElementById("nextBtn").innerHTML = "Next";
            }

            fixStepIndicator(n);
        }

        function nextPrev(n) {
            var x = document.getElementsByClassName("tab");

            if (n == 1 && !validateForm()) return false;

            x[currentTab].style.display = "none";

            currentTab = currentTab + n;

            if (currentTab >= x.length) {
                document.getElementById("multilevelForm").submit();
                return false;
            }

            if (currentTab === x.length - 1) {
                updateReviewTab();
            }

            showTab(currentTab);
        }

        function validateForm() {
            var x = document.getElementsByClassName("tab");
            var currentInputs = x[currentTab].getElementsByTagName("input");
            var currentSelects = x[currentTab].getElementsByTagName("select");
            var valid = true;

            for (let input of currentInputs) {
                if (input.hasAttribute('required')) {
                    if (input.value.trim() === "") {
                        input.classList.add("is-invalid");
                        input.classList.remove("is-valid");
                        valid = false;
                    } else {
                        switch (input.id) {
                            case 'fname':
                                const fnameRegex = /^[A-Za-z]+$/;
                                if (!fnameRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'lname':
                                const lnameRegex = /^[A-Za-z]+$/;
                                if (!lnameRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'email':
                                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                if (!emailRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'zip':
                                const zipRegex = /^\d{5,6}$/;
                                if (!zipRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'accountNumber':
                                const accountNumberRegex = /^\d{12}$/;
                                if (!accountNumberRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'cardNumber':
                                const cardRegex = /^\d{16}$/;
                                if (!cardRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'cvv':
                                const cvvRegex = /^\d{3,4}$/;
                                if (!cvvRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'password':
                                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}/;
                                if (!passwordRegex.test(input.value)) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            case 'confirmPass':
                                const password = document.getElementById('password').value;
                                if (input.value !== password) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                                break;
                            default:
                                if (input.value.trim().length < 2) {
                                    input.classList.add("is-invalid");
                                    input.classList.remove("is-valid");
                                    valid = false;
                                } else {
                                    input.classList.add("is-valid");
                                    input.classList.remove("is-invalid");
                                }
                        }
                    }
                }
            }

            for (let select of currentSelects) {
                if (select.hasAttribute('required')) {
                    if (select.value === "") {
                        select.classList.add("is-invalid");
                        select.classList.remove("is-valid");
                        valid = false;
                    } else {
                        select.classList.add("is-valid");
                        select.classList.remove("is-invalid");
                    }
                }
            }

            if (valid) {
                document.getElementsByClassName("step")[currentTab].className += " finish";
            }

            return valid;
        }

        function fixStepIndicator(n) {
            var i, x = document.getElementsByClassName("step");
            for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
            }
            x[n].className += " active";
        }

        function updateReviewTab() {
            document.getElementById("displayFname").innerText = document.getElementById("fname").value;
            document.getElementById("displayLname").innerText = document.getElementById("lname").value;
            document.getElementById("displayGender").innerText = document.getElementById("gender").value;
            document.getElementById("displayZip").innerText = document.getElementById("zip").value;
            document.getElementById("displayEmail").innerText = document.getElementById("email").value;
            document.getElementById("displayUsername").innerText = document.getElementById("username").value;
            document.getElementById("displayBank").innerText = document.getElementById("bank").value;
            document.getElementById("displayBranch").innerText = document.getElementById("branch").value;
            document.getElementById("displayAccountType").innerText = document.getElementById("accountType").value;
            document.getElementById("displayAccountNumber").innerText = document.getElementById("accountNumber").value;
            document.getElementById("displayCardType").innerText = document.getElementById("cardType").value;
            document.getElementById("displayHolderName").innerText = document.getElementById("holderName").value;
            document.getElementById("displayCardNumber").innerText = document.getElementById("cardNumber").value;
            document.getElementById("displayCvv").innerText = document.getElementById("cvv").value;
            document.getElementById("displayExpiryDate").innerText = document.getElementById("expiryDate").value;
        }

        document.addEventListener('DOMContentLoaded', function () {
            const inputs = document.querySelectorAll('input[required]');
            const selects = document.querySelectorAll('select[required]');

            inputs.forEach(input => {
                input.addEventListener('input', function () {
                    validateField(this);
                });
                input.addEventListener('blur', function () {
                    validateField(this);
                });
            });

            selects.forEach(select => {
                select.addEventListener('change', function () {
                    validateField(this);
                });
            });
        });

        function validateField(field) {
            if (field.value.trim() === "") {
                field.classList.add("is-invalid");
                field.classList.remove("is-valid");
            } else {
                field.classList.add("is-valid");
                field.classList.remove("is-invalid");
            }
        }