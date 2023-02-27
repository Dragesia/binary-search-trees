import Node from "./node.js";
import insertionSort from "./arr.js";
import { removeDuplicates } from "./arr.js";
import Queue from "./queue.js";

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
        this.arr.push(value);
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

    delete(value) {
        this.root = this.deleteRec(value, this.root)
    }
    deleteRec(value, root) {
        if (root == null) return root;

        if (value < root.data) root.left = this.deleteRec(value, root.left);
        else if (value > root.data) root.right = this.deleteRec(value, root.right);
        else {
            if (root.left == null) return root.right;
            else if (root.right == null) return root.left;

            root.data = this.minValue(root.right);
            root.right = this.deleteRec(root.data, root.right);
        }
        return root;
    }
    minValue(root) {
        let min = root.data;
        while (root.left != null) {
            min = root.left.data;
            root = root.left;
        }
        return min;
    }
    
    find(value) {
        let queue = new Queue();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            let item = queue.dequeue();
            if (item.data == value) return item;
            if (item.left != null) queue.enqueue(item.left);
            if (item.right != null) queue.enqueue(item.right);
        }
        return null;
    }

    levelOrder(cb) {
        if (cb == undefined) cb = (i) => i;
        let arr = [];
        let queue = new Queue();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            let item = queue.dequeue();
            if (item == undefined) break;
            if (item.left != null) queue.enqueue(item.left);
            if (item.right != null) queue.enqueue(item.right);
            arr.push(cb(item.data));
        }
        return arr;
    }

    inorder(cb, root = this.root) {
        if (cb == undefined) cb = (i) => i;
        if (root == null) return;
        let arr = [];
        arr = arr.concat(this.inorder(cb, root.left));
        arr = [...arr, cb(root.data)];
        arr = arr.concat(this.inorder(cb, root.right));
        return arr.filter((el) => el !== undefined);
    }
    preorder(cb, root = this.root) {
        if (cb == undefined) cb = (i) => i;
        if (root == null) return;
        let arr = [];
        arr = [...arr, cb(root.data)];
        arr = arr.concat(this.preorder(cb, root.left));
        arr = arr.concat(this.preorder(cb, root.right));
        return arr.filter((el) => el !== undefined);
    }
    postorder(cb, root = this.root) {
        if (cb == undefined) cb = (i) => i;
        if (root == null) return;
        let arr = [];
        arr = arr.concat(this.postorder(cb, root.left));
        arr = arr.concat(this.postorder(cb, root.right));
        arr = [...arr, cb(root.data)];
        return arr.filter((el) => el !== undefined);
    }
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

console.log(newTree.levelOrder());

prettyPrint(newTree.root);