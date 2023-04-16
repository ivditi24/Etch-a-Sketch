const container = document.querySelector('.container');
const dimensionsDisplay  = document.querySelector('.dimensions');
const range = document.querySelector('input[type="range"]');
const btns = document.querySelector('.btns');
const colorPicker = document.querySelector('input[type="color"]');
const pixels = document.querySelectorAll('div[data-value="pixel"]');
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
    document.querySelectorAll('div[data-value="pixel"]').forEach(pixel => pixel.remove());
    createGrid(e.target.value);
});

//Pick color

colorPicker.addEventListener('input', e => {
    color = e.target.value;
});


//Other Controls
randomColorsBtn.addEventListener('click', e => {
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
        if(!e.target.classList.contains('active')) {
            eraseMode = false;
        }
});


clearBtn.addEventListener('click', e => {
    document.querySelectorAll('div[data-value="pixel"]').forEach(item => item.style.backgroundColor = 'transparent');
});


borders.addEventListener('click', e => {
    e.target.classList.toggle('active');
    if(e.target.classList.contains('active')) {
        document.querySelectorAll('div[data-value="pixel"]').forEach(item => item.classList.remove('pixel'));
    } else {
        document.querySelectorAll('div[data-value="pixel"]').forEach(item => item.classList.add('pixel'));
    }
})


function generateRandomColor() {
    color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}


container.addEventListener('mousedown', () => mouseDown = true);
container.addEventListener('mouseup', () => mouseDown = false);

container.addEventListener('mousedown', draw);
container.addEventListener('mouseover', draw);
//Draw

function draw(e) {
    if(e.type === 'mouseover' && !mouseDown) return;

    if(rainbow) generateRandomColor();
    if(eraseMode)  color = 'transparent';
    e.target.style['background-color'] = color;
    console.log(e.target);
}



//Create Grid

function createGrid(s = 16) {
    for(let i = 0; i < s; i++) {
        for(let j = 0; j < s; j++) {
            const pixels = document.createElement('div');
            pixels.setAttribute('data-value', 'pixel');
            pixels.classList.add('pixel');
            pixels.style.width = `calc(100% / ${s})`;
            pixels.style.height = `calc(100% / ${s})`;
            pixels.classList.add('grid');
            container.append(pixels);
        }
    }
}

createGrid();






