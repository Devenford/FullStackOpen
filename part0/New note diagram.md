sequenceDiagram
    participant browser
    participant server

    browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server ->>browser: 302 Found\nredirect to Location: /exampleapp/notes
    deactivate server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server ->>browser: HTML Document
    deactivate server
    
    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server ->>browser: CSS File
    deactivate server
    
    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server ->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server ->>browser: [{"content": "ez", "date": "2025-06-27T13:51:49.286Z"},{"content": "ABABABABABABAB", "date": "2025-06-27T13:54:40.308Z"},...]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
    