
// TO DO:
// 2. NEED TO WRITE A FUNCTION THAT WILL TAKE IN EXERCISE, SETS, REPS, WEIGHT AND ORGANIZES INTO DOM
// OR FUNCTION TAKES IN CLASS NAME AND HTML VALUE SINCE THOSE ARE THEY KEY VALUE PAIRS
// 3. NEED TO CALL THIS FUNCTION WITH VALUES FROM FORM DATA
// 4. NEED TO CLEAR FORM AFTER SUBMISSION


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



const insertExercise = function insertExercise (key, value){

// CHECK IF IT IS REST DAY AND INSERT 'REST DAY' INTO DOM
  if(value === 'on'){
    let day = key.split('-')[0];
    const restDay = document.getElementById(`${day}-display`);
    const rest = document.createElement('p');
    rest.innerText = 'Rest day';
    restDay.insertAdjacentElement('afterend', rest);
  }

// NEED TO WRITE CODE TO PUT EXERCISES INTO DOM

}


const onCreateWorkout = function onCreateWorkout (event){

  // GETTING FORM
  const displaySection = document.getElementById('display-workout-section');
  const form = document.getElementById('workout-form');

  const request = new XMLHttpRequest();

  request.open('POST', 'https://httpbin.org/post', /* async = */ false);
  const data = new FormData(form);

  request.send(data);

  console.log(JSON.parse(request.response).form);

// PARSES RESPONSE TO JSON AND THEN GETS FORM
  const createdWorkout = JSON.parse(request.response).form



// ONCE I CAN ACCESS THE FORM DATA I NEED TO CALL FUNCTION IN THIS LOOP TO INSERT ELEMNTS INTO DOM
  for(const key in createdWorkout){
    const value = createdWorkout[key];
    console.log(key);
    console.log(createdWorkout[key])

    insertExercise(key, value);
  }

  displaySection.style.display = 'block';
}
