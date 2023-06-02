
// properties and style of the tooltip icon in SVG format
const svgs = `
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
    <svg class="tooltip__icon">
      <path d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z" fill-rule="evenodd"></path>
    </svg>
`;

// we insert the SVGs created in div "tooltip added"
// the element creation is at the root level
// so it’s not created every time the event happens
const toolTip = document.createElement("div");
toolTip.classList.add("tooltip");
toolTip.innerHTML = svgs;

const toolTipTail = document.createElement("div");
toolTipTail.classList.add("tooltip__tail");

// Call a function when release a mouse button over a paragraph
const articleElement = document.getElementsByClassName("article")[0];

const mousedownData = {x: null, y: null};

articleElement.onmousedown = (event) => {
  mousedownData.x = event.clientX;
  mousedownData.y = event.clientY;
}

function removeTooltip() {
  if (document.body.contains(toolTip)) {
    document.body.removeChild(toolTip);
    document.body.removeChild(toolTipTail);
  }
}

let selectionQueued = false;

function displayTooltip() {
  const selection = document.getSelection();
  const anchorNode = selection.anchorNode;
  const focusNode = selection.focusNode;

  const rangeRect = selection.getRangeAt(0).getClientRects()[0];

  document.body.appendChild(toolTip);
  document.body.appendChild(toolTipTail);

      // the position of the tooltip relative to the anchor node and the focus node
    // it is now placed in the center of the selection
    document.body.appendChild(toolTip);
    document.body.appendChild(toolTipTail);
  
    // the width of an element
    const toolTipWidth = toolTip.offsetWidth;
    //the height of an element
    const toolTipHeight = toolTip.offsetHeight;
  
    const toolTipTailWidth = toolTipTail.offsetWidth;
    const toolTipTailHeight = toolTipTail.offsetHeight;
  
    const y = rangeRect.y;
    const middleX = rangeRect.x + (rangeRect.width/2);
  
    // we changed the height of the tooltip because we added the tooltipTail
    toolTip.style.top = `${y - toolTipHeight - toolTipTailHeight/2}px`;
    toolTip.style.left = `${middleX - toolTipWidth/2}px`;
  
    toolTipTail.style.top = `${y - toolTipTailHeight/2}px`;
    toolTipTail.style.left = `${middleX - toolTipTailWidth/2}px`;
}

// tooltips only show up when selectionchange says it should, and the user has “finished selecting”.
// We select the text when the user has the mouse over
document.onmouseup = () => {
  if (selectionQueued) {
    displayTooltip();
  }
  selectionQueued = false;
}

document.addEventListener("selectionchange", function(event) {
  // we change the state of the selection
  const selection = document.getSelection();
  if (selection.type !== "Range") {
    removeTooltip();
    return;
  }
    // the selected text corresponds to the path of the data from the anchor node to the focus node
    // so from the beginning to the end of the selection
    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;
  
    // anchorNode = start of the selection
    // focusNode = end of the selection
    if (selection.anchorNode != selection.focusNode) {
      // Cross-paragraph selection
      return;
    }
    
    selectionQueued = true;

});