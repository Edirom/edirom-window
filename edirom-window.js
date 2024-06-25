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

    }

    // register the attributes to be observed
    static get observedAttributes() {
        return ['height', 'width', 'top', 'left', 'zIndex', 'position'];
    }   
    
    // connected callback
    connectedCallback() {

        this.shadowRoot.innerHTML = `
        <style>
        .winbox {
            position: absolute;
        }
        </style>
        `;
        
        // Load the winbox library
        const winboxScript = document.createElement('script');
        winboxScript.src = "https://rawcdn.githack.com/nextapps-de/winbox/0.2.82/dist/js/winbox.min.js";
        winboxScript.defer = true;
        this.shadowRoot.appendChild(winboxScript);
        
        // When the winbox library is loaded
        winboxScript.onload = () => {
            
                // Create the window
                const wb = new WinBox({

                    root: this.shadowRoot,
                    title: "New window",
                    html: "Hello, World!",
                    background: "#fff",
                    border: "0.3em",
                    header: 45,
                    x: "center",
                    y: "center",
                    width: "50%",
                    height: "50%"
                    
                });
                console.log("WinBox has loaded!");
           
        };
          

        // Create custom event for the window creation
        const event = new CustomEvent('edirom-window-created', {
            detail: {
                id: this.id,
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
            detail: { 
                id: this.id,
                [property]: newValue 
            },
            bubbles: true
        });
        this.dispatchEvent(event);

        
    }
    
}

// Define the custom element
customElements.define('edirom-window', EdiromWindow);
