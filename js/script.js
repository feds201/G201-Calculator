document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const questionElement = document.getElementById('question');
    const sectionHeadingElement = document.getElementById('section-heading');
    const currentQuestionElement = document.getElementById('current-question');
    const currentQuestionDisplayElement = document.getElementById('current-question-display');
    const totalQuestionsElement = document.getElementById('total-questions');
    const totalQuestionsDisplayElement = document.getElementById('total-questions-display');
    const answerInput = document.getElementById('answer-input');
    const errorMessage = document.getElementById('error-message');
    const nextButton = document.getElementById('next-btn');
    const backButton = document.getElementById('back-btn');
    const resultContainer = document.getElementById('result');
    const questionCard = document.querySelector('.question-card');
    const actionsContainer = document.querySelector('.actions');
    const progressBar = document.getElementById('progress-bar');
    const restartButton = document.getElementById('restart-btn');
    const resultSummary = document.getElementById('result-summary');
    const ecoTip = document.getElementById('eco-tip');
    const ecoScore = document.getElementById('eco-score');
    const finalEcoScore = document.getElementById('final-eco-score');
    const resultMessage = document.getElementById('result-message');
    const meterPointer = document.getElementById('meter-pointer');
    const materialsImpact = document.getElementById('materials-impact');
    const transportImpact = document.getElementById('transport-impact');
    const energyImpact = document.getElementById('energy-impact');
    const customRecommendations = document.getElementById('custom-recommendations');

    // Define questions
    const questions = [
        {
            section: "I. Shipping and Packaging of Products",
            question: "What was the total weight (in kg) of the packages that you transported?",
            hint: "Enter an integer between 500-1500 kg",
            type: "int",
            min: 1,
            max: 1500,
            eco_tip: "Every kg of package weight contributes to carbon emissions during transport.",
            eco_impact: "high",
            category: "materials"
        },
        {
            section: "II. Disposable Meal Items",
            question: "How many boxes of 50 paper plates did you use?",
            hint: "Enter an integer between 25-1500",
            type: "int",
            min: 1,           
            max: 1500,
            eco_tip: "Paper plates can be composted, but reusable dishes are more eco-friendly.",
            eco_impact: "medium",
            category: "materials"
        },
        {
            section: "II. Disposable Meal Items",
            question: "How many boxes of 150 plastic forks did you use?",
            hint: "Enter an integer between 25-1000",
            type: "int",
            min: 1,
            max: 1000,
            eco_tip: "Plastic utensils are difficult to recycle. Consider bamboo or other biodegradable alternatives.",
            eco_impact: "high",
            category: "materials"
        },
        {
            section: "II. Disposable Meal Items",
            question: "How many packets of 75 napkins did you use?",
            hint: "Enter an integer between 50-2000",
            type: "int",
            min: 1,
            max: 2000,
            eco_tip: "Paper napkins have a high environmental cost. Consider cloth napkins for team events.",
            eco_impact: "medium",
            category: "materials"
        },
        {
            section: "II. Disposable Meal Items",
            question: "How many cartons of 50 water bottles did you use?",
            hint: "Enter an integer between 200-4000",
            type: "int",
            min: 1,
            max: 4000,
            eco_tip: "Single-use plastic bottles have a significant environmental impact. Reusable bottles are much better.",
            eco_impact: "high",
            category: "materials"
        },
        {
            section: "III. Robot Components",
            question: "How much old wires (in kg) did you waste?",
            hint: "Enter a decimal value",
            type: "double",
            min: 1,
            max: 1000,
            eco_tip: "Electronic waste contains valuable materials that can be recycled properly.",
            eco_impact: "medium",
            category: "materials"
        },
        {
            section: "III. Robot Components",
            question: "How many cardboard boxes/pieces did you use for prototyping?",
            hint: "Enter an integer between 25-100",
            type: "int",
            min: 1,
            max: 100,
            eco_tip: "Cardboard is recyclable, but try to reuse it for multiple prototypes when possible.",
            eco_impact: "low",
            category: "materials"
        },
        {
            section: "III. Robot Components",
            question: "How many 20 by 20 aluminum bars and parts did you use in total?",
            hint: "Enter an integer value",
            type: "int",
            min: 1,
            max: 1000,
            eco_tip: "Aluminum has a high environmental cost to produce, but is highly recyclable.",
            eco_impact: "medium",
            category: "materials"
        },
        {
            section: "III. Robot Components",
            question: "How much lumber (in kgs) did you use?",
            hint: "Enter a decimal value",
            type: "double",
            min: 1,
            max: 1000,
            eco_tip: "Sustainable lumber is a renewable resource but still has environmental impact.",
            eco_impact: "medium",
            category: "materials"
        },
        {
            section: "III. Robot Components",
            question: "How many batteries died in total?",
            hint: "Enter an integer value",
            type: "int",
            min: 1,
            max: 100,
            eco_tip: "Batteries contain harmful chemicals and should be properly recycled.",
            eco_impact: "high",
            category: "energy"
        },
        {
            section: "IV. 3-D Printing Materials",
            question: "How much filament waste (in kg) did you waste in total?",
            hint: "Enter a decimal value",
            type: "double",
            min: 1,
            max: 100,
            eco_tip: "3D printing filament is often made from plastics that are difficult to recycle.",
            eco_impact: "medium",
            category: "materials"
        },
        {
            section: "V. Transportation to/from comps",
            question: "What was your mileage from your vehicle in total through trips?",
            hint: "Enter an integer value",
            type: "int",
            min: 1,
            max: 10000,
            eco_tip: "Transportation is a major contributor to carbon emissions.",
            eco_impact: "high",
            category: "transport"
        },
        {
            section: "V. Transportation to/from comps",
            question: "How much fuel (in Liters) did you use in total while pulling a trailer or during a trip?",
            hint: "Enter a decimal value",
            type: "double",
            min: 1,
            max: 1000,
            eco_tip: "Every liter of fuel burned produces CO2 emissions that contribute to climate change.",
            eco_impact: "high",
            category: "transport"
        }
    ];

    let currentQuestionIndex = 0;
    let answers = [];
    let currentEcoScore = 0;
    
    // Initialize quiz
    function initQuiz() {
        currentQuestionIndex = 0;
        answers = [];
        currentEcoScore = 100; // Start with perfect score
        ecoScore.textContent = currentEcoScore;
        displayQuestion();
        totalQuestionsElement.textContent = questions.length;
        totalQuestionsDisplayElement.textContent = questions.length;
        resultContainer.classList.add('hidden');
        questionCard.classList.remove('hidden');
        actionsContainer.classList.remove('hidden');
        updateProgressBar();
        
        // Hide back button on first question
        backButton.classList.add('hidden');
    }
    
    // Display current question
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        sectionHeadingElement.textContent = question.section;
        questionElement.textContent = question.question;
        currentQuestionElement.textContent = currentQuestionIndex + 1;
        currentQuestionDisplayElement.textContent = currentQuestionIndex + 1;
        
        // Set input attributes based on question type
        answerInput.value = answers[currentQuestionIndex] ? answers[currentQuestionIndex].answer : '';
        answerInput.min = question.min;
        answerInput.max = question.max;
        answerInput.step = question.type === 'int' ? '1' : '0.01';
        answerInput.placeholder = `Enter value (${question.min}-${question.max})`;
        
        // Update hint
        document.querySelector('.input-hint').innerHTML = `<i class="fas fa-info-circle"></i> ${question.hint}`;
        
        // Update eco tip
        ecoTip.textContent = question.eco_tip;
        
        // Clear error message
        errorMessage.textContent = '';
        
        // Show/hide back button based on question index
        if (currentQuestionIndex === 0) {
            backButton.classList.add('hidden');
        } else {
            backButton.classList.remove('hidden');
        }
        
        // Focus on the input
        setTimeout(() => {
            answerInput.focus();
        }, 100);
        
        updateProgressBar();
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = progress + '%';
    }
    
    // Validate the current answer
    function validateAnswer() {
        const question = questions[currentQuestionIndex];
        const value = answerInput.value.trim();
        
        if (value === '') {
            errorMessage.textContent = 'Please enter a value';
            return false;
        }
        
        const numValue = parseFloat(value);
        
        if (isNaN(numValue)) {
            errorMessage.textContent = 'Please enter a valid number';
            return false;
        }
        
        if (question.type === 'int' && !Number.isInteger(numValue)) {
            errorMessage.textContent = 'Please enter an integer value';
            return false;
        }
        
        if (numValue < question.min || numValue > question.max) {
            errorMessage.textContent = `Value must be between ${question.min} and ${question.max}`;
            return false;
        }
        
        return true;
    }
    
    // Calculate eco impact for an answer
    function calculateEcoImpact(question, value) {
        const normalizedValue = (value - question.min) / (question.max - question.min);
        
        let impactFactor;
        switch (question.eco_impact) {
            case 'high':
                impactFactor = -15;
                break;
            case 'medium':
                impactFactor = -10;
                break;
            case 'low':
                impactFactor = -5;
                break;
            default:
                impactFactor = -10;
        }
        
        // More usage = more impact = lower score
        // Using normalized value to calculate impact
        return normalizedValue * impactFactor;
    }
    
    // Update eco score based on current answer
    function updateEcoScore() {
        const question = questions[currentQuestionIndex];
        const value = parseFloat(answerInput.value);
        
        const impact = calculateEcoImpact(question, value);
        currentEcoScore = Math.max(0, Math.min(100, currentEcoScore + impact));
        ecoScore.textContent = Math.round(currentEcoScore);
    }
    
    // Handle next button click
    nextButton.addEventListener('click', function() {
        if (!validateAnswer()) return;
        
        // Update eco score BEFORE saving the answer
        updateEcoScore();
        
        // Save answer
        answers[currentQuestionIndex] = {
            question: questions[currentQuestionIndex].question,
            answer: answerInput.value,
            section: questions[currentQuestionIndex].section,
            category: questions[currentQuestionIndex].category
        };
        
        // Move to next question or finish quiz
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            finishQuiz();
        }
    });
    
    // Handle back button click
    backButton.addEventListener('click', function() {
        currentQuestionIndex--;
        displayQuestion();
    });
    
    // Handle input enter key
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            nextButton.click();
        }
    });
    
    // Clear error on input change
    answerInput.addEventListener('input', function() {
        errorMessage.textContent = '';
    });
    
    // Calculate overall impact for a category
    function calculateCategoryImpact(category) {
        let totalImpact = 0;
        let count = 0;
        
        questions.forEach((question, index) => {
            if (question.category === category && answers[index]) {
                const value = parseFloat(answers[index].answer);
                const normalized = (value - question.min) / (question.max - question.min);
                
                let weight;
                switch (question.eco_impact) {
                    case 'high': weight = 3; break;
                    case 'medium': weight = 2; break;
                    default: weight = 1;
                }
                
                totalImpact += normalized * weight;
                count += weight;
            }
        });
        
        return count > 0 ? totalImpact / count : 0;
    }
    
    // Generate recommendations based on answers
    function generateRecommendations() {
        let recommendations = [];
        
        // Materials recommendations
        const materialsImpact = calculateCategoryImpact('materials');
        if (materialsImpact > 0.7) {
            recommendations.push("<div class='recommendation-item'><i class='fas fa-check-circle'></i><span>Consider using digital documentation instead of paper whenever possible</span></div>");
            recommendations.push("<div class='recommendation-item'><i class='fas fa-check-circle'></i><span>Implement a materials recycling program for your workspace</span></div>");
        }
        
        // Transport recommendations
        const transportImpact = calculateCategoryImpact('transport');
        if (transportImpact > 0.6) {
            recommendations.push("<div class='recommendation-item'><i class='fas fa-check-circle'></i><span>Plan trips more efficiently to reduce fuel consumption</span></div>");
            recommendations.push("<div class='recommendation-item'><i class='fas fa-check-circle'></i><span>Consider using electric vehicles or hybrids for team transport</span></div>");
        }
        
        // Energy recommendations
        const energyImpact = calculateCategoryImpact('energy');
        if (energyImpact > 0.5) {
            recommendations.push("<div class='recommendation-item'><i class='fas fa-check-circle'></i><span>Implement a battery recycling program</span></div>");
            recommendations.push("<div class='recommendation-item'><i class='fas fa-check-circle'></i><span>Ensure all electronics are turned off when not in use</span></div>");
        }
        
        return recommendations;
    }
    
    // Finish quiz and show results
    function finishQuiz() {
        questionCard.classList.add('hidden');
        actionsContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        // Round eco score for display
        const finalScore = Math.round(currentEcoScore);
        finalEcoScore.textContent = finalScore;
        
        // Set meter pointer position
        const pointerPosition = (finalScore / 100) * 100;
        meterPointer.style.left = `${pointerPosition}%`;
        
        // Set result message based on score
        if (finalScore >= 80) {
            resultMessage.textContent = "Excellent! Your team is very eco-conscious. Keep up the great work!";
        } else if (finalScore >= 60) {
            resultMessage.textContent = "Your team is making good progress toward sustainability, but there's room for improvement.";
        } else if (finalScore >= 40) {
            resultMessage.textContent = "Your team needs to make more efforts to reduce environmental impact.";
        } else {
            resultMessage.textContent = "Your team has a significant environmental footprint. Urgent action is recommended.";
        }
        
        // Set category impact messages
        const matImpact = calculateCategoryImpact('materials');
        const transImpact = calculateCategoryImpact('transport');
        const enImpact = calculateCategoryImpact('energy');
        
        // Materials impact text
        if (matImpact > 0.7) {
            materialsImpact.textContent = "Your team uses a large amount of disposable materials. Consider reducing waste and recycling more.";
        } else if (matImpact > 0.4) {
            materialsImpact.textContent = "Your team used a moderate amount of disposable items. Consider reducing single-use plastics.";
        } else {
            materialsImpact.textContent = "Great job minimizing material usage! Your team shows strong awareness of waste reduction.";
        }
        
        // Transport impact text
        if (transImpact > 0.7) {
            transportImpact.textContent = "Your team's travel has a significant carbon footprint. Consider carpooling and trip optimization.";
        } else if (transImpact > 0.4) {
            transportImpact.textContent = "Your travel resulted in carbon emissions that could be reduced with more efficient planning.";
        } else {
            transportImpact.textContent = "Your team is managing transportation efficiently with minimal environmental impact.";
        }
        
        // Energy impact text
        if (enImpact > 0.7) {
            energyImpact.textContent = "High battery usage indicates potential for improvement in energy management.";
        } else if (enImpact > 0.4) {
            energyImpact.textContent = "Battery usage is within reasonable limits, but proper disposal and recycling are essential.";
        } else {
            energyImpact.textContent = "Excellent energy management! Your team is minimizing battery waste.";
        }
        
        // Generate custom recommendations
        const customRecs = generateRecommendations();
        if (customRecs.length > 0) {
            customRecommendations.innerHTML = customRecs.join('');
        }
        
        // Generate result summary HTML
        let summaryHTML = '<h3>Your Detailed Responses:</h3>';
        let currentSection = '';
        
        answers.forEach((answer, index) => {
            if (currentSection !== answer.section) {
                currentSection = answer.section;
                summaryHTML += `<h4>${currentSection}</h4>`;
            }
            
            summaryHTML += `<p><strong>Q${index + 1}:</strong> ${answer.question}<br>
                          <strong>A:</strong> ${answer.answer}</p>`;
        });
        
        resultSummary.innerHTML = summaryHTML;
    }
    
    // Restart quiz
    restartButton.addEventListener('click', function() {
        initQuiz();
    });
    
    // Initialize the quiz
    initQuiz();
});
