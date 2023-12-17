// Grades and classes
const grades = [1, 2];
const classes = { '1': [4, 5, 6], '2': [4, 5, 6] };

const classDetails = {
    '1-4': new Set([...Array(22).keys()].slice(1)),
    '1-5': new Set([...Array(22).keys()].slice(1)),
    '1-6': new Set([...Array(21).keys()].slice(1)),
    '2-4': new Set([...Array(22).keys()].slice(1)),
    '2-5': new Set([...Array(23).keys()].slice(1)),
    '2-6': new Set([...Array(23).keys()].slice(1)),
};

// Remove specific student numbers (결번)
classDetails['1-4'].delete(5);
classDetails['1-5'].delete(16);
classDetails['1-5'].delete(6);
classDetails['1-6'].delete(1);
classDetails['2-5'].delete(2);
classDetails['2-6'].delete(15);

// Generate all valid combinations
let combinations = [];
for (const grade of grades) {
    for (const classNum of classes[grade.toString()]) {
        const studentNumbers = classDetails[`${grade}-${classNum}`];
        studentNumbers.forEach(studentNum => {
            combinations.push({ grade, classNum, studentNum });
        });
    }
}

// Shuffle the combinations
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(combinations);

// Copy of original combinations for availability tracking

let availableCombinations = [...combinations];
// Function to animate selection
function animateSelection(displayElement, options, finalValue, interval = 50, repetitions = 20) {
    let count = 0;
    const animation = setInterval(() => {
        const randomValue = options[Math.floor(Math.random() * options.length)];
        displayElement.innerText = randomValue;
        count++;
        if (count >= repetitions) {
            clearInterval(animation);
            displayElement.innerText = finalValue;
        }
    }, interval);
}


// Function to select and display grade
document.getElementById('gradeBox').addEventListener('click', () => {
    const gradeCombinations = availableCombinations.filter(item => grades.includes(item.grade));
    if (gradeCombinations.length > 0) {
        const selected = gradeCombinations[Math.floor(Math.random() * gradeCombinations.length)];
        selectedGrade = selected.grade;
        animateSelection(document.getElementById('gradeDisplay'), grades.map(g => `${g} 학년`), `${selectedGrade} 학년`);
        document.getElementById('classDisplay').innerText = '반';
        document.getElementById('studentDisplay').innerText = '번';
        document.getElementById('gradeBox').style.display = 'none';
    } else {
        document.getElementById('gradeDisplay').innerText = "No more grades!";
    }
});

// Function to select and display class
document.getElementById('classBox').addEventListener('click', () => {
    if (selectedGrade !== null) {
        const classCombinations = availableCombinations.filter(item => item.grade === selectedGrade && classes[selectedGrade.toString()].includes(item.classNum));
        if (classCombinations.length > 0) {
            const selected = classCombinations[Math.floor(Math.random() * classCombinations.length)];
            selectedClass = selected.classNum;
            if (selectedGrade !== null) {
                animateSelection(document.getElementById('classDisplay'), classes[selectedGrade.toString()].map(c => `${c} 반`), `${selectedClass} 반`);
            }
            document.getElementById('studentDisplay').innerText = '번';
            document.getElementById('classBox').style.display = 'none';
        } else {
            document.getElementById('classDisplay').innerText = "남은 반 없음!";
        }
    }
});

// Function to select and display student number
document.getElementById('studentBox').addEventListener('click', () => {
    if (selectedGrade !== null && selectedClass !== null) {
        const studentCombinations = availableCombinations.filter(item => item.grade === selectedGrade && item.classNum === selectedClass);
        if (studentCombinations.length > 0) {
            const selected = studentCombinations[Math.floor(Math.random() * studentCombinations.length)];
            if (selectedGrade !== null && selectedClass !== null) {
                const studentOptions = [...classDetails[`${selectedGrade}-${selectedClass}`]];
                animateSelection(document.getElementById('studentDisplay'), studentOptions.map(n => `${n} 번`), `${selected.studentNum} 번`);
                document.getElementById('studentBox').style.display = 'none';
            }
            // Remove the selected combination from available combinations
            availableCombinations = availableCombinations.filter(item => item !== selected);
        } else {
            document.getElementById('studentDisplay').innerText = "남은 번호 없음!";
        }
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    document.getElementById('gradeBox').style.display = 'inline-block';
    document.getElementById('gradeDisplay').innerText = '학년';
    document.getElementById('classBox').style.display = 'inline-block';
    document.getElementById('classDisplay').innerText = '반';
    document.getElementById('studentBox').style.display = 'inline-block';
    document.getElementById('studentDisplay').innerText = '번';
});

// Initial setup
document.getElementById('gradeBox').style.display = 'inline-block';
document.getElementById('gradeDisplay').innerText = '학년';
document.getElementById('classBox').style.display = 'inline-block';
document.getElementById('classDisplay').innerText = '반';
document.getElementById('studentBox').style.display = 'inline-block';
document.getElementById('studentDisplay').innerText = '번';