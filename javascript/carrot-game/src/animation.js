'use strict';

export let rafId;

export function MoveItem(itemClassName) {
  const items = document.querySelectorAll(`.${itemClassName}`);
  let distance = 0;
  let direction;
  let prevTimestamp;

  function moveX(timestamp) {
    if(!prevTimestamp) prevTimestamp = timestamp;
    const elapsed = timestamp - prevTimestamp;
    
    if (!direction) {direction = 1}

    if (direction === 1) {
      distance += 2;
    } else if (direction === -1) {
      distance -= 2;
    }

    items.forEach((item) => {
      if (item.classList.contains('turnRight')) {
        item.style.transform = `translateX(${distance}px) scaleX(${-1 * direction})`;
      } else {
        item.style.transform = `translateX(${-1 * distance}px) scaleX(${direction})`;
      }
    })

    if(elapsed >= 1000) {
      prevTimestamp = timestamp;
      direction *= -1;
    }

    rafId = requestAnimationFrame(moveX);
  }
  requestAnimationFrame(moveX)
}