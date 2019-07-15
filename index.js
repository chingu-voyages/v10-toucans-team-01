
// TO DO:
// 2. NEED TO WRITE A FUNCTION THAT WILL TAKE IN EXERCISE, SETS, REPS, WEIGHT AND ORGANIZES INTO DOM
// 3. NEED TO CALL THIS FUNCTION WITH VALUES FROM FORM DATA


const onAddExercise = function onAddExercise(){
  // get element id
  const id = event.target.id;

  // get button clicked on
  const clickedDay = document.getElementById(id);

  // get input field
  const exerciseInputs = clickedDay.previousElementSibling.innerHTML;

  // create new row and add inner html
  const newRow = document.createElement('div');
  newRow.classList.add('form-row');
  newRow.innerHTML = exerciseInputs;

  // insert new element into DOM
  clickedDay.insertAdjacentElement('beforebegin', newRow);
}



const onCreateWorkout = function onCreateWorkout (event){

  // GETTING FORM
  const displaySection = document.getElementById('display-workout-section');
  console.log(document.getElementById('workout-form'));
  const form = document.getElementById('workout-form');

  const request = new XMLHttpRequest();

  request.open('POST', 'https://httpbin.org/post', /* async = */ false);
  const data = new FormData(form);

  request.send(data);
  console.log(request.response);

  displaySection.style.display = 'block';
}



// FUNCTION TO DISABLE BUTTONS WHEN REST DAY IS CHECKED
const disableButtons = function disableButtons(inputClass) {

  const inputs = document.getElementsByClassName(inputClass);

  // TAKES OUT -NON TO GET "NAME" ATTRIBUTE OF DAY;
  const index = inputClass.indexOf('-non');
  const nameAttrName = inputClass.slice(0, index) + inputClass.slice(index + 4);

  // GET CHECKBOX INPUT FOR SPECIFIC DAY
  const restDay = document.getElementsByName(nameAttrName);

  // TOGGLE THE DISABLE
  for(const obj of inputs){
      obj.disabled = restDay[0].checked;
  }
}
