// Reverse a singly linked list.

// Example:

// Input: 1->2->3->4->5->NULL
// Output: 5->4->3->2->1->NULL
// Follow up:

// A linked list can be reversed either iteratively or recursively. Could you implement both?
/**
 * 
 * 
 * https://leetcode.com/problems/reverse-linked-list/
 * 
 * 
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */


var reverseList = function(head) {
    let previous = null; 
    while (head) {
        let nextHead = head.next;
        head.next = previous;
        previous = head; 
        head = nextHead;
    }
    return previous 
}