$(document).ready(function () {


    $.getJSON('countries.json', function (countries) {
        $.each(countries, function (index, country) {
            $('#country').append(`<option value="${country.id}">${country.name}</option>`);
        });
    });



    $('#country').change(function () {
        const countryId = $(this).val();
        $('#state').prop('disabled', false).html('<option value="">Select State</option>');
        $('#district').prop('disabled', true).html('<option value="">Select District</option>');

        if (countryId) {
            $.getJSON('state.json', function (states) {
                const filteredStates = states.filter(state => state.countryId === countryId);
                $.each(filteredStates, function (index, state) {
                    $('#state').append(`<option value="${state.id}">${state.name}</option>`);
                });
            });
            alert("loaded successfully");
        } else {
            $('#state').prop('disabled', true).html('<option value="">Select State</option>');
            alert("Unsuccessfull");
        }
    });



    $('#state').change(function () {
        const stateId = $(this).val();
        $('#district').prop('disabled', false).html('<option value="">Select District</option>');

        if (stateId) {
            $.getJSON('district.json', function (districts) {
                const filteredDistricts = districts.filter(district => district.stateId === stateId);
                $.each(filteredDistricts, function (index, district) {
                    $('#district').append(`<option value="${district.id}">${district.name}</option>`);
                });
            });
            alert("loaded successfully");
        } else {
            $('#district').prop('disabled', true).html('<option value="">Select District</option>');
            alert("Unsuccessfull");
        }
    });
});
