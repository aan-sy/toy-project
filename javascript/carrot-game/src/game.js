'use strict';

import { Sound } from './sound.js';
import { Popup } from './popup.js';
import { Field } from './field.js';
import { rafId, MoveItem } from './animation.js';

const sound = new Sound();
const popup = new Popup();
let field;

export const ReasonOfStop = Object.freeze({
  win: 'win',
  lose: 'lose',
  pause: 'pause'
});

export class GameBuilder {
  duration(numOfSec) {
    this.duration = numOfSec;
    return this;
  }

  numOfLife(num) {
    this.numOfLife = num;
    return this;
  }

  maxLevel(num) {
    this.maxLevel = num;
    return this;
  }

  itemObj(obj) {
    this.itemObj = obj;
    return this;
  }

  bombObj(obj) {
    this.bombObj = obj;
    return this;
  }

  build() {
    return new Game(
      this.duration,
      this.numOfLife,
      this.maxLevel,
      this.itemObj,
      this.bombObj
    )
  }
}

class Game {
  constructor(duration, numOfLife, maxLevel, itemObj, bombObj) {
    this.DURATION = duration;
    this.NUM_OF_LIFE = numOfLife;
    this.MAX_LEVEL = maxLevel;
    this.ITEM_OBJ = {...itemObj};
    this.BOMB_OBJ = {...bombObj};

    this.remainder;
    this.collectItem;
    this.touchBomb;
    this.level = 1;
    this.currentScore = 0;
    this.score = 0;

    this.lifeBoard = document.querySelector('.life__text');
    this.itemBoard = document.querySelector('.item__text');

    this.startBtn = document.querySelector('.game__start');
    this.startBtn.addEventListener('click', this.start.bind(this));

    this.pauseBtn = document.querySelector('.control__pause');
    this.pauseBtn.addEventListener('click', () => {this.stop(ReasonOfStop.pause)});

    field = new Field(this.ITEM_OBJ, this.BOMB_OBJ);
    field.setClickBombListener(this.onBombClick);
    field.setClickItemListener(this.onItemClick);

    popup.setRefreshClickListener(this.init);   
    popup.setCloseClickListener(this.restart);
  }

  start = () => {
    this.gameTitle = document.querySelector('.game__title');
    this.gameTitle.style.display = 'none';
    this.startBtn.style.display = 'none';
    this.controller = document.querySelector('.game__control');
    this.controller.style.transform = 'scale(1)';
    this.init();
    sound.mute();
    sound.getControlBtn().style.transform = 'scale(1)';
  }

  init = () => {
    if (this.level === 1) { 
      this.currentScore = 0;
      this.score = 0;
    }

    this.collectItem = 0;
    this.touchBomb = 0;
    this.updateLifeBoard();
    this.updateItemBoard();
    this.startTimer(this.DURATION);
    field.init(this.level);
    sound.replayBg();
  }

  restart = () => {
    sound.playBg();
    MoveItem(this.BOMB_OBJ.className);
    this.startTimer(this.remainder);
  }

  stop = (reason) => {
    this.stopTimer();
    cancelAnimationFrame(rafId);
    sound.stopBg();
    reason === ReasonOfStop.win && sound.playWin();
    reason !== ReasonOfStop.win && sound.playAlert();

    if (reason === ReasonOfStop.lose) {
      this.level = 1;
    } else if (reason === ReasonOfStop.win) {
      this.currentScore = (this.remainder * 10) - (this.touchBomb * 10);
      this.score += this.currentScore;

      if (this.level === this.MAX_LEVEL) {
        this.level = 1;
        popup.showWithScore(this.score);
        return;
      }

      ++this.level
    }

    popup.show(reason);
  }

  onBombClick = () => {
    this.touchBomb++;
    this.updateLifeBoard();
    sound.playBomb();

    if (this.touchBomb === this.NUM_OF_LIFE) {
      this.stop(ReasonOfStop.lose);
    }
  }

  onItemClick = () => {
    this.collectItem++;
    this.updateItemBoard();
    sound.playItem();

    if (this.collectItem === (this.ITEM_OBJ.count * this.level)) {
      this.stop(ReasonOfStop.win);
    }
  }

  updateLifeBoard = () => {
    this.lifeBoard.textContent = '💜'.repeat(this.NUM_OF_LIFE - this.touchBomb);
  }

  updateItemBoard = () => {
    this.itemBoard.textContent = `🥕 x ${(this.ITEM_OBJ.count * this.level) - this.collectItem}`;
  }

  startTimer = (time) => {
    this.remainder = time;
    this.updateTimer(this.remainder);

    this.timerId = setInterval(() => {
      this.updateTimer(--this.remainder);
      this.remainder < 1 && this.stop(ReasonOfStop.lose);
    }, 1000);
  }

  updateTimer = (time) => {
    this.timer = document.querySelector('.control__timer');

    let min = Math.floor(time / 60);
    let sec = time % 60;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    this.timer.textContent = `${min}:${sec}`
  }

  stopTimer = () => {
    clearInterval(this.timerId);
  }
}