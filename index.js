
// TO DO:1. NEED TO MAKE SURE PROPER DAT IS ON CARDS

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



// NEED TO CREATE A CARD EVERTIME THE FIRST EXERCISE IS READ OR WHEN THE CHECK VALUE IS ON
const insertExercise = function insertExercise (key, value){
  const day = key.split('-')[0];
  const workoutDay = document.getElementById(`${day}-workout`);
  let exerciseBox;
  let cardText;
  let cardTitle;


// CHECK IF IT IS REST DAY AND INSERT 'REST DAY' INTO DOM
  if(value === 'on'){
    exerciseBox = document.createElement('div');
    exerciseBox.classList.add('exercise-box');

    const rest = document.createElement('p');
    rest.innerText = 'Rest day';
    cardText = document.getElementById(`${day}-card-text`);
    exerciseBox.appendChild(rest);
    cardText.insertAdjacentElement('afterbegin', exerciseBox);
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

          cardText = document.createElement('div');
          cardText.classList.add('exercise-box');
          cardText.style.display = 'flex';
          cardText.setAttribute('id', `${day}-exercise-box-${i}`)
          cardTitle = document.getElementById(`${day}-card-title`)
          cardTitle.insertAdjacentElement('afterend', cardText);
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

          // INSERT EXRCISEES INTO CARD TEXT
          document.getElementById(`${day}-exercise-box-${i}`).insertAdjacentElement('beforeend', inputValue);
      }
  }
}


const checkDOM = function checkDOM () {
  if(document.getElementsByClassName('exercise-box')){
    const exerciseBoxes = document.getElementsByClassName('exercise-box');
    for(let i = 0; i < exerciseBoxes.length; i++){
      while(exerciseBoxes[i]){
        exerciseBoxes[i].remove();
      }
    }
  }
}

const onCreateWorkout = function onCreateWorkout (){
  checkDOM();
  // GETTING FORM
  const form = document.getElementById('workout-form');

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


    // KEEPS BUTTONS DISBALED WHEN CHECKED
    for(let i = 0; i < form.length; i++){
      if(form[i].disabled){
        form[i].disabled = true;
      }
    }

    document.getElementById('create-button').innerText = 'Edit';
    const displaySection = document.getElementById('display-workout-section');
    const workoutWrapper = document.getElementById('workout-wrapper');
    workoutWrapper.style.display = 'block';
    displaySection.appendChild(workoutWrapper);

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

const getYear = function getYear(){
  const date = new Date();
  document.getElementById('year').innerText = date.getFullYear();
}

getYear();
