window.onload = function() {
    alert('Welcome to Mahyu30\'s digital business card!');
};

document.getElementById('colorBtn').addEventListener('click', function() {
    var bio = document.getElementById('bio');
    var colors = ['#636e72', '#6a89cc', '#3867d6', '#00b894', '#fdcb6e'];
    var currentColor = bio.style.color || '#636e72';
    var nextColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
    bio.style.color = nextColor;
});
