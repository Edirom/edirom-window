class EdiromWindows extends HTMLElement {
    
    constructor() {

        super();

        // Define the default properties
        this.windows = {};
        
        // Create shadow DOM
        this.attachShadow({ mode: 'open' });


        // Load the winbox library
        const winboxScript = document.createElement('script');
        winboxScript.src = "https://rawcdn.githack.com/nextapps-de/winbox/0.2.82/dist/js/winbox.min.js";
        winboxScript.defer = true;
        this.shadowRoot.appendChild(winboxScript);
        

        // When the winbox library is loaded
        winboxScript.onload = () => {

            // Create the windows
            for(var i=0; i<this.windows.length; i++){
                this.add(this.windows[i]);
            }

        }


    }

    // register the attributes to be observed
    static get observedAttributes() {
        return ['windows', 'add-window', 'remove-window'];
    }   
    

    // connected callback
    connectedCallback() {

        

    }


    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {

        switch(property) {
            case "windows":
                if (newValue != ""){
                    this.init(JSON.parse(newValue));
                }
                break;
            case "add-window":
                if (newValue != ""){
                    this.add(JSON.parse(newValue));
                }
                break;
            case "remove-window":
                if (newValue != ""){
                    this.remove(newValue);
                }
                break;
            default:
                break;
        }
        
    }

    init(windows){

        // clear the existing windows
        for(var i=0; i<this.windows.length; i++){
            this.remove(this.windows[i].id);
        }

        // Parse the JSON
        this.windows = windows;

        // Create the windows
        for(var i=0; i<this.windows.length; i++){
            this.add(this.windows[i]);
        }

    }

    // Create a new window
    add(window){

        // add the window to the windows array
        this.windows.push(window);

        // Create the window
        const wb = new WinBox(windowConfig);

        // Custom event for the window creation
        const event = new CustomEvent('edirom-window-created', {
            detail: windowConfig,
            bubbles: true
        });
        this.dispatchEvent(event);

    }

    // Remove a window
    remove(windowId){

        // remove the window from the windows array
        this.windows = this.windows.filter(window => window.id !== windowId);

        // Get the window
        const wb = WinBox.instances.get(windowId);

        // Close the window
        wb.close();

    }
    
}

// Define the custom element
customElements.define('edirom-windows', EdiromWindows);
