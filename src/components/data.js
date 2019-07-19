export const data = {
    "navigation": [
    {"id": 1, "title": "Home", "tooltip": "Home screen", "url":"/", "subitems": [] },
    {"id": 2, "title": "Main", "tooltip": "Main screen", "url":"/main", "subitems": [] },
    {"id": 3, "title": "Clients", "tooltip": "Clients screen", "url":"/clients", "subitems": [
            {"id": 31, "title": "Veteran Demographics", "tooltip": "Veteran Demographics screen", "url":"/clients/veteran-demographics", "subitems": [] },
            {"id": 32, "title": "Apointments", "tooltip": "Apointments screen", "url":"/clients/appointments", "subitems": [] },
            {"id": 33, "title": "Project Entry", "tooltip": "Project Entry screen", "url":"/clients/project-entry", "subitems": [] },
            {"id": 34, "title": "Address History", "tooltip": "Address History screen", "url":"/clients/address-history", "subitems": [] },
            {"id": 35, "title": "Veteran Information", "tooltip": "Veteran Information screen", "url":"/clients/veteran-information", "subitems": [] },
            {"id": 36, "title": "Veteran Disabilities", "tooltip": "Veteran Disabilities screen", "url":"/clients/veteran-disabilities", "subitems": [] },
            {"id": 37, "title": "Marriage Information", "tooltip": "Marriage Information screen", "url":"/clients/marriage-information", "subitems": [] },
            {"id": 38, "title": "Household Members", "tooltip": "Household Members screen", "url":"/clients/household-members", "subitems": [] }
        ] },
    {"id": 4, "title": "Administration", "tooltip": "Administration screen", "url":"/admin", "subitems": [] },
    {"id": 5, "title": "Logout", "tooltip": "Logout", "url":"/logout", "subitems": [] }
],
    "clientForm": [
    {
        "id":1,
        "name": "FirstName",
        "element": "input",
        "type": "text",
        "label": "First Name",
        "placeholder": "First Name",
        "items": [],
        "required": true
    },
    {
        "id":1,
        "name": "LastName",
        "element": "input",
        "type": "text",
        "label": "Last Name",
        "placeholder": "Last Name",
        "items": [],
        "required": true
    },
    {
        "id":1,
        "name": "CityBirth",
        "element": "input",
        "type": "text",
        "label": "City of Birth",
        "placeholder": "City of Birth",
        "items": [],
        "required": true
    },
    {
        "id":1,
        "name": "StateBirth",
        "element": "input",
        "type": "text",
        "label": "State of Birth",
        "placeholder": "State of Birth",
        "items": [],
        "required": true
    },
    {
        "id":1,
        "name": "ServiceNumber",
        "element": "input",
        "type": "text",
        "label": "Service Number",
        "placeholder": "Service Number",
        "items": [],
        "required": true
    },
    {
        "id":1,
        "name": "Branch",
        "element": "select",
        "type": "",
        "label": "Branch",
        "placeholder": "",
        "items": [
            { "value": "Army", "label": "Army" },
            { "value": "Navy", "label": "Navy" },
            { "value": "Marines", "label": "Marines" },
            { "value": "AirForce", "label": "AirForce" }
        ],
        "required": true
    },
    {
        "id":1,
        "name": "Rank",
        "element": "input",
        "type": "text",
        "label": "Rank",
        "placeholder": "Rank",
        "items": [],
        "required": false
    },
    {
        "id":1,
        "name": "Discharge",
        "element": "select",
        "type": "",
        "label": "Discharge",
        "placeholder": "",
        "items": [
            { "value": "Honorable", "label": "Honorable" },
            { "value": "Dishonorable", "label": "Dishonorable" },
            { "value": "Medical", "label": "Medical" }
        ],
        "required": true
    },
    {
        "id":1,
        "name": "Comments",
        "element": "input",
        "type": "textarea",
        "label": "Comments",
        "placeholder": "Comments",
        "items": [],
        "required": false
    },
    {}
],
    "clientData": [
    {
        "ID": "AC00120710490",
        "CreateDate":"2009-08-26 00:00:00",
        "FirstName": "John",
        "LastName": "Rollins",
        "CityBirth": "Winchendon",
        "StateBirth": "MA",
        "ServiceNumber": "123456789",
        "Branch": "Army",
        "Rank": "SFC3",
        "Discharge": "Honorable" ,
        "Comments": "This is a veteran for testing data."
    },
    {
        "ID": "AC00120710491",
        "CreateDate":"2009-08-26 00:00:00",
        "FirstName": "Robert",
        "LastName": "Simmons",
        "CityBirth": "Winchendon",
        "StateBirth": "MA",
        "ServiceNumber": "123456789",
        "Branch": "Navy",
        "Rank": "SFC4",
        "Discharge": "Medical",
        "Comments": "This is another veteran for testing data."
    },
    {
        "ID": "AC00120710492",
        "CreateDate":"2009-08-26 00:00:00",
        "FirstName": "Susan",
        "LastName": "Armstrong",
        "CityBirth": "Winchendon",
        "StateBirth": "MA",
        "ServiceNumber": "123456789",
        "Branch": "Marines",
        "Rank": "SFC5",
        "Discharge": "Honorable",
        "Comments": "This is a third veteran for testing data."
    }
]
}



