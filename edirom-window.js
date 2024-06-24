class EdiromWindow extends HTMLElement {
    
    constructor() {

        super();
        
        // Create shadow DOM
        this.attachShadow({ mode: 'open' });

        // Define the default properties
        this.width = '200px';
        this.height = "150px";
        this.zIndex = 9;
        this.position = "absolute";
        this.top = "0px";
        this.left = "0px";

        // Define the template
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            #mydiv {
                position:  ${this.position};
                z-index:  ${this.zIndex};
                background-color: #f1f1f1;
                border: 1px solid #d3d3d3;
                text-align: center;
                width: ${this.width};
                height: ${this.height};
                overflow: auto;
            }

            #mydivheader {
                padding: 20px;
                cursor: move;
                z-index: 10;
                background-color: #2196F3;
                color: #fff;
            }

            .resize-handle {
                width: 10px;
                height: 10px;
                position: absolute;
                bottom: -5px;
                right: -5px;
                cursor: se-resize;
            }

            .fa:hover {
                cursor: pointer;
            }

            .checkbox-container {
                margin-top: 10px;
                padding: 10px;
                background-color: #ffffff;
                border: 1px solid #d3d3d3;
                border-radius: 5px;
            }
            
        </style>
        <div id="mydiv">
            <div id="mydivheader">
                <i class="fa fa-window-close" id="windowclose" style="float: right; margin: 1%"></i>
            </div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
            <div class="resize-handle"></div>
        </div>
        `;

        // Define properties for resizing
        this.isResizing = false;
        this.originalWidth = 0;
        this.originalHeight = 0;
        this.originalX = 0;
        this.originalY = 0;
        this.originalMouseX = 0;
        this.originalMouseY = 0;
    }

    // register the attributes to be observed
    static get observedAttributes() {
        return ['height', 'width','top', 'left', "zIndex"];
    }   
    
    // connected callback
    connectedCallback() {
        this.dragElement(this.shadowRoot.getElementById("mydiv"));
        this.initResize();
        
        // Accessing elements from the main document
        //this.shadowRoot.getElementById("ediromWindow1").style.display = 'none';

        this.shadowRoot.getElementById("windowclose").addEventListener('click', this.close.bind(this));
        this.shadowRoot.getElementById("mydiv").addEventListener('click', this.changeZindex.bind(this));


        // Create custom event for the window creation
        const event = new CustomEvent('edirom-window-created', {
            detail: {
                position: this.position,
                zIndex: this.zIndex,
                width: this.width,
                height: this.height,
                top: this.top,
                left: this.left
              },
            bubbles: true
        });
        this.dispatchEvent(event);


    }


    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {

        // Create custom event for when attribute is changed
        const event = new CustomEvent('edirom-window-'+property+'-change', {
            detail: { [property]: newValue },
            bubbles: true
        });
        this.dispatchEvent(event);

        // switch for attribute changed
        switch(property) {
            case "height":
                this.height = newValue
                this.shadowRoot.getElementById("mydiv").style.height = newValue           
                break;
            case "width":
                this.width = newValue
                this.shadowRoot.getElementById("mydiv").style.width = newValue
                break;
            case "top":
                this.top = newValue
                this.shadowRoot.getElementById("mydiv").style.top = newValue
                break;
            case "left":
                this.left = newValue
                this.shadowRoot.getElementById("mydiv").style.left = newValue
                break;
            case "zIndex":
                this.zIndex = newValue
                this.shadowRoot.getElementById("mydiv").style.zIndex = newValue
                break;
            default:
                console.log("default uknown property", property)
              // code block
            
          }
        
    }
    


    hide() {
        console.log("my div is clicked ", this.shadowRoot.getElementById("mydiv").style.display)
        this.shadowRoot.getElementById("mydiv").style.display = 'none';
    }

    changeZindex(){
    //    // Create a new event, allowing for data to be passed
    //    let event = new CustomEvent('updateEvent', { 
    //     detail: {'name': 'hizkiel' }
    //     });

    //     // Dispatch the event
    //     this.dispatchEvent(event);

    //     var shadowToolBar = document.querySelectorAll("show-toolbar");
    //   //  var ediromWindow = shadowToolBar.querySelectorAll("edirom-eindow")
        var elems = document.querySelectorAll('edirom-window');

    
            for (var i = 0; i < elems.length; i++) {
                let shadowRoot = elems[i].shadowRoot;
                
                if (shadowRoot) {
                    let myDiv = shadowRoot.getElementById("mydiv");
                    if (myDiv) {
                        myDiv.style.zIndex = '0';
                        console.log(myDiv)
                    }
                }
            }

        // Set the z-index of the shadow DOM element in the current context
        this.shadowRoot.getElementById("mydiv").style.zIndex = '1';
        
    }

    close() {
        console.log("close index is clicked")
        this.shadowRoot.getElementById("mydiv").remove();
    }

    dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = this.shadowRoot.getElementById("mydivheader");

        header.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    initResize() {
        const resizeHandle = this.shadowRoot.querySelector('.resize-handle');

        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop event propagation to prevent further triggering
            if (!this.isResizing) {
                this.isResizing = true;
                const mydiv = this.shadowRoot.getElementById('mydiv');
                const rect = mydiv.getBoundingClientRect();
                this.originalWidth = parseFloat(getComputedStyle(mydiv, null).getPropertyValue('width').replace('px', ''));
                this.originalHeight = parseFloat(getComputedStyle(mydiv, null).getPropertyValue('height').replace('px', ''));
                this.originalX = rect.left;
                this.originalY = rect.top;
                this.originalMouseX = e.pageX;
                this.originalMouseY = e.pageY;

                document.addEventListener('mousemove', this.resizeElement.bind(this));
                document.addEventListener('mouseup', this.stopResize.bind(this));
            }
        });
    }

    resizeElement(e) {
        if (!this.isResizing) return;

        const mydiv = this.shadowRoot.getElementById('mydiv');
        const width = this.originalWidth + (e.pageX - this.originalMouseX);
        const height = this.originalHeight + (e.pageY - this.originalMouseY);

        mydiv.style.width = width + 'px';
        mydiv.style.height = height + 'px';
    }

    stopResize() {
        this.isResizing = false;
        document.removeEventListener('mousemove', this.resizeElement.bind(this));
        document.removeEventListener('mouseup', this.stopResize.bind(this));
    }
}

// Define the custom element
customElements.define('edirom-window', EdiromWindow);
