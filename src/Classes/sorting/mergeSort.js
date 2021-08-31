export default class MergeSort {
  constructor(array) {
    this.array = array;
    this.temp = null;
    this.queue = [];
    this.currentIndex = null;
    this.prevIndex = null;
    this.pointers = {};
    this.middleLimit = null;
    this.highLimit = null;
    this.indices = null;
    this.mergeSortPrep();
  }

  mergeSortPrep(low = 0, high = this.array.length - 1) {
    if (high - low === 0) return;
    const middle = Math.floor((low + high) / 2);
    this.mergeSortPrep(low, middle);
    this.mergeSortPrep(middle + 1, high);
    this.queue.push([low, middle, high]);
  }

  updateCurrentIndex(side) {
    this.indices.push(this.currentIndex);
    const currentItem = this.array[this.currentIndex];
    currentItem.setHeight(this.temp[this.pointers[side]]);
    currentItem.setColorCurrentOrCorrect();
  }
  updatePrevIndex() {
    if (this.prevIndex !== null) {
      this.indices.push(this.prevIndex);
      const prevItem = this.array[this.prevIndex];
      prevItem.setColorNormalOrCorrect();
    }
    this.prevIndex = this.currentIndex;
  }

  getShiftedIndices() {
    let tempIndex = this.currentIndex;
    let tempPointer = this.pointers.left;

    while (tempPointer <= this.middleLimit) {
      this.indices.push(tempIndex);
      const item = this.array[tempIndex];
      item.setHeight(this.temp[tempPointer]);
      tempPointer++;
      tempIndex++;
    }

    tempPointer = this.pointers.right;

    while (tempPointer <= this.highLimit) {
      this.indices.push(tempIndex);
      const item = this.array[tempIndex];
      item.setHeight(this.temp[tempPointer]);
      tempPointer++;
      tempIndex++;
    }
  }

  updateArray(side) {
    this.indices = [];

    this.updateCurrentIndex(side);
    this.updatePrevIndex();

    this.pointers[side]++;
    this.currentIndex++;

    this.getShiftedIndices();
    return this.indices;
  }

  nextLoop() {
    this.queue.shift();
    if (!this.queue.length) return;
    const [low, middle, high] = this.queue[0];

    this.temp = this.array.slice(low, high + 1).map((item) => item.height);
    this.currentIndex = low;

    this.pointers.left = 0;
    this.middleLimit = middle - low;

    this.pointers.right = this.middleLimit + 1;
    this.highLimit = high - low;
  }
  sort() {
    if (!this.queue.length) return false;
    while (
      this.pointers.left <= this.middleLimit &&
      this.pointers.right <= this.highLimit
    ) {
      if (this.temp[this.pointers.left] >= this.temp[this.pointers.right]) {
        return this.updateArray("left");
      } else {
        return this.updateArray("right");
      }
    }
    while (this.pointers.left <= this.middleLimit) {
      return this.updateArray("left");
    }
    this.nextLoop();
    return this.sort();
  }
}
