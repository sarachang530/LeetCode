/*
Invert a binary tree.

Example:

Input:

     4
   /   \
  2     7
 / \   / \
1   3 6   9
Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1

*/


// Definition for a binary tree node.
 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
      this.left = (left===undefined ? null : left)
      this.right = (right===undefined ? null : right)
  }
 
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if(root === null) return root;
  treeNodeR = invertTree(root.right);
  treeNodeL = invertTree(root.left);

  let temp = root.right
  root.right = treeNodeL;
  root.left = temp;
  return root;
};



const tree = new TreeNode(10);
    tree.left = new TreeNode(5);
    tree.left.left = new TreeNode(3);
    tree.left.right = new TreeNode(6);
    tree.right = new TreeNode(14);

    console.log(tree)
    console.log(invertTree(tree))