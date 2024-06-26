class EdiromWindows extends HTMLElement {
    
    constructor() {

        super();

        // Define the default properties
        this.windows = [ ];
        
        // Create shadow DOM
        this.attachShadow({ mode: 'open' });


        // Load the winbox library
        const winboxScript = document.createElement('script');
        winboxScript.src = "https://rawcdn.githack.com/nextapps-de/winbox/0.2.82/dist/js/winbox.min.js";
        winboxScript.defer = true;
        this.shadowRoot.appendChild(winboxScript);

        // add the winbox css
        const winboxCss = document.createElement('link');
        winboxCss.rel = "stylesheet";
        winboxCss.href = "https://rawcdn.githack.com/nextapps-de/winbox/0.2.82/dist/css/winbox.min.css";
        this.shadowRoot.appendChild(winboxCss);
        



        // When the winbox library is loaded
        winboxScript.onload = () => {

            // loop through the windows array
            for(var i=0; i<this.windows.length; i++){

                // add the window to the global windows property
                //this.windows.push(windows[i]);

                // add root key
                this.windows[i].root = this.shadowRoot;

                // Create the window
                new WinBox( this.windows[i] );
            }

        }


    }

    // register the attributes to be observed
    static get observedAttributes() {
        return ['set', 'add', 'remove'];
    }   
    

    // connected callback
    connectedCallback() {



    }


    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {

        // Custom event for the attribute change
        const event = new CustomEvent('communicate-'+property+'-update', {
            detail: { [property]: newValue },
            bubbles: true
        });
        this.dispatchEvent(event);

        // Check the property
        switch(property) {
            case "set":
                if (newValue != ""){
                    this.add(JSON.parse(newValue));
                }
                break;
            case "add":
                if (newValue != ""){
                    this.add(JSON.parse(newValue));
                }
                break;
            case "remove":
                if (newValue != ""){
                    this.remove(newValue);
                }
                break;
            default:
                break;
        }
        
    }

    
    // add a window
    add(windows){

        // loop through the windows array
        for(var i=0; i<windows.length; i++){

            // add the window to the global windows property
            this.windows.push(windows[i]);

            // add root key
            windows[i].root = this.shadowRoot;

            // Create the window
            const wb = new WinBox( windows[i] );

        }
    }

    // remove a window
    remove(id){

        this.shadowRoot.getElementById(id).remove();

    }


}

// Define the custom element
customElements.define('edirom-windows', EdiromWindows);
