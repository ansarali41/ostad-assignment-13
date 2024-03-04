class TreeNode {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}

function countPaths(root, A, C, count, visited) {
    if (!root) return 0;
    visited.add(root.val);
    if (A[root.val - 1] === 1) count++;

    let result = 0;
    let isLeaf = true;

    for (let child of root.children) {
        if (!visited.has(child.val)) {
            isLeaf = false;
            result += countPaths(child, A, C, count, visited);
        }
    }

    visited.delete(root.val);

    if (isLeaf && count <= C) return 1;
    return result;
}

function buildTree(A, B) {
    const nodes = {};
    for (let i = 0; i < A.length; i++) {
        nodes[i + 1] = new TreeNode(i + 1);
    }

    for (let [parent, child] of B) {
        nodes[parent].children.push(nodes[child]);
        nodes[child].children.push(nodes[parent]);
    }

    return nodes[1];
}

function rootToLeafPaths(A, B, C) {
    const root = buildTree(A, B);
    return countPaths(root, A, C, 0, new Set());
}

// Example usage:
const A = [0, 1, 0, 1, 1, 1];
const B = [
    [1, 2],
    [1, 5],
    [1, 6],
    [2, 3],
    [2, 4],
];
const C = 1;
console.log(rootToLeafPaths(A, B, C)); // Output: 3

const A2 = [0, 1, 0, 1, 1, 1],
    B2 = [
        [1, 2],
        [1, 5],
        [1, 6],
        [2, 3],
        [2, 4],
    ],
    C2 = 2;

console.log(rootToLeafPaths(A2, B2, C2)); // Output: 4

// ** Time Complexity:O(N)
// ** Space Complexity: O(N)
