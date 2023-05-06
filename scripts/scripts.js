/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */
// Get HTML elements for content and buttons
const content = document.getElementById('content');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Set initial step and selections
let step = 0;
let selections = {};

// Define steps data
const steps = [
    // Step 1: Welcome
    {
        header: "Ready to find your workout?",
        description: "Answer a few questions to receive a personalized workout recommendation.",
        actionLabel: "Start",
    },
    // Step 2: Workout Type
    {
        header: "What type of workout do you prefer?",
        options: ["Cardio", "Strength Training"],
        actionLabel: "Next",
        image: "images/step_1.png",
    },
    // Step 3: Workout Intensity
    {
        header: "How intense do you like your workouts?",
        options: ["Low Intensity", "Medium Intensity", "High Intensity"],
        actionLabel: "Next",
        image: "images/step_2.png",
    },
    // Step 4: Workout Goal
    {
        header: "What is your workout goal?",
        options: ["Weight Loss", "Muscle Gain"],
        actionLabel: "Next",
        image: "images/step_3.png",
    },
    // Step 5: Workout Duration
    {
        header: "How much time do you have for your workout?",
        options: ["10 Minutes", "30 Minutes"],
        actionLabel: "Next",
        image: "images/step_4.png",
    },
    // Step 6: Workout Recommendation
    {
        header: "Your recommended workout:",
        actionLabel: "Restart",
        image: "images/final.png",
        getContent: () => {
            const recommendation = recommendWorkout(selections);
            return `<p>Based on your selections, we recommend <strong>${recommendation}</strong> as your workout activity. Learn more about options in Boston on the Discover page.</p>`;
        },
    },
];

// Render the current step
function renderStep() {
    const stepData = steps[step];

    // Update the card image
    const cardImage = document.querySelector('.card-img');
    cardImage.src = stepData.image || "images/welcome.png";

    // Generate the HTML content for the step
    let html = `<h2>${stepData.header}</h2>`;
    if (stepData.description) {
        html += `<p>${stepData.description}</p>`;
    }
    if (stepData.options) {
        stepData.options.forEach((option) => {
            const selectedClass = selections[step] === option ? "selected" : "";
            html += `<div class="pill ${selectedClass}" onclick="selectOption('${option}')">${option}</div>`;
        });
    }
    if (stepData.getContent) {
        html += stepData.getContent();
    }

    // Update the content and button labels
    content.innerHTML = html;
    nextBtn.textContent = stepData.actionLabel;

    // Enable/disable previous button
    prevBtn.disabled = step === 0;

    // Enable/disable next button
    nextBtn.disabled = stepData.options && !selections[step];

    // Set the next button's onclick event
    if (step === steps.length - 1) {
        nextBtn.onclick = () => {
            step = 0;
            selections = {};
            renderStep();
        };
    } else {
        nextBtn.onclick = nextStep;
    }
}


function nextStep() {
    if (step < steps.length - 1) {
        step++;
        renderStep();
    }
}

function prevStep() {
    if (step > 0) {
        step--;
        renderStep();
    }
}


function selectOption(option) {
    selections[step] = option;
    renderStep();
}
// Recommend a workout based on the user's selections

function recommendWorkout(selections) {
    const workoutType = selections[1];
    const intensity = selections[2];
    const goal = selections[3];
    const duration = selections[4];

    // Recommend workout based on user's selections
    if (workoutType === "Cardio") {
        if (intensity === "Low Intensity") {
            if (goal === "Weight Loss") {
                return duration === "10 Minutes" ? "Brisk Walking" : "Light Jogging";
            } else {
                return duration === "10 Minutes" ? "Jump Rope" : "Cycling";
            }
        } else if (intensity === "Medium Intensity") {
            if (goal === "Weight Loss") {
                return duration === "10 Minutes" ? "HIIT" : "Running";
            } else {
                return duration === "10 Minutes" ? "Rowing" : "Swimming";
            }
        } else { // High Intensity
            if (goal === "Weight Loss") {
                return duration === "10 Minutes" ? "Sprint Intervals" : "Stair Climbing";
            } else {
                return duration === "10 Minutes" ? "Kickboxing" : "Circuit Training";
            }
        }
    } else { // Strength Training
        if (intensity === "Low Intensity") {
            if (goal === "Weight Loss") {
                return duration === "10 Minutes" ? "Yoga" : "Pilates";
            } else {
                return duration === "10 Minutes" ? "Bodyweight Exercises" : "Resistance Band Training";
            }
        } else if (intensity === "Medium Intensity") {
            if (goal === "Weight Loss") {
                return duration === "10 Minutes" ? "Kettlebell Training" : "Functional Training";
            } else {
                return duration === "10 Minutes" ? "Dumbbell Circuit" : "Barbell Strength Training";
            }
        } else { // High Intensity
            if (goal === "Weight Loss") {
                return duration === "10 Minutes" ? "Plyometrics" : "CrossFit";
            } else {
                return duration === "10 Minutes" ? "Olympic Lifting" : "Powerlifting";
            }
        }
    }
}



renderStep();
