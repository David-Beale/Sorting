import SortableItem from "./SortableItem";
import { spiralLayout } from "./layouts";
import { Object3D, Color } from "three";
import SelectionSort from "./sorting/selectionSort";
import BubbleSort from "./sorting/bubbleSort";
import QuickSort from "./sorting/quickSort";
import MergeSort from "./sorting/mergeSort";
import RadixSort from "./sorting/radixSort";

const scratchObject3D = new Object3D();
const scratchColor = new Color();

export default class SortableList {
  constructor(length, meshRef, colorRef, colorArray) {
    this.ready = false;
    this.meshRef = meshRef;
    this.colorRef = colorRef;
    this.colorArray = colorArray;
    this.length = length;
    this.array = this.initArray();
    this.shuffle();
    this.layout = spiralLayout;
    this.generateLayout();
    this.sortingClass = new BubbleSort(this.array);
    this.speed = 100;
  }

  initArray() {
    const array = [];
    for (let i = this.length; i >= 1; i--) {
      const newItem = new SortableItem();
      newItem.setCorrectHeight(i / 10);
      array.push(newItem);
    }
    return array;
  }

  shuffle() {
    // Fisher–Yates shuffle
    for (let i = 0; i < this.array.length - 1; i++) {
      //random index between i and length
      const randomIndex =
        Math.floor(Math.random() * (this.array.length - i)) + i;
      this.array[i].swap(this.array[randomIndex]);
    }
  }
  generateLayout() {
    this.layout(this.array);
  }

  updateAll() {
    for (let i = 0; i < this.array.length; i++) {
      const item = this.array[i];
      scratchObject3D.position.set(item.x, item.y, item.z);
      scratchObject3D.scale.set(1, item.height, 1);
      scratchObject3D.updateMatrix();
      this.meshRef.current.setMatrixAt(i, scratchObject3D.matrix);

      scratchColor.set(item.color);
      scratchColor.toArray(this.colorArray, i * 3);
    }
    this.colorRef.current.needsUpdate = true;
    this.meshRef.current.instanceMatrix.needsUpdate = true;
    this.ready = true;
  }

  updateOne(index) {
    const item = this.array[index];
    scratchObject3D.position.set(item.x, item.y, item.z);
    scratchObject3D.scale.set(1, item.height, 1);
    scratchObject3D.updateMatrix();

    this.meshRef.current.setMatrixAt(index, scratchObject3D.matrix);

    scratchColor.set(item.color);
    scratchColor.toArray(this.colorArray, index * 3);
  }

  sort() {
    if (!this.ready) return;
    const indices = new Set();
    for (let i = 0; i < this.speed; i++) {
      const res = this.sortingClass.sort();
      if (res === false) break;
      res.forEach((index) => indices.add(index));
    }
    indices.forEach((index) => {
      this.updateOne(index);
    });
    this.colorRef.current.needsUpdate = true;
    this.meshRef.current.instanceMatrix.needsUpdate = true;
  }
}
