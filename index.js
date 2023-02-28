import Node from "./node.js";
import Tree from "./tree.js";
import { randomArr, prettyPrint } from "./arr.js";

let arr = randomArr(20, 1000);
let tree = new Tree(arr);
console.log("New tree created with array", arr);
prettyPrint(tree.root);

console.log("Is tree balanced?", tree.isBalanced());
console.log("Height of tree:", tree.height());

console.log("Level order:", tree.levelOrder());
console.log("Preorder:", tree.preorder());
console.log("Inorder:", tree.inorder());
console.log("Postorder:", tree.postorder());

tree.insert(108);
tree.insert(109);
tree.insert(110);
tree.insert(111);

prettyPrint(tree.root);

console.log("Is new tree balanced?", tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);

console.log("Is new tree balanced after rebalancing?", tree.isBalanced());

console.log("Level order:", tree.levelOrder());
console.log("Preorder:", tree.preorder());
console.log("Inorder:", tree.inorder());
console.log("Postorder:", tree.postorder());
