export default class SelectionSort {
  constructor(array) {
    this.array = array;
    this.i = 0;
    this.j = 1;
    this.max = 0;
  }

  nextLoop() {
    this.i++;
    this.j = this.i + 1;
    this.max = this.i;
  }
  sort() {
    while (this.i < this.array.length) {
      //search for max height
      while (this.j < this.array.length) {
        if (this.array[this.j].height > this.array[this.max].height) {
          this.max = this.j;
        }
        //set color of current index and reset color of prev index
        const indices = [this.j, this.j - 1];
        this.array[this.j - 1].setColorNormal();
        this.array[this.j].setColorCurrent();
        this.j++;
        return indices;
      }

      if (this.max !== this.i) {
        //swap heights
        this.array[this.max].swap(this.array[this.i]);
      }
      const indices = [this.max];
      //only need to add i if there has been a swap:
      if (this.i !== this.max) indices.push(this.i);
      //last checked index:
      if (this.j - 1 !== this.i) indices.push(this.j - 1);
      //color check
      indices.forEach((index) => this.array[index].setColorNormalOrCorrect());

      this.nextLoop();
      return indices;
    }
    return false;
  }
}
