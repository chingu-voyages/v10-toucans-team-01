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




const onCreateWorkout = function onCreateWorkout (){

  // GETTING FORM
  const displaySection = document.getElementById('display-workout-section');
  console.log(document.getElementById('workout-form'));
  const form = document.getElementById('workout-form');

// CYCLING THROUGH ELEMENTS IN FORM
  for(let i = 0; i < form.length; i++){
    let day = form[i].parentElement.previousElementSibling;
    console.log(day);
    if(form[i].type === 'checkbox' && form[i].checked === true){
      let day = form[i].parentElement.previousElementSibling.innerText.toLowerCase();
      // let workoutDisplayDay = document.getElementById(`${day}-workout`);
      // console.log(workoutDisplayDay)

      // CANNOT GET WORKOUT DAYS, I THINK BECAUSE IT IS NOT YET IN THE DOM
      console.log(document.getElementById('monday-workout'))
    }
  }

  displaySection.style.display = 'block';
}
