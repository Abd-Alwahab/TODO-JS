let addForm = document.querySelector('.add');
let list = document.querySelector('.list');
let search = document.querySelector('.search input');
let clock = document.querySelector('.clock');

// show the clock
let tick = () => {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  let html = `
    <span>${hours}</span> : 
    <span>${minutes}</span> : 
    <span>${seconds}</span>
  `;

  clock.innerHTML = html;

}

setInterval(tick,1000);




// preaper the html teamplate for the todo
let createTODO =( todo , date )=> {

    let html = `
    <li class="list__item">
            <span class="item__text">${todo}</span>
            <span class="date">${date}</span>
            <div class="icons">
               <i class="fas fa-trash-alt item__icon delete"></i>
               <i class="fas fa-map-marker item__icon mark"></i>
            </div>
    </li>

    `;

    list.innerHTML += html;
}

// add new todo o the list
addForm.addEventListener('submit', (e) => {

    e.preventDefault();
  
    let todo = addForm.add.value.trim();
    let date = addForm.add__date.value.trim();

    if(todo.length > 0 && date.length > 0) {
        createTODO(todo,date);
        addForm.reset();
    }


});


//style the input filed while the user is typing
addForm.add.addEventListener('keyup', () => {

  document.querySelector('.step--one').style.background = 'green';

  if(!addForm.add.value.length) {
    document.querySelector('.step--one').style.background = 'white';
  }

});


// remove and mark as read the list items
list.addEventListener('click', e => {

    if(e.target.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
    }

    if(e.target.classList.contains('mark')) {
        e.target.parentElement.parentElement.style.textDecoration = 'line-through';
        e.target.parentElement.parentElement.style.background = 'rgba(0, 0, 0, 0.796)';  
    }

});


//filter the todos list items
const filterTODOS = (term) => {

  Array.from(list.children)
  .filter((todo) => {

    return !todo.textContent.toLowerCase().includes(term);

  }).forEach((todo) => {

    todo.classList.add('hide');

  });

  
  Array.from(list.children)
  .filter((todo) => {

    return todo.textContent.toLowerCase().includes(term);

  }).forEach((todo) => {

    todo.classList.remove('hide');

  });

}

search.addEventListener('keyup', () => {

    const term = search.value.trim().toLowerCase();
    filterTODOS(term);

});



