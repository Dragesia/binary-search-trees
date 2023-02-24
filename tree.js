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
    
    insert(value) {
        this.root = this.insertRec(value ,this.root);
    }
    insertRec(value, root) {
        if (root == null) {
            root = new Node(value);
            return root;
        } 

        if (value < root.data) {
            root.left = this.insertRec(value, root.left);
        } else if (value > root.data) {
            root.right = this.insertRec(value, root.right);
        }

        return root;
    }
    delete() {}
    find() {}
    levelOrder() {}
    inorder() {}
    preorder() {}
    postorder() {}
    height() {}
    depth() {}
    isBalanced() {}
    rebalance() {}

}






/* testing */

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let newTree = new Tree(arr);

prettyPrint(newTree.root);