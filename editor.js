//welcome window table
const welcomeWindow = document.getElementsByClassName("welcome-window")[0];
const openSavedTableBtn = document.getElementById("open-svd-tbl");
const openNewTableBtn = document.getElementById("new-tbl");
//color table variables
const colorTableWindow = document.getElementsByClassName("content")[0];
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const addColor = document.getElementById("add-color");
//add-color-form variables
const addColorForm = document.getElementsByClassName("add-color-form")[0];


//listens and processes new table button click events
openNewTableBtn.addEventListener("click", () => {
    welcomeWindow.style.display = "none";
    colorTableWindow.openTable();
})

//listens and processes open saved table button click events
openSavedTableBtn.addEventListener("click", () => {
    welcomeWindow.style.display = "none";
    colorTableWindow.openSavedTable();
})

//listens and processes close color table button click events
closeBtn.addEventListener("click", () => {
    if (confirm("Вы уверены? Все несохраненные данные будут удалены.")) {
        welcomeWindow.style.display = "block";
        colorTableWindow.closeTable();
        addColorForm.closeForm();
    }
})

//listens and processes addColor button click events
addColor.addEventListener("click", () => {
    addColorForm.setTitle("Добавление цвета");
    addColorForm.manageColorButtons(true);
    addColorForm.openForm();
})

//listens and processes change row button click events
let changeRow = (index) => {  
    addColorForm.setTitle("Редактирование цвета");
    addColorForm.manageColorButtons(false);
    addColorForm.openForm();
    addColorForm.setData(index);
    addColorForm.setAttribute("row-index", index);
}

//listens and processes delete row events
let deleteRow = (index) => {
    addColorForm.deleteRow(index);
}



