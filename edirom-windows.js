class EdiromWindows extends HTMLElement {
    constructor() {
        super();

        // Define the default properties
        this.windows = [];
        this.windowsDefaults = {
            border: "0.3em",
            background: "#ccc"
        }
        // Create shadow DOM
        this.attachShadow({ mode: 'open' });

        // Load the winbox library
        const winboxScript = document.createElement('script');
        winboxScript.src = "https://rawcdn.githack.com/daniel-jettka/winbox/0.2.82/dist/js/winbox.min.js";
        winboxScript.defer = true;
        this.shadowRoot.appendChild(winboxScript);

        // Add the winbox css
        const winboxCss = document.createElement('link');
        winboxCss.rel = "stylesheet";
        winboxCss.href = "https://rawcdn.githack.com/daniel-jettka/winbox/0.2.82/dist/css/winbox.min.css";
        this.shadowRoot.appendChild(winboxCss);


        // When the winbox library is loaded
        winboxScript.onload = () => {
            // Loop through the windows array
            for (var i = 0; i < this.windows.length; i++) {
                // Add the default properties
                for (var key in this.windowsDefaults) {
                    if (!this.windows[i].hasOwnProperty(key)) {
                        this.windows[i][key] = this.windowsDefaults[key];
                    }
                }

                // Add root key
                this.windows[i].root = this.shadowRoot;

                // Create the window
                const wb = new WinBox( this.windows[i] );
                console.log("Created WinBox with id '" + wb.id+"'");
            }


        };
    }

    // Register the attributes to be observed
    static get observedAttributes() {
        return ['set', 'add', 'remove', 'update', 'arrange'];
    }

    // Attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        // Custom event for the attribute change
        const event = new CustomEvent('communicate-windows-' + property, {
            detail: { [property]: newValue },
            bubbles: true
        });
        this.dispatchEvent(event);

        // Check the property
        switch (property) {
            case "set":
                // Remove all winbox windows from DOM
                this.shadowRoot.querySelectorAll('.winbox').forEach(e => e.remove());

                // Add the new windows
                if (newValue != "") {
                    this.add(JSON.parse(newValue));
                }
                break;
            case "add":
                if (newValue != "") {
                    this.add(JSON.parse(newValue));
                }
                break;
            case "remove":
                if (newValue != "") {
                    this.remove(newValue);
                }
                break;
            case "update":
                if (newValue != "") {
                    this.update(JSON.parse(newValue));
                }
                break;
            case "arrange":
                if (newValue != "") {
                    this.arrange(newValue);
                }
                break;
            default:
                break;
        }
    }

    // Add a window
    add(windows) {
        // Loop through the windows array
        for (var i = 0; i < windows.length; i++) {
            // Add the default properties
            for (var key in this.windowsDefaults) {
                if (!windows[i].hasOwnProperty(key)) {
                    windows[i][key] = this.windowsDefaults[key];
                }
            }

            // Add the window to the global windows property
            this.windows.push(windows[i]);

            // Add root key
            windows[i].root = this.shadowRoot;

            // Create the window
            new WinBox(windows[i]);
        }
    }

    // Remove a window
    remove(id) {
        // Remove the window from the global windows property
        this.windows = this.windows.filter(function (obj) {
            return obj.id !== id;
        });

        // Remove the window from the DOM
        const element = this.shadowRoot.getElementById(id);
        if (element) {
            element.remove();
        }   
    }

    // Update windows
    update(windows) {

        // Case 1: update all the windows with the same values eg. arranging the windows,
        // windows =  [{"height": "95%"}]


        // Case 2: Update each window with different values

        // Loop through the json string sent to update function
        for (var i = 0; i < windows.length; i++) {
            // Check if there is an id
            if (!windows[i].hasOwnProperty("id")) {
                console.error("Property 'id' missing in update statement: "+JSON.stringify(windows[i]));
                return;
            }
            // Loop through all the existing edirom windows
            for (var j = 0; j < this.windows.length; j++) {
                
                // Check if the id of the input json string is the same as this.windows
                if (windows[i]["id"] == this.windows[j]["id"]) {
                    for (var key in windows[i]) {
                        this.windows[j][key] = windows[i][key];
                    }

                    // TODO: update the window with the new values
                    
                    // remove the window from the DOM
                    //this.remove(windows[i]["id"]);

                    // add the window to the DOM
                    //this.add([this.windows[j]]);
                }
            }
        }
            
    }

    arrange(type){
            // Log all top-level div elements inside the shadow root
            var topLevelDivs = Array.from(this.shadowRoot.querySelectorAll('.winbox'));
            var screenWidth = screen.width;
            var screenHeight = screen.height;


            var contentWidth = screenWidth * 0.8
            var contentHeight = screenHeight * 0.85
            var gridWidth = contentWidth / topLevelDivs.length
            var gridHeight = contentHeight / topLevelDivs.length

            topLevelDivs.forEach((div, index) => {
                if(type == "vertical") {
                    div.style.width = gridWidth+"px" ;
                    div.style.left = index * gridWidth + "px"
                    div.style.top = 0
                    div.style.height = "95%"
                } if(type == "horizontal") {
                    div.style.height = gridHeight+"px"
                    div.style.top = index * gridHeight + "px"
                    div.style.left = 0
                    div.style.width = "80%" ;
                }

            });   
    }


    // Listen for communicate-update-update event and handle updates
    connectedCallback() {

    }
}

// Define the custom element
customElements.define('edirom-windows', EdiromWindows);

