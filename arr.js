export default function insertionSort(arr) {
    let n = arr.length;
    for (let i=0; i<n; i++) {
        let current = arr[i];
        let j = i-1;

        while (j > -1 && current < arr[j]) {
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = current;
    }
    return arr;
}

export function removeDuplicates(arr) {
    let uniqueArr = [];
    arr.forEach(el => {
        if (!uniqueArr.includes(el)) {
            uniqueArr.push(el);
        }
    });
    return uniqueArr;
}

export function randomArr(len, max = 100) {
    let arr = [];
    for (let i=0; i<len; i++) {
        arr.push(Math.floor(Math.random() * max));
    }
    return arr;
}
export function prettyPrint(node, prefix = '', isLeft = true) {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
