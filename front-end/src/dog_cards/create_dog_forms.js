window.onload = async () => {
    const logged = await verifyLogged();
    getBreeds();

    if (logged === true) {
        console.log('User logged');
    }else{
        console.log('User not logged');
    }
}

function sendPostNewDog(e) {
    e.preventDefault();
    const formData      = new FormData(e.target);
    postFormData(formData, localStorage.getItem('token'));
    Redirect.toRoom('..');    
    // console.log(formData.getAll('image-aumigo'))
};

let ableToCut = true;
let buttonCut = document.querySelector('div#button_crop');

let canvas  = document.getElementById('cutter_container');
canvas.width = 300;
canvas.height = 300;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let ctx     = canvas.getContext('2d');

let SliderElementX = document.getElementById('slider_x');
let SliderElementY = document.getElementById('slider_y');
let SliderElementZ = document.getElementById('slider_zoom');

let imageWidth = 0;
let imageHeight = 0;
let x, y;

let middleX = 0;
let middleY = 0;
let patterZ = 1;
let z = patterZ;

let imagePreview, imagePreview_width, imagePreview_height;

function updateImageChange(e) {
    e.preventDefault();
    
    const [File] = e.target.files;
    
    if (File) {
        imagePreview        = new Image();
        imagePreview.setAttribute("id", "picture_preview");
        imagePreview.src    = URL.createObjectURL(File);

        imagePreview.onload = function () {
            middleX = (this.naturalWidth/2)-(canvas.width/2);
            middleY = (this.naturalHeight/2)-(canvas.height/2);

            drawCtx(
                    middleX, 
                    middleY, 
                    patterZ);
            onLoadMove(this.naturalWidth, this.naturalHeight);
        };

        // imagePreview.onload = onLoadImage;
    }
}

function drawCtx (x, y, z) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imagePreview, x,
                                y,
    300 * z, 300 * z, 0, 0, canvas.width, canvas.height);

    console.log(imagePreview);
}

function onLoadMove(imageWidth, imageHeight) {
    SliderElementX.value = 0;
    SliderElementY.value = 0;
    
    SliderElementZ.value    = patterZ;
    SliderElementZ.step     = 0.01;
    SliderElementZ.min      = patterZ - 0.5;
    SliderElementZ.max      = patterZ + 0.5;

    SliderElementX.min = -imageWidth/2;
    SliderElementY.min = -imageHeight/2;
    SliderElementX.max = +imageWidth/2;
    SliderElementY.max = +imageHeight/2;
    
    x = SliderElementX.value; y = SliderElementY.value;
}

SliderElementX.oninput = function() {
    const sliderX = +SliderElementX.value;
    x = middleX + sliderX;
    
    console.log(middleX, SliderElementX.value, x);

    drawCtx(
        x, 
        y, 
        z);
}

SliderElementY.oninput = function() {
    const sliderY = +SliderElementY.value;
    y = middleY + sliderY;
    console.log(y);
    
    drawCtx(
        x, 
        y, 
        z);
}

SliderElementZ.oninput = function() {
    const sliderZ = +SliderElementZ.value;
    z = +sliderZ;
    console.log(z);
    
    drawCtx(
        x, 
        y, 
        z);
}

function buttonCropClick() {
    console.log('funcao')
    ableToCut = !ableToCut;
    
    if (ableToCut) {
        SliderElementX.style.display = 'flex';
        SliderElementY.style.display = 'flex';
        SliderElementZ.style.display = 'flex';
    }else{
    // esconder a ferramenta de seleção
    SliderElementX.style.display = 'none';
    SliderElementY.style.display = 'none';
    SliderElementZ.style.display = 'none';

    // atualizar o preview da imagem
    // First you round the corners permanently by making a clipping region:

    let img = new Image();
    img.src = canvas.toDataURL();
    imagePreview.src = img.src;
    console.log(img);
    //then a user draws something onto HIDDEN canvas, like an image
    // This image never gets its corners cut
    // Then you draw the hidden canvas onto your normal one:
    drawCtx (x, y, z);
    }
}






















/*
*   ===================================
*   CUT IMAGE USING MOUSE HALF WORKING:
*   ===================================
*/
/*
 let oldPos;
 let oldPositionSlider = SliderElementX.value;

 const cutterContaier = document.querySelector('div#cutter_container');
 const picture_preview = document.querySelector('img#picture_preview');

 function mouseMove (e) {
     const { offsetX: off_x, offsetY: off_y, pageX: px, pageY: py } = e;
     const a = picture_preview.getBoundingClientRect();

     if ( oldPosX < e.pageX ){
         x++;
     }else{
         x--;
     }

     if ( oldPosY < e.pageY ){
         y++;
     }else{
         y--;
     }
    
     defineTransform(x, y);
 }

 function mouseScroll(e){
     console.log(picture_preview.scrollTop);
     console.log(e.scrollTop);
     // picture_preview.style.transform = `scale(${x}px,${y}px)`;
 }


 cutterContaier.onmouseover = function () {
     // console.log('On mouse hover!');
     cutterContaier.addEventListener('scroll', mouseScroll);
 }


 cutterContaier.onmousedown = function (e) {
     oldPosX = e.pageX;
     oldPosY = e.pageY;
     cutterContaier.addEventListener('mousemove', mouseMove);
 }

 cutterContaier.onmouseup = function () {
     cutterContaier.removeEventListener('mousemove', mouseMove);
     // console.log('Mouse Up !');
 }

 cutterContaier.onmouseleave = function () {
     // picture_preview.style.transform = `translate(${0}px,${0}px)`;
     // console.log(x,y);
     cutterContaier.removeEventListener('mousemove', mouseMove);
         // console.log('Mouse Leave!');
 }

 function defineTransform(x, y) {
     picture_preview.style.transform = `translate(${x}px,${y}px)`;
 }



  SLIDER IMAGE:
 



 function imageSlider_X () {
     const image_infos = cutterContaier.getBoundingClientRect();
     console.log(image_infos);
     console.log(document.querySelector("#picture_preview").naturalHeight);
 }

 imageSlider_X();

*/