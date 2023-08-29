'use strict';

import { ReasonOfStop } from './game.js';

export class Popup {
  #popup = document.querySelector('.game__popup');
  #board = this.#popup.querySelector('.popup__board');
  #message = this.#board.querySelector('.board__msg');
  #refreshBtn = this.#board.querySelector('.board__refresh');

  #closeBtn;
  #goNextStageBtn;
  #text;
  #score;

  #onCloseClick;
  #onRefreshClick;

  constructor() {
    this.#refreshBtn.addEventListener('click', this.#refreshClickListener.bind(this))
  }

  setCloseClickListener = (onCloseClick) => {
    this.#onCloseClick = onCloseClick;
  }

  setRefreshClickListener = (onRefreshClick) => {
    this.#onRefreshClick = onRefreshClick;
  }

  show = (reason, score) => {
    this.#popup.style.transform = 'scale(1)';
    
    switch(reason) {
      case ReasonOfStop.pause:
        this.#text = `Refresh?`;
        this.#makeCloseBtn();
        break;

      case ReasonOfStop.lose:
        this.#text = `Oops! Retry? 😂`;
        break;

      case ReasonOfStop.win:
        this.#text = `Good :)`;
        this.#makeGoNextLevelBtn();
    }

    this.#message.textContent = this.#text;
  }

  showWithScore = (score) => {
    this.#popup.style.transform = 'scale(1)';
    this.#message.textContent = `New Game?`;
    this.#board.insertAdjacentHTML(
      'afterbegin',
      `<div class="board__score">SCORE : <span>${score}</span></div>`
    )
    this.#score = document.querySelector('.board__score');
    this.#board.classList.add('for-winner');
  }

  #hide = () => {
    this.#init();
    this.#popup.style.transform = 'scale(0)';
  }

  #init = () => {
    this.#closeBtn && this.#closeBtn.remove();
    this.#goNextStageBtn && this.#goNextStageBtn.remove();
    this.#score && this.#score.remove();
    this.#board.classList.remove('for-winner');
    this.#refreshBtn.style.display = 'block';
  }

  #makeCloseBtn = () => {
    this.#board.insertAdjacentHTML(
      'beforeend', 
      `<button class="board__close"><i class="fa-solid fa-xmark"></i></button>`
    );
    this.#closeBtn = document.querySelector('.board__close');
    this.#closeBtn.addEventListener('click', this.#closeClickListener)
  }

  #makeGoNextLevelBtn = () => {
    this.#refreshBtn.style.display = 'none';

    this.#board.insertAdjacentHTML(
      'beforeend', 
      `<button class="board__next">Go next Level</button>`
    );
    this.#goNextStageBtn = document.querySelector('.board__next');
    this.#goNextStageBtn.addEventListener('click', () => {this.#refreshClickListener()})
  }

  #closeClickListener = () => {
    this.#hide();
    this.#onCloseClick();
  }

  #refreshClickListener = () => {
    this.#hide();
    this.#onRefreshClick();
  }
}