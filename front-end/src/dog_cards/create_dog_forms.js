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

let ableToCut = false;
let buttonCut = document.querySelector('div#button_crop');

let canvas  = document.createElement('canvas');
let ctx     = canvas.getContext('2d'); 

let imagePreview = document.querySelector('img#picture_preview');

let SliderElementX = document.getElementById('slider_x');
let SliderElementY = document.getElementById('slider_y');
let SliderElementZoom = document.getElementById('slider_zoom');

let cutterPreview = document.querySelector('div#cutter_container');
let cutterPreviewW = document.querySelector('div#cutter_container').offsetWidth;
let cutterPreviewH = document.querySelector('div#cutter_container').offsetHeight;

let imageHeight = 0;
let imageWidth = 0;
let x,y,z;

function buttonCropClick() {
    ableToCut = !ableToCut;
    
    if (ableToCut) {
        SliderElementX.style.display = 'flex';
        SliderElementY.style.display = 'flex';
        SliderElementZoom.style.display = 'flex';
    }else{
        SliderElementX.style.display = 'none';
        SliderElementY.style.display = 'none';
        SliderElementZoom.style.display = 'none';
    }
}

function updateImageChange(e) {
    e.preventDefault();
    
    const [File] = e.target.files;
    
    if (File) {
        imagePreview.src = URL.createObjectURL(File);
    }
}

imagePreview.onload = function(){
    imageHeight = imagePreview.height;
    imageWidth = imagePreview.width;
    SliderElementX.value = 0;
    SliderElementY.value = 0;
    SliderElementZoom.min = 0.5;
    SliderElementZoom.max = 1.5;
    SliderElementZoom.value = ((SliderElementZoom.min)+(SliderElementZoom.max) ) / 2;
    
    SliderElementX.min = 0;
    SliderElementY.min = 0;
    
    SliderElementX.max = ((imageWidth  -  cutterPreviewW));
    SliderElementY.max = ((imageHeight -  cutterPreviewW));
    
    SliderElementZoom.step = 0.01;
    
    x = SliderElementX.value; y = SliderElementY.value;
    z = SliderElementZoom.value;
    defineTransform(x, y, z);

    canvas.width  = imagePreview.width;
    canvas.height = imagePreview.height;
    
    ctx.clearRect(0, 0, imagePreview.width, imagePreview.height);
    ctx.drawImage(imagePreview, 0, 0);
}

SliderElementX.oninput = function() {
    x = -(SliderElementX.value)+(imageWidth/2)-(cutterPreviewW/2);
    defineTransform(x, y, z);
}

SliderElementY.oninput = function() {
    y = -(SliderElementY.value)+(imageHeight/2)-(cutterPreviewH/2);
    defineTransform(x, y, z);
}

SliderElementZoom.oninput = function() {
    z = (SliderElementZoom.value);
    defineTransform(x, y, z);
}

function defineTransform(x, y, z) {
    // console.table([x, y, z]);
    picture_preview.style.transform = `translate(${x}px,${y}px) scale(${z})`
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