class ShowToolbar extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({mode: 'open'})
        this.render()
        this.windows = {}

    }


    static get observedAttributes() {
        return ['windows'];
    }    


    render(){
                this.shadowRoot.innerHTML = `
        <style>
        .checkbox-container {
            margin-top: 10px;
            padding: 10px;
            background-color: #ffffff;
            border: 1px solid #d3d3d3;
            border-radius: 5px;
            float: right
            }
        </style>
        <div class="checkbox-container" id="showhide">
        <label for="checkbox1">
            <input type="checkbox" id="checkbox1" name="checkbox1">
            Checkbox 1
        </label><br>
        <label for="checkbox2">
            <input type="checkbox" id="checkbox2" name="checkbox2">
            Checkbox 2
        </label> <br>
        <button id="createContent">Create A new Content</button>

        </div> <!-- Closing div tag -->

        `
    }

    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        switch(property) {
            case "windows":
                if (newValue != ""){
                    this.windows= JSON.parse(newValue)
                    for(var i=0; i<this.windows.length; i++){
                        this.createContent(this.windows[i])
                    }
                }
                break
            default:
                break
    
          }
    }

    connectedCallback(){
        this.shadowRoot.getElementById("checkbox1").addEventListener('change', (event) => this.toggleVisibility('ediromWindow1', event));
        this.shadowRoot.getElementById("checkbox2").addEventListener('change', (event) => this.toggleVisibility('div2', event));
        this.shadowRoot.getElementById("createContent").addEventListener('click', ()=> this.createContent());   
    }

    createContent(window = ""){
 
            var newId = 1
            const ediromWindows = document.querySelectorAll("edirom-window");
            const newEdiromWindow = document.createElement('edirom-window');
    
            if(ediromWindows.length > 0){
                newId = ediromWindows.length + 1
                newEdiromWindow.id = "ediromWindow" + newId;
                console.log("new window ", newId)
                
            }else{
                newEdiromWindow.id = "ediromWindow" + newId;
            }
            
    
            newEdiromWindow.style.marginLeft = '20%';
            //newEdiromWindow.class = "resizable-draggable-div";
            newEdiromWindow.setAttribute("class", "resizable-draggable-div");
            newEdiromWindow.display = "block";
            newEdiromWindow.setAttribute("height", (window != "" ? window.height : ""))
            newEdiromWindow.setAttribute("width", (window != "" ? window.width : ""))
            newEdiromWindow.setAttribute("top", (window != "" ? window.top : ""))
            newEdiromWindow.setAttribute("left", (window != "" ? window.left : ""))
            newEdiromWindow.setAttribute("zIndex", (window != "" ? window.zIndex : ""))
            // if(window == "")
            // {
            //     console.log("this is windows " ,  this.windows)
            //     this.windows= {}
            //     this.windows['id'] = newEdiromWindow.id 
            //     this.windows['height'] = newEdiromWindow.height
            //     this.windows['width'] = newEdiromWindow.width
            //     this.windows['top'] = newEdiromWindow.top
            //     this.windows['zIndex'] = newEdiromWindow.zIndex

            // }

            console.log("our first windows is ", this.windows);
    
    
            console.log("the new div is ", newEdiromWindow);


            // event listener for listening to the creation (DOM-insertion) of the new custom element
            newEdiromWindow.addEventListener('edirom-window-created', (e) => {
                console.log('Event "edirom-window-created" for '+newEdiromWindow.id +'="'+JSON.stringify(e.detail));
            }) 

            // event listener for attribute changes of the new custom element
            newEdiromWindow.getAttributeNames().forEach(attribute => {
                // Adding event listeners for changes in the web component
                newEdiromWindow.addEventListener('edirom-window-'+attribute+'-change', (e) => {
                    console.log("this window before change ", this.windows)
         
                    console.log('Event "edirom-window-'+attribute+'-change" for '+newEdiromWindow.id+'; '+attribute+'="'+e.detail[attribute]+'"')
                    for(var i=0; i<this.windows.length; i++){
                        if (this.windows[i]["id"] == newEdiromWindow.id) {
                            this.windows[i][attribute] = e.detail[attribute]
                        }
                    }       
                })
            })

            // insert the new custom element into the DOM
            this.parentNode.insertBefore(newEdiromWindow, this.nextSibling);
    
            
            const newLabel = document.createElement('label');
            newLabel.htmlFor = "checkbox" + newId; 
            
            const newInput = document.createElement('input');
            newInput.type = "checkbox";
            newInput.id = "windowCheck" + newId; 
            newInput.name = "Show or Hide window " + newId;
    
            const newBreak = document.createElement('br');
    
            const labelText = document.createTextNode("Window " + newId); // Create a text node for the label
            newLabel.appendChild(newBreak); 
            newLabel.appendChild(labelText); 
            newLabel.appendChild(newInput); 
            this.parentNode.insertBefore(newInput, this.nextSibling);
    
            
            console.log("This is the window check box", this.shadowRoot.getElementById("showhide"));
            
    
           // this.shadowRoot.appendChild(newEdiromWindow)

    }

    toggleVisibility(divId, event) {
        const div = document.getElementById(divId); // Query main DOM

        console.log("div id is " + divId)
        if (div) {
                            console.log("display is " + div.style.display)
            
            div.style.display = event.target.checked ? 'block' : 'none';
        }
    }


}
customElements.define('show-toolbar', ShowToolbar);
