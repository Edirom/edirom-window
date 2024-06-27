class EdiromToolbar extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
        #toolbar{
            width: 20%;
            height: 450px;
            margin-left: 80%;
            margin-top: 1%;
            border: 6px solid #d0cccc;
            border-radius: 10px;
        }
        p{
            font-size: 13px;
            margin: 5%;
            font-family: "PT Sans", "Open Sans", "Courier New", "Helvetica Neue", Helvetica, "Myriad Pro", ScalaSans, Arial, sans-serif;
        }   
        #toolbar ul {
            list-style-type: none;
            font-family: "PT Sans", "Open Sans", "Courier New", "Helvetica Neue", Helvetica, "Myriad Pro", ScalaSans, Arial, sans-serif;
            font-size: 13px;

        }
        #toolbar ul:hover {
            cursor: pointer;
        }
        </style>
        <body>
            <div id="toolbar">
            <p>Introduction<p>
            <ul>
                <li id=rea>Read Me!</li>
            </ul>
            <p>Work</p>
            <ul>
                <li id="cri">Critical remarks</li>
                
            </ul>
            <p>Sources</p>
            <ul>
            <li id="aut">Autograph</li> 
            <li id="fe"> First edition</li>
            </ul>
            <p> Edition</p>
            <ul>
            <li id="ne">New Edition</li> 
            </ul>
            </div>
        </body>
        
        `
    }
     createWindow(){
        const ediromWindows = document.querySelector('edirom-windows');

        // Define the new window
        const newWindow = {
            id: 'newWindow',
            title: 'New Window',
            // Add other properties as needed
        };
    
        // Add the new window
        ediromWindows.add([newWindow]);
        

    }

        // connected callback
        connectedCallback() {
            this.shadowRoot.getElementById("rea").addEventListener('click', this.createWindow.bind(this));
            this.shadowRoot.getElementById("cri").addEventListener('click', this.createWindow.bind(this));
            this.shadowRoot.getElementById("aut").addEventListener('click', this.createWindow.bind(this));
            this.shadowRoot.getElementById("fe").addEventListener('click', this.createWindow.bind(this));
            this.shadowRoot.getElementById("ne").addEventListener('click', this.createWindow.bind(this));



        }

}
customElements.define('edirom-toolbar', EdiromToolbar);