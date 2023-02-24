import Node from "./node.js";
import insertionSort from "./arr.js";
import { removeDuplicates } from "./arr.js";

export default class Tree {
    constructor(arr = []) {
        this.arr = insertionSort(removeDuplicates(arr));
        this.root = this.buildTree(this.arr, 0, this.arr.length-1);
    }

    buildTree(arr, start, end) {
        if (start > end) return null;
        let mid = Math.floor((start + end) / 2);

        let node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid-1)
        node.right = this.buildTree(arr, mid + 1, end);

        return node;
    }

}