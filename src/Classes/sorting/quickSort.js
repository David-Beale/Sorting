export default class QuickSort {
  constructor(array) {
    this.array = array;
    this.stack = [[0, array.length - 1]];
    this.inProgress = false;
    this.pivot = null;
    this.leftPointer = null;
    this.rightPointer = null;
    this.left = null;
    this.right = null;
    this.indices = [];
  }

  newPartition() {
    this.inProgress = true;
    [this.left, this.right] = this.stack.pop();
    this.pivot = this.array[Math.floor((this.left + this.right) / 2)].height;
    this.leftPointer = this.left;
    this.rightPointer = this.right;
  }

  shiftLeftPointer() {
    //reset prev color
    this.array[this.leftPointer].setColorNormalOrCorrect();
    this.indices.push(this.leftPointer);
    this.leftPointer++;
  }
  shiftRightPointer() {
    //reset prev color
    this.array[this.rightPointer].setColorNormalOrCorrect();
    this.indices.push(this.rightPointer);
    this.rightPointer--;
  }
  setCurrentColors() {
    if (this.leftPointer > this.rightPointer) return;
    this.array[this.leftPointer].setColorCurrent();
    this.array[this.rightPointer].setColorCurrent();
    this.indices.push(this.leftPointer, this.rightPointer);
  }

  partition() {
    if (!this.inProgress) {
      this.newPartition();
    }
    while (this.leftPointer <= this.rightPointer) {
      const leftNeedsToShift = this.array[this.leftPointer].height > this.pivot;
      const rightNeedsToShift =
        this.array[this.rightPointer].height < this.pivot;

      //move pointers closer together until a swap can be made
      while (leftNeedsToShift || rightNeedsToShift) {
        if (leftNeedsToShift) this.shiftLeftPointer();

        if (rightNeedsToShift) this.shiftRightPointer();

        this.setCurrentColors();
        return;
      }

      //make swap
      this.array[this.leftPointer].swap(this.array[this.rightPointer]);
      this.indices.push(this.leftPointer, this.rightPointer);

      //reset colors
      this.array[this.leftPointer].setColorNormalOrCorrect();
      this.array[this.rightPointer].setColorNormalOrCorrect();

      this.leftPointer++;
      this.rightPointer--;

      this.setCurrentColors();
      return;
    }
  }

  sort() {
    while (this.inProgress || this.stack.length) {
      this.indices = [];
      this.partition();
      if (this.indices.length) return this.indices;

      this.inProgress = false;
      if (this.left < this.leftPointer - 1) {
        this.stack.push([this.left, this.leftPointer - 1]);
      }
      if (this.right > this.leftPointer) {
        this.stack.push([this.leftPointer, this.right]);
      }
    }
    return false;
  }
}
