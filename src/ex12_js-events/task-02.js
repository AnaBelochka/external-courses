function handler() {
    var subMenu = document.getElementById('subList');
    if (subMenu.style.display === 'block') {
        subMenu.style.display = 'none';
    } 
        
    subMenu.style.display = 'block';
}

var dropDown = document.getElementById('topMenu');

dropDown.addEventListener('mousedown', handler);