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