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
            const newDiv = document.createElement('edirom-window');
    
            if(ediromWindows.length > 0){
                 newId = ediromWindows.length + 1
                newDiv.id = "ediromWindow" + newId;
                console.log("new window ", newId)
                
            }else{
                newDiv.id = "ediromWindow" + newId;
            }
            
    
            newDiv.style.marginLeft = '20%';
            //newDiv.class = "resizable-draggable-div";
            newDiv.setAttribute("class", "resizable-draggable-div");
            newDiv.display = "block";
            newDiv.setAttribute("height", (window != "" ? window.height : ""))
            newDiv.setAttribute("width", (window != "" ? window.width : ""))
            newDiv.setAttribute("top", (window != "" ? window.top : ""))
            newDiv.setAttribute("left", (window != "" ? window.left : ""))
            newDiv.setAttribute("zIndex", (window != "" ? window.zIndex : ""))
            // if(window == "")
            // {
            //     console.log("this is windows " ,  this.windows)
            //     this.windows= {}
            //     this.windows['id'] = newDiv.id 
            //     this.windows['height'] = newDiv.height
            //     this.windows['width'] = newDiv.width
            //     this.windows['top'] = newDiv.top
            //     this.windows['zIndex'] = newDiv.zIndex

            // }
            console.log("out first windows is ", this.windows)
    
    
            console.log("the new div is ", newDiv)
            this.parentNode.insertBefore(newDiv, this.nextSibling);
    
            newDiv.getAttributeNames().forEach(attribute => {
                // Adding event listeners for changes in the web component
                newDiv.addEventListener('edirom-window-'+attribute+'-change', (e) => {
                    console.log("this window before change ", this.windows)
         


                console.log('Event "edirom-window-'+attribute+'-change" for '+newDiv.id+'; '+attribute+'="'+e.detail[attribute])
                for(var i=0; i<this.windows.length; i++){
                    if (this.windows[i]["id"] == newDiv.id) {
                        this.windows[i][attribute] = e.detail[attribute]
                    }
                }       
            })})

            newDiv.addEventListener('edirom-window-created', (e) => {
                console.log('Event "edirom-window-created" for '+newDiv.id +'="'+e.detail)
                } ) 
            
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
            
    
           // this.shadowRoot.appendChild(newDiv)

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
