const menu_icon = document.querySelector('.menu-icon');
const tools_cont = document.querySelector('.tools-cont');
const pencil_icon = document.querySelector('.pencil');
const eraser_icon = document.querySelector('.eraser');
const pencil_options = document.querySelector('.pencil-options');
const eraser_options = document.querySelector('.eraser-options');
const stickyNote_icon = document.querySelector('.sticky-notes');
//state variables
let showToolsFlag = true;
let pencilOptionsFlag = false;
let eraserOptionsFlag = false;

//helper functios
const openTools = () => {
  menu_icon.classList.remove('fa-times');
  menu_icon.classList.add('fa-bars');
  tools_cont.style.visibility = 'visible';
};
const closeTools = () => {
  menu_icon.classList.remove('fa-bars');
  menu_icon.classList.add('fa-times');
  tools_cont.style.visibility = 'hidden';
};
const stickyNoteActions = (minimize,close,container) => {
    close.addEventListener('click',()=>{
        container.remove();
    })
    minimize.addEventListener('click',()=>{
        const stickyNoteBody=container.querySelector('.sticky-note-body');
        const display=getComputedStyle(stickyNoteBody).getPropertyValue('display');
        if(display==='none'){
            stickyNoteBody.style.display='block';
        }
        else{
            stickyNoteBody.style.display='none';
        }
    })
};

const createStickyNote = (stickyNoteTemplate) => {
  const stickyCont = document.createElement('div');
  stickyCont.classList.add('sticky-note-cont');
  stickyCont.innerHTML = stickyNoteTemplate;
  document.body.append(stickyCont);
  const minimizeStickyNote = document.querySelector('.sticky-note-minimize');
  const closeStickyNote = document.querySelector('.sticky-note-close');
  stickyNoteActions(minimizeStickyNote, closeStickyNote, stickyCont);
};
const drag_Drop_functionality = () => {};
//Event Listeners
menu_icon.addEventListener('click', () => {
  showToolsFlag = !showToolsFlag;
  if (showToolsFlag) {
    openTools();
  } else {
    closeTools();
  }
});
pencil_icon.addEventListener('click', () => {
  pencilOptionsFlag = !pencilOptionsFlag;
  if (pencilOptionsFlag) {
    pencil_options.style.display = 'block';
  } else {
    pencil_options.style.display = 'none';
  }
});
eraser_icon.addEventListener('click', () => {
  eraserOptionsFlag = !eraserOptionsFlag;
  if (eraserOptionsFlag) {
    eraser_options.style.display = 'block';
  } else {
    eraser_options.style.display = 'none';
  }
});
stickyNote_icon.addEventListener('click', () => {
  const stickyNoteTemplate = `
        <div class="sticky-note-header">
          <div class="sticky-note-minimize"></div>
          <div class="sticky-note-close"></div>
        </div>
        <div class="sticky-note-body">
          <textarea name="sticky-note-input" class="sticky-note-textarea">
          </textarea>
        </div>
`;
  createStickyNote(stickyNoteTemplate);
});
