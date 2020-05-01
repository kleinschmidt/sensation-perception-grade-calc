function calculate() {
  const points = [
    parseInt(document.getElementById('midterm1').value),
    parseInt(document.getElementById('midterm2').value),
    parseInt(document.getElementById('final1').value),
    parseInt(document.getElementById('final2').value)
  ];

  // console.log(points);
  
  const possible_points = [
    50,
    50,
    30,
    60
  ];

  let min = 1000;
  let min_i = -1;
  for (let i = 0; i < 4; i++) {
    if (typeof(points[i]) !== 'number' || isNaN(points[i]) ||
        points[i] > possible_points[i] || points[i] < 0) {
      return undefined;
    }
    
    if (points[i] / possible_points[i] < min) {
      min = points[i] / possible_points[i];
      min_i = i;
    }
  }
  
  let total = 0;
  let total_possible = 0;
  for (let i = 0; i < 4; i++) {
    if (i != min_i) {
      total += points[i];
      total_possible += possible_points[i];
    }
  }
  const percentage = total / total_possible * 100;
  return {total, total_possible, percentage};
}

window.addEventListener('input', () => {
  const output = document.getElementById("output");
  const calculated = calculate();
  if (calculated === undefined) {
    output.innerText = "";
  } else {
    const {total, total_possible, percentage} = calculated;
    const letter = grade(percentage);
    output.innerText = `${total} / ${total_possible} (${Math.round(percentage)}%): ${letter}`;
  }
});

function grade(percentage) {
  const percentage_cutoffs = [
    0.0,                        // F
    28.0,                       // D
    45.3,                       // C
    54.0,                       // C+
    62.7,                       // B
    71.3,                       // B+
    80.0,                       // A
  ];
  const grades = ["F", "D", "C", "C+", "B", "B+", "A"];

  let grade_i = 0;
  while (percentage > percentage_cutoffs[grade_i]) grade_i++;
  return grades[grade_i - 1];
    
}

