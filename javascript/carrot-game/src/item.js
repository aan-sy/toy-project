'use strict';

export class ItemBuilder {
  count(num) {
    this.count = num;
    return this;
  }

  className(string) {
    this.className = string;
    return this;
  }

  imgPath(string) {
    this.imgPath = string;
    return this;
  }

  imgWidth(num) {
    this.imgWidth = num;
    return this;
  }

  imgHeight(num) {
    this.imgHeight = num;
    return this;
  }

  build() {
    return new Item(
      this.count,
      this.className,
      this.imgPath,
      this.imgWidth,
      this.imgHeight
    )
  }
}

class Item {
  constructor(count, className, imgPath, imgWidth, imgHeight) {
    this.count = count;
    this.className = className;
    this.imgPath = imgPath;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
  }
}