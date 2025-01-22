document.getElementById("calculateBtn").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const income = parseFloat(document.getElementById("income").value) || 0;
    const loan = parseFloat(document.getElementById("loan").value) || 0;
    const investment = parseFloat(document.getElementById("investment").value) || 0;
    const gender = document.getElementById("gender").value;

    const outputName = document.getElementById("outputName");
    const outputTaxableAmount = document.getElementById("outputTaxableAmount");
    const outputPayableTax = document.getElementById("outputPayableTax");

    const taxLabel = document.querySelector(".output-section");

    if (!name || !income || !gender) {
        alert("Please fill in all required fields.");
        return;
    }

    const loanExemption = Math.min(loan * 0.8, income * 0.2);
    const investmentExemption = Math.min(investment, 100000);
    const totalExemption = loanExemption + investmentExemption;
    const incomeAfterExemptions = income - totalExemption;

    let taxFreeAmount;
    switch (gender) {
        case "male":
            taxFreeAmount = 240000;
            break;
        case "female":
            taxFreeAmount = 260000;
            break;
        case "senior":
            taxFreeAmount = 300000;
            break;
        default:
            taxFreeAmount = 240000; 
    }
    const taxableIncome = Math.max(incomeAfterExemptions - taxFreeAmount, 0);

    let payableTax = 0;
    if (taxableIncome > 0 && taxableIncome <= 600000) {
        payableTax = taxableIncome * 0.1;
    } else if (taxableIncome > 600000) {
        payableTax = (600000 - taxFreeAmount) * 0.1 + (taxableIncome - 600000) * 0.2;
    }

    outputName.textContent = name;
    outputTaxableAmount.textContent = `₹${taxableIncome.toFixed(2)}`;
    outputPayableTax.textContent = `₹${payableTax.toFixed(2)}`;

    if (payableTax === 0) {
        taxLabel.style.backgroundColor = "lightgreen"; 
    } else {
        taxLabel.style.backgroundColor = "navy"; 
        taxLabel.style.color = "white"; 
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("income").value = "";
    document.getElementById("loan").value = "";
    document.getElementById("investment").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("outputName").textContent = "";
    document.getElementById("outputTaxableAmount").textContent = "";
    document.getElementById("outputPayableTax").textContent = "";
    document.querySelector(".output-section").style.backgroundColor = "transparent";
});
