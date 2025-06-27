sequenceDiagram
    participant browser
    participant server

    browser ->> server: POST /exampleapp/new_note_spa
    activate server
    server ->> browser: {"message": "note created"}
    deactivate server

    Note right of browser: The browser updates the DOM to show the new note without reloading the page
