export default class RadixSort {
  constructor(array) {
    this.array = array;
    this.buckets = [];
    this.maxLength = array.length.toString().length;
    this.i = 0;
    this.j = array.length - 1;
    this.currentIndex = 0;
    this.temp = null;
    this.prevIndex = null;
    this.indices = [];
    this.resetBucket();
  }

  resetBucket() {
    for (let i = 0; i < 10; i++) {
      this.buckets[i] = [];
    }
  }

  getDigit() {
    const num = this.array[this.j].height;
    const index = this.i;
    const string = (num * 10).toString();
    const digit = string[string.length - 1 - index];
    return digit === undefined ? 0 : digit;
  }
  fillBuckets() {
    while (this.j >= 0) {
      let digit = this.getDigit();
      this.buckets[digit].push(this.j);
      this.j--;
    }
    this.updateTempArray();
  }

  updateTempArray() {
    this.temp = this.array.map((item) => {
      return { height: item.height, selected: false };
    });
  }
  getNextIndex() {
    let nextIndex;
    while (nextIndex === undefined) {
      const list = this.buckets[this.buckets.length - 1];
      nextIndex = list.pop();
      if (!list.length) this.buckets.pop();
    }
    return nextIndex;
  }
  updateCurrentItem(nextIndex) {
    const currentItem = this.array[this.currentIndex];
    currentItem.setHeight(this.temp[nextIndex].height);
    currentItem.setColorCurrent();
    this.indices = [this.currentIndex];
    this.temp[nextIndex].selected = true;
  }
  updatePrevItem() {
    if (this.prevIndex !== null) {
      const prevItem = this.array[this.prevIndex];
      prevItem.setColorNormalOrCorrect();
      this.indices.push(this.prevIndex);
    }
    this.prevIndex = this.currentIndex;
  }
  getShiftedIndices() {
    let tempIndex = this.currentIndex;
    for (let i = 0; i < this.temp.length; i++) {
      if (!this.temp[i].selected) {
        const item = this.array[tempIndex];
        if (item.height !== this.temp[i].height) {
          item.setHeight(this.temp[i].height);
          this.indices.push(tempIndex);
        }
        tempIndex++;
      }
    }
  }

  nextLoop() {
    this.resetBucket();
    this.currentIndex = 0;
    this.i++;
    this.j = this.array.length - 1;
  }

  updateFinalItem() {
    let i = this.prevIndex;
    this.prevIndex = null;
    const item = this.array[i];
    item.setColorNormalOrCorrect();
    return [i];
  }

  sort() {
    while (this.i < this.maxLength) {
      if (this.j >= 0) this.fillBuckets();

      if (this.buckets.length) {
        const nextIndex = this.getNextIndex();

        this.updateCurrentItem(nextIndex);
        this.updatePrevItem();

        this.currentIndex++;

        this.getShiftedIndices();
        return this.indices;
      }
      this.nextLoop();
    }

    if (this.prevIndex) {
      return this.updateFinalItem();
    }

    return false;
  }
}
