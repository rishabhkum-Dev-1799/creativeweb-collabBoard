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
// sticky note minimize and close actions
const stickyNoteActions = (minimize, close, container) => {
  close.addEventListener('click', () => {
    container.remove();
  });
  minimize.addEventListener('click', () => {
    const stickyNoteBody = container.querySelector('.sticky-note-body');
    const display =
      getComputedStyle(stickyNoteBody).getPropertyValue('display');
    if (display === 'none') {
      stickyNoteBody.style.display = 'block';
    } else {
      stickyNoteBody.style.display = 'none';
    }
  });
};
// sticky notes drag and drop functionality
const drag_Drop_functionality = (element, event) => {
  // element.getBoundingClientRect() gives the coordinate of the element in the viewport
  // event provides us the data of the cartesian coordinate where the user the clicked on the view port
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;
  element.style.position = 'absolute';
  element.style.zIndex = 1000;
  //helper functions
  const moveAt = (pageX, pageY) => {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  };
  const onMouseMove = (event) => {
    moveAt(event.pageX, event.pageY);
  };
  moveAt(event.pageX, event.pageY);
  element.addEventListener('mousemove', onMouseMove);
  element.onmouseup = function () {
    element.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };
};
// create sticky notes
const createStickyNote = (stickyNoteTemplate) => {
  const stickyCont = document.createElement('div');
  stickyCont.classList.add('sticky-note-cont');
  stickyCont.innerHTML = stickyNoteTemplate;
  document.body.append(stickyCont);
  const minimizeStickyNote = stickyCont.querySelector('.sticky-note-minimize');
  const closeStickyNote = stickyCont.querySelector('.sticky-note-close');
  const headerStickyNote = stickyCont.querySelector('.sticky-note-header');
  stickyNoteActions(minimizeStickyNote, closeStickyNote,stickyCont);
 stickyCont.onmousedown = function (event) {
    drag_Drop_functionality(stickyCont, event);
  };
  stickyCont.ondragstart=function(){
    return false;
  }
};

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
