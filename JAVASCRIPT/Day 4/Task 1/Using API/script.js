$(document).ready(function () {


    $.ajax({
        url: "https://countriesnow.space/api/v0.1/countries",
        method: 'GET',
        success: function (response) {
            const countries = response.data;
            $('#country').append(
                countries.map(
                    (country) => `<option value="${country.country}">${country.country}</option>`
                )
            );
        },
        error: function () {
            alert('Failed to load countries.');
        },
    });



    $('#country').change(function () {
        const countryName = $(this).val();

        $('#state').html('<option value="">Select State</option>');
        $('#district').html('<option value="">Select District</option>').prop('disabled', true);

        if (countryName) {
            $.ajax({
                url: `https://countriesnow.space/api/v0.1/countries/states`,
                method: 'POST',
                data: JSON.stringify({country:countryName}),
                contentType: `application/json`,
                success: function (response) {
                    const states = response.data.states;
                    $(`#state`).append(
                        states.map(
                            (state) => `<option value="${state.name}">${state.name}</option>`
                        )
                    ).prop(`disabled`, false)
                },
                error: function () {
                    alert("Failed to load states");
                },
            });
        }else{
            $('#state').prop(`disabled`, true);
        }
    });


    $(`#state`).change(async function() {
        const stateName = $(this).val();
        const countryName = $("#country").val();
        $('#district').html('<option value="">Select District</option>');
    
        if (stateName && countryName) {
            try {
                const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                    method: "POST",     
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ country: countryName, state: stateName })
                });
                const data = await response.json();
                const cities = data.data;
    
                cities.forEach(city => {
                    $('#district').append(`<option value="${city}">${city}</option>`);
                });
                $('#district').prop(`disabled`, false);
            } catch (error) {
                console.error("Error fetching districts:", error);
                $('#district').html('<option value="">Failed to load districts</option>').prop('disabled', true);
            }
        } else {
            $('#district').prop('disabled', true).html('<option value="">Select District</option>');
        }
    });
});