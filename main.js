const container = document.querySelector('.container');
const dimensionsDisplay  = document.querySelector('.dimensions');
const range = document.querySelector('input[type="range"]');
const colorPicker = document.querySelector('input[type="color"]');
const pixels = container.querySelectorAll('div');
const randomColorsBtn = document.querySelector('.rainbow');
const eraseBtn = document.querySelector('.erase');
const clearBtn = document.querySelector('.clear');
const borders = document.querySelector('.border');

let mouseDown = false;
let color = '#1D5386';
let rainbow = false;
let eraseMode = false;


//Change dimensions
range.addEventListener('input', e => {
    dimensionsDisplay.innerHTML = `${e.target.value} x ${e.target.value}`;
    container.querySelectorAll('div').forEach(pixel => pixel.remove());
    createGrid(e.target.value);
});

//Pick color

colorPicker.addEventListener('input', e => {
    color = e.target.value;
    if(eraseMode) {
        eraseMode = false;
        eraseBtn.classList.remove('active');
    }
    if(randomColorsBtn.classList.contains('active')) {
        randomColorsBtn.classList.remove('active');
        rainbow = false;
    }
});


//Other Controls
randomColorsBtn.addEventListener('click', e => {
        if(eraseMode) {
            eraseMode = false;
            eraseBtn.classList.remove('active');
        };

        rainbow = true;
        e.target.classList.toggle('active');
        if(!e.target.classList.contains('active')) {
            rainbow = false;
            color = colorPicker.value;
        }
});


eraseBtn.addEventListener('click', e => {
        eraseMode = true;
        e.target.classList.toggle('active');

        if(rainbow) rainbow = false;
        randomColorsBtn.classList.remove('active');
        if(!e.target.classList.contains('active')) {
            eraseMode = false;    
        }
});


clearBtn.addEventListener('click', e => {
    container.querySelectorAll('div').forEach(item => item.style.backgroundColor = 'transparent');
    color = colorPicker.value;
    if(eraseMode) {
        eraseMode = false;
        eraseBtn.classList.remove('active');
    }
});


borders.addEventListener('click', e => {
    e.target.classList.toggle('active');
    if(e.target.classList.contains('active')) {
        container.querySelectorAll('div').forEach(item => item.classList.add('pixel'));
    } else {
        container.querySelectorAll('div').forEach(item => item.classList.remove('pixel'));
    }
})


function generateRandomColor() {
    color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}


container.addEventListener('mouseup', () => mouseDown = false);
container.addEventListener('mousedown', () => mouseDown = true);

//Draw

function draw(e) {
    if(e.type === 'mouseover' && !mouseDown) return;

    if(rainbow) generateRandomColor();
    if(eraseMode)  color = 'transparent';
    e.target.style['background-color'] = color;
}


//Create Grid

function createGrid(s = 16) {
    for(let i = 0; i < s; i++) {
        for(let j = 0; j < s; j++) {
            const pixels = document.createElement('div');
            pixels.style.width = `calc(100% / ${s})`;
            pixels.style.height = `calc(100% / ${s})`;
            pixels.addEventListener('mousedown', draw);
            pixels.addEventListener('mouseover', draw);
            container.appendChild(pixels);
        }
    }
}

createGrid();






