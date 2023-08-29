'use strict';

import { MoveItem } from './animation.js';

export class Field {
  #ITEM_OBJ;
  #BOMB_OBJ;
  #field;

  #onItemClick;
  #onBombClick;

  constructor(itemObj, bombObj) {
    this.#ITEM_OBJ = {...itemObj};
    this.#BOMB_OBJ = {...bombObj};

    this.#field = document.querySelector('.game__field');
    this.#field.addEventListener('click', (e) => {this.#clickListener(e)})
  }

  init = (currentLevel) => {
    this.#field.innerHTML = '';

    this.#paintItem(this.#ITEM_OBJ, currentLevel);
    this.#paintItem(this.#BOMB_OBJ);
    MoveItem(this.#BOMB_OBJ.className);
  }

  #paintItem = ({count, className, imgPath, imgWidth, imgHeight}, currentLevel) => {
    const fieldRect = this.#field.getBoundingClientRect();
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - imgWidth;
    const y2 = fieldRect.height - imgHeight;

    if (currentLevel) {
      count = count * currentLevel;
    }

    for(let i = 0; i < count; i++) {
      const x = randomPoint(x1, x2);
      const y = randomPoint(y1, y2);
  
      const item = document.createElement('img');
      item.classList.add(className);
      item.setAttribute('src', imgPath);
      item.style = `width: ${imgWidth}px;`;
      item.style.position = `absolute`;
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;

      let turnRight = (Math.floor(Math.random() * 10) + 1) % 2 === 0 ? true : false;
      if (className === this.#BOMB_OBJ.className && turnRight) item.classList.add('turnRight');
      this.#field.appendChild(item);
    } 
  }

  setClickItemListener = (onItemClick) => {
    this.#onItemClick = onItemClick;
  }

  setClickBombListener = (onBombClick) => {
    this.#onBombClick = onBombClick;
  }

  #clickListener = (e) => {
    console.log(e)
    if (e.target.classList.contains(this.#ITEM_OBJ.className)) {
      e.target.remove();
      this.#onItemClick();
    } else if (e.target.classList.contains(this.#BOMB_OBJ.className)) {
      this.#onBombClick()
    }

  }
}

function randomPoint(min, max) {
  return Math.random() * (max - min) + min;
}


