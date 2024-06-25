class ShowToolbar extends HTMLElement {

    constructor() {

        super()
        this.attachShadow({mode: 'open'})

        // render content
        this.render()

        // property to store the windows config as JSON
        this.windows = {}

    }

    // register the attributes to be observed
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
 
            const ediromWindows = document.querySelectorAll("edirom-window");
            const newEdiromWindow = document.createElement('edirom-window');      
    
            newEdiromWindow.id = "ediromWindow" + ediromWindows.length;  
            newEdiromWindow.setAttribute("class", "resizable-draggable-div");
            newEdiromWindow.style.marginLeft = '20%';
            newEdiromWindow.display = "block";

            // set attributes according to supplied config
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


            // event listener for listening to the creation (DOM-insertion) of the new custom element
            newEdiromWindow.addEventListener('edirom-window-created', (e) => {
                console.log('Event "edirom-window-created": '+JSON.stringify(e.detail));
            }) 

            // event listener for attribute changes of the new custom element
            newEdiromWindow.getAttributeNames().forEach(attribute => {
                // Adding event listeners for changes in the web component
                newEdiromWindow.addEventListener('edirom-window-'+attribute+'-change', (e) => {         
                    console.log('Event "edirom-window-'+attribute+'-change": '+JSON.stringify(e.detail));
                    for(var i=0; i<this.windows.length; i++){
                        if (this.windows[i]["id"] == newEdiromWindow.id) {
                            this.windows[i][attribute] = e.detail[attribute]
                        }
                    }       
                })
            })

            // insert the new custom element into the DOM
            this.parentNode.insertBefore(newEdiromWindow, this.nextSibling);
    
    }


}
customElements.define('show-toolbar', ShowToolbar);
