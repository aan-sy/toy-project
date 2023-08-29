'use strict';

export class Sound {
  #track = {
    bg: document.querySelector('.bg'),
    alert: document.querySelector('.alert'),
    win: document.querySelector('.win'),
    bomb: document.querySelector('.bomb'),
    item: document.querySelector('.item'),
    // load 이슈
    // bg: new Audio('../sound/bg.mp3'),
    // alert: new Audio('../sound/alert.wav'),
    // win: new Audio('../sound/game_win.mp3'),
    // bomb: new Audio('../sound/bomb_pull.mp3'),
    // item: new Audio('../sound/item_pull.mp3'),
  };
  #controlBtn = document.querySelector('.game__audio');
  #controlIcon = this.#controlBtn.querySelector('.fa-solid');

  constructor() {
    this.#controlBtn.addEventListener('click', this.#toggle.bind(this));
  }

  getControlBtn = () => {
    return this.#controlBtn;
  }

  replayBg = () => {
    this.#track.bg.currentTime = 1;
    this.playBg();
  }

  playBg = () => {
    this.#track.bg.play();
    this.#track.bg.loop = true;
  }

  stopBg = () => {
    this.#track.bg.pause();
  }

  playAlert = () => {
    this.#track.alert.currentTime = 0;
    this.#track.alert.play();
  }

  playWin = () => {
    this.#track.win.currentTime = 0;
    this.#track.win.play();
  }

  playBomb = () => {
    this.#track.bomb.currentTime = 0;
    this.#track.bomb.play();
  }

  playItem = () => {
    this.#track.item.currentTime = 0;
    this.#track.item.play();
  }

  #toggle = () => {
    if(this.#controlIcon.classList.contains('fa-volume-xmark')) {
      this.#controlIcon.classList.remove('fa-volume-xmark');
      this.#controlIcon.classList.add('fa-volume-high');
      this.#volumeUp();
    } else {
      this.#controlIcon.classList.remove('fa-volume-high');
      this.#controlIcon.classList.add('fa-volume-xmark');
      this.mute();
    }
  }

  #volumeUp = () => {
    for (const sound in this.#track) {
      this.#track[sound].muted = false;
    }
  }

  mute = () => {
    for (const sound in this.#track) {
      this.#track[sound].muted = true;
    }
  }
}