var kthSmallest = function(root, k) {
    // Traverse the tree, storing all elements in a cache object
    // Numbers are keys, value is 'true'
    // Then loop through the object to find the kth element
    
    const cache = {};
    
    const traverse = node => {
        cache[node.val] = true;
        if(node.left) traverse(node.left);
        if(node.right) traverse(node.right)
    }
    
    traverse(root);
    
    return Object.keys(cache)[k-1]
};