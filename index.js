
// TO DO:
// 6. DISPLAY MESSAGE TO COMPLETE FORM IF NOT VALID
// 7. CLEAR SUBMISSION FORM WITH FORM.RESET() IF X OR CLOSE PRESSED?

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

  const day = key.split('-')[0];
  const headerDay = document.getElementById(`${day}-display`);
// CHECK IF IT IS REST DAY AND INSERT 'REST DAY' INTO DOM
  if(value === 'on'){
    const rest = document.createElement('p');
    rest.innerText = 'Rest day';
    headerDay.insertAdjacentElement('afterend', rest);
  } else if(value !== ''){

      // IF NOT A REST DAY, INSERT EXERCISE AND INFO
      const action = key.split('-')[1];
      let exerciseBox;
      let input = [...value]

// TAKES CARE OF DAYS WITH ONLY ONE EXERCISE
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


const onCreateWorkout = function onCreateWorkout (event){

  // GETTING FORM
  const displaySection = document.getElementById('display-workout-section');
  const form = document.getElementById('workout-form');

  if(form.checkValidity()){
    const request = new XMLHttpRequest();

    request.open('POST', 'https://httpbin.org/post', /* async = */ false);
    const data = new FormData(form);

    request.send(data);

  // PARSES RESPONSE TO JSON AND THEN GETS FORM
    const createdWorkout = JSON.parse(request.response).form

  // LOOPS THROUGH OBJECT AND CALLS INSERTEXERCISE TO INSERT INFO INTO DOM
    for(const key in createdWorkout){
      const value = createdWorkout[key];
      insertExercise(key, value);
    }

    form.reset();
    displaySection.style.display = 'block';

  } else{
    // const incompleteModal = document.getElementById('incomplete-form-modal');
    // incompleteModal.classList.add('show');
    const incompleteAlert = document.getElementById('incomplete-form-alert');
    incompleteAlert.classList.add('show');
    console.log('tell person to fill out form')

  }


}
