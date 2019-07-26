
// TO DO:
// 7. CLEAR SUBMISSION FORM WITH FORM.RESET() IF X OR CLOSE PRESSED?
// 8. FORM IS RESET IN ONCREATEWORKOUT METHOD, LOSE DATA WHEN YOU NEED TO EDIT
// 9. NEED TO MAKE SURE CREATEFORM IS RESET THOUGH..MAYBE
// 10. NEED TO RESET THE DOM SO IT WILL YOU CANT CREATE WORKOUT ON TOP OF WORKOUT

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
  const day = inputClass.slice(0, index);
  const nameAttrName = day + inputClass.slice(index + 4);

  // GET CHECKBOX INPUT FOR SPECIFIC DAY
  const restDay = document.getElementsByName(nameAttrName);

  // TOGGLE THE DISABLE
  for(const obj of inputs){
      obj.disabled = restDay[0].checked;
  }

  const addExerciseButton = document.getElementById(`add-${day}-exercise`);
  addExerciseButton.disabled = restDay[0].checked;
}



const insertExercise = function insertExercise (key, value){

  const day = key.split('-')[0];
  const headerDay = document.getElementById(`${day}-display`);
  let exerciseBox;

// CHECK IF IT IS REST DAY AND INSERT 'REST DAY' INTO DOM
  if(value === 'on'){
    exerciseBox = document.createElement('div');
    exerciseBox.classList.add('exercise-box');

    const rest = document.createElement('p');
    rest.innerText = 'Rest day';
    exerciseBox.appendChild(rest);
    headerDay.insertAdjacentElement('afterend', exerciseBox);
  } else if(value !== ''){

      // IF NOT A REST DAY, INSERT EXERCISE AND INFO
      const action = key.split('-')[1];
      let input = [...value]

// TAKES CARE OF DAYS WITH ONLY ONE EXERCISE CREATES ARRAY INSTEAD OF STRING
      if(typeof(value) === 'string'){
        input = [value];
       }

      for(let i = input.length - 1; i >= 0; i--){
        if(action === 'exercise'){
          exerciseBox = document.createElement('div');
          exerciseBox.style.display = 'flex';
          exerciseBox.classList.add('exercise-box')
          exerciseBox.setAttribute('id', `${day}-exercise-box-${i}`);
          headerDay.insertAdjacentElement('afterend', exerciseBox);
        }

        const inputValue = document.createElement('p');

// ADDS SETS, REPS AND POUNDS TO INPUTS, LEAVES EXERCISE AS IS
        if(action === 'sets' || action === 'reps'){
          inputValue.innerText = `${input[i]} ${action}`;
        }else if(action === 'weight'){
          inputValue.innerText = `${input[i]} pounds`;
        }else{
          inputValue.innerText = input[i];
        }

        exerciseBox = document.getElementById(`${day}-exercise-box-${i}`);
        exerciseBox.insertAdjacentElement('beforeend', inputValue);
      }
  }
}

// SAVES FORM TO CALL IN EDIT FORM
const saveForm = function saveForm(){
  const savedForm = document.getElementById('workout-form');
  // const enteredForm = savedForm;
  // onCreateWorkout(enteredForm);

  return savedForm;
}


const onCreateWorkout = function onCreateWorkout (){

  // GETTING FORM
  const displaySection = document.getElementById('display-workout-section');
  const form = saveForm();
  // const form = document.getElementById('workout-form');
  // const form = enteredForm;

  if(form.checkValidity()){

// IF ALERT IS SHOWING AND NOW FORM IS VALID HIDE ALERT
    if(document.getElementById('incomplete-alert')){
      document.getElementById('incomplete-alert').remove();
    }

    const request = new XMLHttpRequest();
    request.open('POST', 'https://httpbin.org/post', /* async = */ false);

    const data = new FormData(form);
    request.send(data);

  // PARSES RESPONSE TO JSON AND THEN GETS FORM
    const createdWorkout = JSON.parse(request.response).form

  // LOOPS THROUGH OBJECT AND CALLS INSERTEXERCISE TO INSERT INFO INTO DOM
    for(const key in createdWorkout){
      const value = createdWorkout[key];

      // CALL INSERT EXERCISE FUNCTION ON KEY VALUE PAIRS
      insertExercise(key, value);
    }

    // NEED TO FIGURE OUT HOW TO MAKE CREATE DIFFERENT FROM EDIT, BOTH STILL HAVE ALL FORM DATA,
    // MULTIPLE WORKOUTS, STORED IN ARRAY?

    // if(document.getElementById('display-section')){
    //   form.reset();
    // }



    // ENABLES BUTTONS THAT HAVE BEEN DISABLED TO RESET
    for(let i = 0; i < form.length; i++){
      if(form[i].disabled){
        form[i].disabled = false;
      }
    }

    form.reset();

    displaySection.style.display = 'block';

  } else if(!document.getElementById('incomplete-alert')){

    // IF NO ALERT EXISTS IN DOM THEN CREATE ONE TO TELL USER TO FILL OUT ENTIRE FORM
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert-container');

    const incompleteAlert = document.createElement('div');
    incompleteAlert.setAttribute('id', 'incomplete-alert');

    const closeButton = document.createElement('button');
    const closeSpan = document.createElement('span');

    incompleteAlert.classList.add('alert', 'alert-warning', 'alert-dismissable', 'fade', 'show');
    incompleteAlert.innerText = 'Please complete the entire workout form before submission.';
    closeButton.classList.add('close');
    closeButton.setAttribute('data-dismiss', 'alert');
    closeButton.setAttribute('type', 'button');
    closeSpan.innerHTML = '&times;';
    closeButton.appendChild(closeSpan);
    incompleteAlert.appendChild(closeButton);
    alertContainer.appendChild(incompleteAlert);
    document.getElementById('form-modal').insertAdjacentElement('afterend', alertContainer);
  }
}

const onEditWorkout = function onEditWorkout(){

  const editModalBody = document.getElementById('edit-modal-body');

    // WILL NEED TO CLEAR DISPLAY-SECTION DOM BEFORE I INSERT THE EDITTED FORM


  editModalBody.insertAdjacentElement('beforeend', saveForm());
  console.log(saveForm());

  // NEED TO DEAL WITH CHECKED REST DAYS


}
