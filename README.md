![GitHub License](https://img.shields.io/github/license/Edirom/edirom-window)

# Edirom Windows Web Component

This web component displays and creates new windows using the winbox library. It is intended to be used in tbe Edirom Online, but can also be (re-)used in other web applications. No compilation or building is necessary to use the web component. 
The component uses a [fork](https://github.com/daniel-jettka/winbox) of the [WinBox library](https://nextapps-de.github.io/winbox/) which is like the component itself based on plain JavaScript.

Note: This repository only contains the bare JavaScript-based component, there is a separate [demo suite](https://github.com/Edirom/edirom-web-components-demonstrator) for web components developed in the Edirom Online Reloaded project, where the component can be seen and tested.


## License

The edirom-windows.js comes with the license MIT. 
The imported winbox library comes with the license Apache-2.0.


## How to use this web component

1. Clone the repository into a directory of your choice
2. Include the path to the web component's JavaScript file into the `<head>` an HTML page
```html
<script src="path/to/edirom-windows.js"></script>
```
3. Include a custom element (this is specified and can be processed by the component) into the `<body>` of the HTML page. The attributes of the custom element are used as parameters at initialization of the component and changing them (manually or programmatically) can control the components state and behaviour during runtime. The state changes of the web component are communicated outwards via custom events (called 'communicate-{change-type}-update'). The component/document that instantiates the web component (its parent) can listen (via event listeners which have to be implemented individually) and react to the communicated state changes if necessary. The separation of inward communication (via custom element's attributes) and outward communication (via custom events) is esp. necessary to handle frequently populated information like currentTime of the audio player and avoid interference between reading and writing info about the component's state.
```html
<edirom-windows set="" add="" remove="" arrange=""></edirom-windows>
```

### Parameters

_Note: All attribute values are strings internally, the data type information below indicates the necessary format of the attribute value._

The window definition mentioned below are based on the available [WinBox options](https://github.com/daniel-jettka/winbox?tab=readme-ov-file#options).

| Parameter | Data type | Description | default |
|---------------|---|---|---|
| set       | json   | initiating windows (removing all existing ones); array of window definitions: `[{"title": "Window title", "html": "<h1>Window heading</h1><p>Lorem ipsum</p>"}, ... ]` | |
| add       | json   | adding windows (keeping all existing ones); array of window definitions: `[{"title": "Window title", "html": "<h1>Window heading</h1><p>Lorem ipsum</p>"}, ... ]` | |
| remove    | string | id of an existing window that will be removed (normally sth like "winbox-1") | |
| arrange   | string | arranging open windows on available screen; available options/values: horizontal, vertical | |
