function openSwipeMenu() {
    const menu = document.querySelector('.swipe-menu');
    menu.style.right = '0'; // Slide the menu in from the right
}

function closeSwipeMenu() {
    const menu = document.querySelector('.swipe-menu');
    menu.style.right = '-300px'; // Slide the menu out to the right
}