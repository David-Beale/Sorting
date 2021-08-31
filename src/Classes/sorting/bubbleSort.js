export default class BubbleSort {
  constructor(array) {
    this.array = array;
    this.i = 0;
    this.swapped = false;
    this.finished = false;
    this.end = array.length - 1;
  }

  nextLoop() {
    this.i = 0;
    this.swapped = false;
    this.end--;
  }
  sort() {
    if (this.finished) return false;

    while (true) {
      while (this.i < this.end) {
        if (this.array[this.i].height < this.array[this.i + 1].height) {
          this.swapped = true;
          this.array[this.i].swap(this.array[this.i + 1]);
        }
        const indices = [this.i, this.i + 1];
        this.array[this.i].setColorNormalOrCorrect();
        this.array[this.i + 1].setColorCurrentOrCorrect();

        this.i++;
        return indices;
      }
      if (!this.swapped) {
        this.finished = true;
        return false;
      }
      this.nextLoop();
    }
  }
}
