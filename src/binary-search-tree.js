const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
   constructor() {
      this.treeRoot = null;
   }
   root() {
      return this.treeRoot;
   }

   add(data) {
      const addNode = (node, value) => {
         if (!node) return new Node(value);
         if (node.data === value) return node;
         if (node.data > value) node.left = addNode(node.left, value);
         if (node.data < value) node.right = addNode(node.right, value);

         return node;
      };
      this.treeRoot = addNode(this.treeRoot, data);
   }

   has(data) {
      const hasNode = (node, value) => {
         if (!node) return false;
         if (node.data === value) return true;
         if (node.data > value) return hasNode(node.left, value);
         if (node.data < value) return hasNode(node.right, value);
      };
      return hasNode(this.treeRoot, data);
   }

   find(data) {
      const findNode = (node, value) => {
         if (!node) return null;
         if (node.data === value) return node;
         if (node.data > value) return findNode(node.left, value);
         if (node.data < value) return findNode(node.right, value);
      };
      return findNode(this.treeRoot, data);
   }

   remove(data) {
      const removeNode = (node, value) => {
         if (!node) return null;
         if (node.data > value) {
            node.left = removeNode(node.left, value);
            return node;
         }
         if (node.data < value) {
            node.right = removeNode(node.right, value);
            return node;
         }
         if (!node.left && !node.right) return null;
         if (!node.left) {
            node = node.right;
            return node;
         }
         if (!node.right) {
            node = node.left;
            return node;
         }
         let minRight = node.right;
         while (minRight.left) minRight = minRight.left;
         node.data = minRight.data;
         node.right = removeNode(node.right, minRight.data);
         return node;
      };
      this.treeRoot = removeNode(this.treeRoot, data);
   }

   min() {
      if (!this.treeRoot) return;
      let node = this.treeRoot;
      while (node.left) node = node.left;
      return node.data;
   }

   max() {
      if (!this.treeRoot) return;
      let node = this.treeRoot;
      while (node.right) node = node.right;
      return node.data;
   }
}

module.exports = {
   BinarySearchTree,
};
