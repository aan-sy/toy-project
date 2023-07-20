'use strict';

const controlDelete = document.querySelector('.control-button_delete');
const controlAdd = document.querySelector('.control-button_add');
const controlName = document.querySelector('.control-input_name');
const controlPrice = document.querySelector('.control-input_price');
const lists = document.querySelector('.lists');
const listsPrice = document.querySelector('.lists-price');
const category = document.querySelector('.category');

let selectedCategory = document.querySelector('.category-name.selected');
let filter = selectedCategory.dataset.filter;

let totalPrice = 0;


category.addEventListener('click', (event) => {
  if (!(event.target.dataset.filter)) return;
  filter = event.target.dataset.filter;
  handleSelection(event.target);
  filterLists(filter);
})

function handleSelection(target) {
  selectedCategory = document.querySelector('.category-name.selected');
  selectedCategory.classList.remove('selected');
  target.classList.add('selected');
}

function filterLists(filter) {
  const list = document.querySelectorAll('.list');
  totalPrice = 0;
  list.forEach((li) => {
    if (filter === 'all' || li.dataset.type === filter) {
      li.style.display = 'flex';
    } else {
      li.style.display = 'none';
    }
  })
  calculateTotalPrice();
  deleteOne();
  deleteAll();
}

function getValue () {
  const nameValue = controlName.value;
  let priceValue = controlPrice.value;
  
  if (!nameValue) {
    initInput();
    return;
  } else if (typeof priceValue === 'string') {
    if (priceValue.includes(',')) {
      priceValue = Number(priceValue.replaceAll(',', ''));
      initInput();
    } else if (!Number(priceValue)) {
      alert('숫자를 입력해 주세요 😉');
      controlPrice.value = '';
      controlPrice.focus();
      return;
    }  else {
      priceValue = Number(priceValue);
      initInput();
    }
  }

  makeList(nameValue, priceValue);
  calculateTotalPrice();
  deleteOne();
  deleteAll();
}

function calculateTotalPrice() {
  const list = document.querySelectorAll('.list');
  list.forEach((li) => {
    if(li.getAttribute('style') === 'display: flex;') {
      const priceStr = li.querySelector('.list-price').innerText;
      const priceNum = Number(priceStr.replaceAll(',', ''));
      totalPrice += priceNum;
    }
  })

  listsPrice.innerText = `Total Price : ${totalPrice.toLocaleString()}`;
  totalPrice = 0;
}


function makeList(nameValue, priceValue) {
  const list = document.querySelectorAll('.list');
  const NumberOfLists = list.length;
  const li = document.createElement('li');
  const div = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const span = document.createElement('span');
  const button = document.createElement('button');
  const i = document.createElement('i');
  li.setAttribute('class', 'list');
  li.setAttribute('data-type', `${filter}`)
  li.setAttribute('style', `display: flex;`)
  div.setAttribute('class', 'list-input-box');
  input.setAttribute('id', `item${NumberOfLists + 1}`);
  input.setAttribute('class', `list-input`);
  input.setAttribute('type', `checkbox`);
  label.setAttribute('for', `item${NumberOfLists + 1}`);
  label.setAttribute('class', `list-name`);
  label.innerText = `${nameValue}`;
  span.setAttribute('class', 'list-price');
  span.innerText = `${priceValue.toLocaleString('ko-KR')}`;
  button.setAttribute('class', 'list-button list-button_delete');
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'delete');
  i.setAttribute('class', 'fa-solid fa-trash-can');

  lists.appendChild(li);
  li.appendChild(div);
  div.appendChild(input);
  div.appendChild(label);
  li.appendChild(span);
  li.appendChild(button);
  button.appendChild(i);
}

function deleteOne() {
  const listDelete = document.querySelectorAll('.list-button_delete');

  listDelete.forEach((button) => {
    button.addEventListener('click', (e) => {
      const li = button.parentElement;
      li.remove();

      updateIndex();
      calculateTotalPrice();
    })
  })
}


function deleteAll() {
  const listInputs = lists.querySelectorAll('.list-input');

  listInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      if (event.target.checked) {
        input.parentNode.parentNode.classList.add('checked');
      } else {
        input.parentNode.parentNode.classList.remove('checked');
      }
    })
  })

  controlDelete.addEventListener('click', () => {
    const list = document.querySelectorAll('.list');
    list.forEach((li) => {
      if (li.classList.contains('checked')) {
        li.remove()
      }
    })

    updateIndex();
    calculateTotalPrice();
  })
}

function updateIndex() {
  const listLength = lists.querySelectorAll('.list').length;
  const listInput = lists.querySelectorAll('.list-input');
  const listLabel = lists.querySelectorAll('.list-name');
  for(let i=0; i<listLength; i++) {
    listInput[i].setAttribute('id', `item${i + 1}`);
    listLabel[i].setAttribute('for', `item${i + 1}`);
  }
}

function initInput () {
  controlName.value = '';
  controlPrice.value = '';
  controlName.focus();
}

controlPrice.addEventListener('keyup', (event) => {
  if (event.key !== 'Enter') return;
  getValue()
})

controlAdd.addEventListener('click', getValue);

initInput();