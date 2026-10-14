
const form = document.getElementById("converterForm");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");

const unitNames = {
    C: "Celsius (°C)",
    F: "Fahrenheit (°F)",
    K: "Kelvin (K)"
};

// Convert the input temperature to Celsius first
function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * 5 / 9;
    return value - 273.15;
}

// Convert Celsius to the selected unit
function fromCelsius(celsius, unit) {
    if (unit === "C") return celsius;
    if (unit === "F") return (celsius * 9 / 5) + 32;
    return celsius + 273.15;
}

function formatTemperature(value) {
    return Number(value.toFixed(2)).toString();
}

function showError(message) {
    result.className = "error";
    result.textContent = message;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const value = temperatureInput.value.trim();
    const temperature = Number(value);
    const inputUnit = fromUnit.value;
    const outputUnit = toUnit.value;

    result.className = "";

    // Validate input
    if (value === "" || !Number.isFinite(temperature)) {
        showError("Please enter a valid temperature.");
        return;
    }

    // Check absolute zero in the selected input unit
    const absoluteZero = {
        C: -273.15,
        F: -459.67,
        K: 0
    };

    if (temperature < absoluteZero[inputUnit]) {
        showError(
            "Temperature cannot be below absolute zero (" +
            absoluteZero[inputUnit] + " " + inputUnit + ")."
        );
        return;
    }

    const celsius = toCelsius(temperature, inputUnit);

    let html = "";

    if (outputUnit === "all") {
        html = "<strong>Converted Temperatures</strong><br>";

        ["C", "F", "K"].forEach(function(unit) {
            const converted = fromCelsius(celsius, unit);

            html += '<div class="result-value">' +
                unitNames[unit] + ": " +
                formatTemperature(converted) +
                "</div>";
        });
    } else {
        const converted = fromCelsius(celsius, outputUnit);

        html = "<strong>Conversion Result</strong><br>" +
            '<div class="result-value">' +
            formatTemperature(temperature) + " " + inputUnit +
            " = " +
            formatTemperature(converted) + " " + outputUnit +
            "</div>";
    }

    result.innerHTML = html;
});
