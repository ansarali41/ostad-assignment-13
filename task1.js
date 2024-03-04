function isCyclicUtil(node, graph, visited, recursionStack) {
    visited[node] = true;
    recursionStack[node] = true;

    if (graph[node]) {
        let neighbors = graph[node];
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (!visited[neighbor] && isCyclicUtil(neighbor, graph, visited, recursionStack)) {
                return true;
            } else if (recursionStack[neighbor]) {
                return true;
            }
        }
    }

    recursionStack[node] = false;
    return false;
}

function isCyclic(A, B) {
    let graph = {};
    for (let i = 0; i < B.length; i++) {
        let from = B[i][0];
        let to = B[i][1];
        if (!graph[from]) {
            graph[from] = [];
        }
        graph[from].push(to);
    }

    let visited = {};
    let recursionStack = {};

    for (let node = 1; node <= A; node++) {
        if (!visited[node] && isCyclicUtil(node, graph, visited, recursionStack)) {
            return 1;
        }
    }
    return 0;
}

// Test cases
console.log(
    isCyclic(5, [
        [1, 2],
        [4, 1],
        [2, 4],
        [3, 4],
        [5, 2],
        [1, 3],
    ]),
); // Output: 1
console.log(
    isCyclic(5, [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
    ]),
); // Output: 0

// ** Time Complexity: O(V + E) where V is the number of vertices and E is the number of edges in the graph.
//**  Space Complexity: O(V) where V is the number of vertices in the graph.
