
// TO DO:1. MAKE SURE CARDS ARE CREATED PROPERLY WITH THE EXERCISES INSERTED IN THEM
        // 2. MAKE SURE DOM IS CLEARED ROPERLY, I THINK IT IS AN ISSUE #1 IS MORE THE PROBLEM

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
  let exerciseCard;
  let cardHeader;
  let cardBody;
  let cardTitle;
  let cardText;


// CHECK IF IT IS REST DAY AND INSERT 'REST DAY' INTO DOM
//*************NEED TO CHANGE TO MAKE REST DAY TO TEXT ON CARD
  if(value === 'on'){
    exerciseBox = document.createElement('div');
    exerciseBox.classList.add('exercise-box');

    const rest = document.createElement('p');
    rest.innerText = 'Rest day';
    exerciseBox.appendChild(rest);
    workoutDay.insertAdjacentElement('afterend', exerciseBox);
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

          // CREATE CARD
          exerciseCard = document.createElement('div');
          exerciseCard.classList.add('card');
          exerciseCard.style.maxWidth = '100%';

          // CREATE AND INSERT HEADER
          cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.innerText = day;
          exerciseCard.insertAdjacentElement('afterbegin', cardHeader);

          // CREATE AND INSERT CARD BODY
          cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          cardHeader.insertAdjacentElement('afterend', cardBody);

          // CREATE AMD INSERT CARD TITLE
          cardTitle = document.createElement('h4');
          cardTitle.innerText = `Here is your work out for ${day}`;
          cardTitle.classList.add('card-title');
          cardBody.insertAdjacentElement('afterbegin', cardTitle);

          // CREATE CARD TEXT
          cardText = document.createElement('div');
          cardText.classList.add('card-text');
          cardText.classList.add('exercise-box');
          cardText.style.display = 'flex';
          cardText.setAttribute('id', `${day}-exercise-box-${i}`);

          cardTitle.insertAdjacentElement('afterend', cardText);

          workoutDay.insertAdjacentElement('afterend', exerciseCard);
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


// NEED TO REWRITE TO FIX IT SO THAT EACH EXERCISE IS IN CARD BODY
const checkDOM = function checkDOM () {
  if(document.getElementsByClassName('card')){
    const cards = document.getElementsByClassName('card');
    for(let i = 0; i < cards.length; i++){
      while(cards[i]){
        cards[i].remove();
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
