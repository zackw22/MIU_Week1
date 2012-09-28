//Project 1 Week 1
//MIU
//Zack Wyatt


//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function () {


    //getElementById Function
    function ge(x) {
    var theElement = document.getElementById(x);
    return theElement;
    }
    
    //Create select field element and populate with options
    function makeCats() {
        var formTag = document.getElementsByTagName("form"), //formTag is an array
            selectLi = ge("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "workouts");
        for (var i = 0, j = workoutType.length; i<j; i++) {
            var makeOption = document.createElement("option");
            var optText = workoutType [i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    //Find value of a selected radio button
    function getSelectedRadio(){
        var radios = document.forms[0].sex;
        for (var i = 0; i<radios.length; i++) {
            if(radios[i].checked){ 
                sexValue = radios[i].value;
            }
        }
    }
    function toggleControls (n) {
        switch(n) {
            case "on":
                ge("workForm").style.display = "none";
                ge("clear").style.display = "inline";
                ge("view").style.display = "none";
                ge("addNew").style.display = "inline";
                break;
            case "off":
                ge("workForm").style.display = "block";
                ge("clear").style.display = "inline";
                ge("view").style.display = "inline";
                ge("addNew").style.display = "none";
                ge("items").style.display = "none";
                break;
            default:
                return false;
            
        }
    }
    
    function storeData(key){
        //If there is no key means is a brand new item and we need a key
        if (!key){
        var id                  = Math.floor(Math.random()*1000001);   
        }else{
            //Set the if to the existing we're editing so that it will save over the data
            //the key is the same key thats been passed along from the editSubmit event handler
            //to the validate function, and then passed herer. into the storeData function
            id = key;
        }
        
        //Gather up all our form field values and store in an object
        //Object properties contain array with the form label and input value.
        getSelectedRadio();
        var item                = {};
            item.date           = ["Date:", ge("date").value ];
            item.name           = ["Name:", ge("name").value];
            item.currentWeight  = ["Current Weight:", ge("currentWeight").value];
            item.sex            = ["Sex:", sexValue];
            item.workoutType    = ["Type of Workout:", ge("workouts").value];
            item.reps           = ["Reps:", ge("reps").value];
            item.comments       = ["Comments:", ge("comments").value];
            //Save data into Local Storage: Use stringify to convert our object to a string
            localStorage.setItem(id, JSON.stringify(item) );
            alert("Workout has been added!");
            
    }
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no workouts stored so default data was added!");
            autoFillData();
        }
        //Write Data from Local Storage to the Browser.
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ge("items").style.display = "block";
        for(var i = 0, len = localStorage.length; i<len; i++) {
            var makeLi = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //Convert the string from local storage value back to an object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeLi.appendChild(makeSubList);
            getImage(obj.workoutType[1], makeSubList);
            for(var n in obj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+ "" +obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete button/link
        }
    }
    // Get the Image for the right category that is being dislpayed
    function getImage (catName, makeSubList) {
        var imageLi = document.createElement ("li");
        makeSubList.appendChild(imageLi);
        var newImg = document.createElement("img");
        var setSource = newImg.setAttribute("src", "images/" + catName + ".png");
        imageLi.appendChild(newImg);
    }
    
    //Auto Populate Local Storage
    function autoFillData() {
        //the actual JSON obj data required for this to work is coming for our json.js file which is loaded from out HTML
        //Store the JSON obj into local storage
        for(var n in json){
            var id = Math.floor(Math.random()*1000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    }
    
    //Make Item Links
    //Create the edit and delete link for each stored item displayed
    
    function makeItemLinks(key, linksLi) {
        //add edit single item link
        var editLink = document.createElement("a");
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Workout";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        //add Link Break
        var breakTag = document.createElement("br");
        linksLi.appendChild(breakTag);
        
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Workout";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }
    function editItem() {
        //Grab the data from our item from Local Storage
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        //Show the form
        toggleControls("off");
        
        //Populate the form fields with the current localStorage values
        ge("date").value = item.date[1];
        ge("name").value = item.name[1];
        ge("currentWeight").value = item.currentWeight[1];
        var radios = document.forms[0].sex;
        for(var i = 0; i<radios.length; i++){
            if(radios.value == "Male" && item.sex[1] == "Male"){
                radios[i].setAttribute("checked", "checked");
            }else if(radios[i].value == "Female" && item.sex[1] == "Female"){
                radios[i].setAttribute("checked", "checked");
            }
        }
        ge("workouts").value = item.workoutType[1];
        ge("reps").value = item.reps[1];
        ge("comments").value = item.comments[1];
        
        //Remove the intitial listener from the input "save contact" button.
        save.removeEventListener("click", storeData);
        //Change Submit Button Value to Edit Button
        ge("submit").value = 'Edit Contact';
        var editSubmit = ge("submit");
        //Save the key value established in this function as a property of the editSubmit event
        //so we can use that value when we save the data we edited.
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
        
        
    }
    function deleteItem() {
        var ask = confirm("Are you sure you want to delete this workout?");
        if (ask) {
            localStorage.removeItem(this.key);
            alert ("Workout was deleted!")
            window.location.reload();
        }else{
            alert("Workout was not deleted.")
        }
    }
    
    function clearLocal() {
        if(localStorage.length === 0) {
            alert("There are no workouts to clear.")
        }else{
            localStorage.clear();
            alert("Workouts have been cleared!");
            window.location.reload();
            return false;
        }
    }
    
    function validate (e){
        //Define the elements we want to check.
        var getWorkoutType = ge("workouts");
        var getSex = ge("sex");
        var getName = ge("name");
        
        //Reset Error Messages
        errMsg.innerHTML = "";
            getWorkoutType.style.border = "1px solid black";
            getSex.style.border = "1px solid back";
            getName.style.border = "1px solid black";
        
        
        //Get Error Messages
        var messageAry = [];
        //Workout validation
        if(getWorkoutType.value === "--Choose a workout--") {
            var workoutError = "Please choose a workout.";
            getWorkoutType.style.border = "1px solid red";
            messageAry.push(workoutError);
        }
        
        //Rep validation
        if(getSex.value === "") {
            var sexError = "Please choose a gender.";
            getSex.style.border = "1px solid red";
            messageAry.push(sexError);
        }
        //Name Validation
        if(getName.value === "") {
            var nameError = "Please enter a name";
            getName.style.border = "1px solid red";
            messageAry.push(nameError);
        }
        //if there were errors, display them on the screen
        if(messageAry.length >= 1) {
           for (var i = 0, j = messageAry.length; i<j; i++) {
            var txt = document.createElement("li");
            txt.innerHTML = messageAry[i];
            errMsg.appendChild(txt);
            } 
            e.preventDefault();
            return false;
        }else{
            //If all good save data. Send the key value
            //Remember this key value was passed through the editSubmit 
            storeData(this.key);
        }
        
    }
    
    //Variable defaults
    var workoutType = ["--Choose a workout--", "arms", "back", "legs", "cardio"],
        sexValue,
        errMsg = ge("errors");
    makeCats();
    
    //Set Link and Submit Click Events
    var displayLink = ge("view");
    displayLink.addEventListener("click", getData);
    var clearLink = ge("clear");
    clearLink.addEventListener("click", clearLocal);
    var save= ge("submit");
    save.addEventListener("click", validate);
    


});

