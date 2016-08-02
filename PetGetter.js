var getPetData = function() {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        //Check for server response
        if(xhr.readyState === 4) {
            var tableInfo     = JSON.parse(xhr.responseText);
            var createTable = function() {
                //Pet table
                var petTable = document.createElement('table'); 
                
                var headerRow = document.createElement('tr');
                var pIDHeader = document.createElement('th');
                var pNAMEHeader = document.createElement('th');
                var pCATHeader = document.createElement('th');
                var pTAGHeader = document.createElement('th');
                headerRow.appendChild(pIDHeader);
                headerRow.appendChild(pNAMEHeader);
                headerRow.appendChild(pCATHeader);
                headerRow.appendChild(pTAGHeader);
                pIDHeader.textContent = "ID";
                pNAMEHeader.textContent = "NAME";
                pCATHeader.textContent = "CATEGORY";
                pTAGHeader.textContent = "TAG";

                pIDHeader.classList.add('jsTableRowHead');
                pNAMEHeader.classList.add('jsTableRowHead');
                pCATHeader.classList.add('jsTableRowHead');
                pTAGHeader.classList.add('jsTableRowHead');

                // Add CSS styling
                petTable.classList.add('jsTable');

                //Attach the pet table to DOM
                document.body.appendChild(petTable);

                //Attach the header row to the table
                petTable.appendChild(headerRow);

                //Loop through all the pet data
                for (i = 1; i < tableInfo.length; i++) {

                    var newRow = document.createElement('tr');

                    //Generate column for each pet data
                    var petID = document.createElement('td');                    
                    var petName = document.createElement('td');
                    var petCat = document.createElement('td');
                    var petTag = document.createElement('td');

                    //Append the columns to the new row
                    newRow.appendChild(petID);                    
                    newRow.appendChild(petName);
                    newRow.appendChild(petCat);
                    newRow.appendChild(petTag);

                    //Set the pet info in the columns
                    petID.textContent = tableInfo[i].id === undefined ? "n/a" : tableInfo[i].id;                   
                    petName.textContent = tableInfo[i].name === undefined ? "n/a" : tableInfo[i].name;  
                    petCat.textContent = tableInfo[i].category === undefined ? "n/a" : tableInfo[i].category.id;
                    petTag.textContent = tableInfo[i].tags[0] === undefined ? "n/a" : tableInfo[i].tags[0].id;

                    //Append the new row to the table
                    petTable.appendChild(newRow);
                };
            }();
        };
    };
    xhr.open("GET", "http://petstore.swagger.io/v2/pet/findByStatus?status=available", true);
    xhr.send();
};
var petButton = document.getElementById('petButton');
petButton.addEventListener('click', getPetData);