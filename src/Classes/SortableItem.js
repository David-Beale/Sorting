export const correctHeightColor = "rgb(43,191,48)";
export const normalColor = "rgb(36,102,177)";
export const currentColor = "rgb(255,167,15)";

export default class SortableItem {
  constructor() {
    this.height = null;
    this.color = normalColor;
  }
  setCorrectHeight(height) {
    this.correctHeight = height;
    this.height = height;
  }
  setHeight(height) {
    this.height = height;
    this.y = height / 2;
  }
  swap(item2) {
    let temp = this.height;
    this.setHeight(item2.height);
    item2.setHeight(temp);
  }
  setColorCurrent() {
    this.color = currentColor;
  }
  setColorNormal() {
    this.color = normalColor;
  }
  setColorCurrentOrCorrect() {
    this.color =
      this.height === this.correctHeight ? correctHeightColor : currentColor;
  }
  setColorNormalOrCorrect() {
    this.color =
      this.height === this.correctHeight ? correctHeightColor : normalColor;
  }
}
