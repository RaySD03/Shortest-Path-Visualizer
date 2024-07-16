const column_slider = document.getElementById('ColumnRangeSlider');
const column_count = document.getElementById('ColumnRange');
const row_slider = document.getElementById('RowRangeSlider');
const row_count = document.getElementById('RowRange');
const variance_range = document.getElementById('VarianceRange');
const variance_slider = document.getElementById('VarianceRangeSlider');

function openSwipeMenu() {
    const menu = document.querySelector('.swipe-menu');
    menu.style.right = '0'; // Slide the menu in from the right
}

function closeSwipeMenu() {
    const menu = document.querySelector('.swipe-menu');
    menu.style.right = '-300px'; // Slide the menu out to the right
}

// Update the current column_slider value
column_slider.oninput = function() {
    column_count.innerHTML = this.value;
    createGrid(row_count.innerHTML, column_count.innerHTML, variance_range.innerHTML);
};

// Update the current row_slider value
row_slider.oninput = function() {
    row_count.innerHTML = this.value;
    createGrid(row_count.innerHTML, column_count.innerHTML, variance_range.innerHTML);
};

// Update the current variance_slider value
variance_slider.oninput = function() {
    variance_range.innerHTML = this.value;
    createGrid(row_count.innerHTML, column_count.innerHTML, variance_range.innerHTML);
};
