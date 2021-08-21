import { Module } from '@/core/module'

const TIME = 10000;

export class ClicksModule extends Module {
  #container
  #isTimeUp;
  #count;
  #doubleCount;
  #time;
  #displayValues;
  #displayText;

  constructor(type, text) {
    super(type, text);
    this.#container = document.body;
    this.#isTimeUp = false;
    this.#count = -1;
    this.#doubleCount = 0;
    this.#time = TIME;
    this.#displayValues = document.createElement('div');
    this.#displayValues.dataset.type = this.type;
    this.#displayValues.className = `module-${ this.type }`;
    this.#displayText = document.createElement('h2');

    this.#container.addEventListener('contextmenu', () => {
      this.close();
    });
  }


  trigger() {
    this.#counterClicks(this.#time);
    this.#render();
  }

  #counterClicks(ms) {

    this.#container.addEventListener('click', this.#onClick);
    this.#container.addEventListener('dblclick', this.#onDblclick);
    this.#container.onmousedown = () => false;

    setTimeout(() => {
      this.#isTimeUp = true;
      this.#displayText.textContent =`Time is over. Result: ${this.#count} clicks in ${this.#time / 1000} seconds, including ${this.#doubleCount} double clicks.`;
    }, ms);
  }

  #render() {
    this.#container.append(this.#displayValues);
    this.#displayValues.append(this.#displayText);
    this.#displayText.textContent = this.getText();
  }

  getText() {
    return `Result: ${this.#count} single clicks, including ${this.#doubleCount} double clicks`;
  }

  #onClick = () => {
    if (this.#isTimeUp) return;
    this.#count++;
    this.#displayText.textContent = this.getText();
  }

  #onDblclick = () => {
    if (this.#isTimeUp) return;
    this.#doubleCount++;
    this.#displayText.textContent = this.getText();
  }

  close() {
    this.#displayValues.remove();
  }
}
