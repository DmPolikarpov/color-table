//welcome window table
const welcomeWindow = document.getElementsByClassName("welcome-window")[0];
const openSavedTableBtn = document.getElementById("open-svd-tbl");
const openNewTableBtn = document.getElementById("new-tbl");
//color table variables
const colorTableWindow = document.getElementsByClassName("content")[0];
const saveBtn = document.getElementById("save-btn");
const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const addColor = document.getElementById("add-color");
let tableContent = document.getElementById("table-content");
let changeRowButtons = document.getElementsByClassName("change-row");
//add-color-form variables
const addColorForm = document.getElementsByClassName("add-color-form")[0];
let formHeader = document.getElementsByClassName("form-header")[0];
let colorName = document.getElementById("txt-color-name");
let colorType = document.getElementById("slt-color-type");
let colorCode = document.getElementById("color-picker");
const addColorFormButton = document.getElementById("add-color-form-btn");
const changeColorFormButton = document.getElementById("change-color-form-btn");
//an array to store data from color table
let entityArray = [];
//creates an object for a particular table row and adds it to entityArray
let setTableRow = (name, type, code) => {
    entity = {
        name: name,
        type: type,
        code: code
    }
    entityArray.push(entity);
}
//creates a custom class that extends HTMLElement class and creates a new tag with content
class TableRow extends HTMLElement {
    rowId = 0;
    name = "";
    type = "";
    code = "";

    constructor () {
        super();
    }

    render() {
        this.rowId = this.getAttribute("rowId");
        this.name = this.getAttribute("name");
        this.type = this.getAttribute("type");
        this.code = this.getAttribute("code");
        this.innerHTML =
                            '<div class="color-row">'+
                                '<div class="color-row-content" style="background-color:' + this.code + '"></div>'+
                            '</div>'+
                            '<div class="name-row font-style">' + this.name + '</div>'+
                            '<div class="type-row font-style">' + this.type + '</div>'+
                            '<div class="code-row font-style">' + this.code + '</div>'+
                            '<div class="change-row font-style" onclick="changeRow(' + this.rowId + ')">&#9998;</div>'+
                            '<div class="delete-row font-style fa" onclick="deleteRow(' + this.rowId + ')"><span>&#xf014;</span></div>'  
    }

    connectedCallback() {
        if (!this.rendered) {
          this.render();
          this.rendered = true;
        }
    }
}

customElements.define("table-row-content", TableRow);

//fills the table with elements of entityArray
let fillTable = () => {
    tableContent.innerHTML = "";
    for (let i = 0; i < entityArray.length; i++) {
        tableContent.innerHTML += '<table-row-content class="table-row table-entity" draggable="true" rowId="' + i + '" name="'+entityArray[i].name+'" type="'+entityArray[i].type+'" code="'+entityArray[i].code+'"></table-row-content>';
    }
}
//resets values of form fields
const resetValues = () => {
    colorName.value = "";
    colorCode.value = "#701010";
}

//listens and processes addColor button click events
addColor.addEventListener("click", () => {
    formHeader.textContent = "Редактирование цвета";
    addColorForm.style.display = "block";
})

//listens and processes change row events
let changeRow = (index) => {  
    formHeader.textContent = "Редактирование цвета";
    addColorFormButton.style.display = "none";
    addColorForm.style.display = "block";
    changeColorFormButton.style.display = "block";
    colorName.value = entityArray[index].name;
    colorType.value = entityArray[index].type;
    colorCode.value = entityArray[index].code;
    changeColorFormButton.addEventListener("click", () => {
        entityArray[index].name = colorName.value;
        entityArray[index].type = colorType.value;
        entityArray[index].code = colorCode.value;
        fillTable();
        changeColorFormButton.style.display = "none";
        addColorForm.style.display = "none";
        addColorFormButton.style.display = "block";
        resetValues();
    })
}

//listens and processes delete row events
let deleteRow = (index) => {
    entityArray.splice(index, 1);
    fillTable();
}

//listens and processes addColor button in the form click events
addColorFormButton.addEventListener("click", () => {
        setTableRow(colorName.value, colorType.value, colorCode.value);
        fillTable();
        addColorForm.style.display = "none";
        resetValues();
})

//retrieves data of color table saved in the local storage
let openData = () => {
    entityArray = [];
    try {
        let data = JSON.parse(localStorage.getItem("colorTable"))
        data.forEach(element => entityArray.push(element));
    } catch(err) {
        alert("Ни одной сохраненной таблицы не обнаружено")
    }
}

openBtn.addEventListener("click", () => {
    if (confirm("Вы уверены? Все несохраненные данные будут удалены.")) {
        openData();
        fillTable();
    }
})

//saves data from color table to the local storage
let saveData = () => {
    try {
        localStorage.setItem("colorTable", JSON.stringify(entityArray));
        localStorage.getItem("colorTable") ? alert("Наконец-таки... Данные сохранены!") : alert("Упсс... Что-то не так... Попробуй еще раз. Может повезет.");
    } catch(err) {
        alert("Упсс... Что-то не так... Попробуй еще раз. Может повезет.")
    }

}
//listens and processes save button click events
saveBtn.addEventListener("click", () => {
    saveData();
})

//closes the window
closeBtn.addEventListener("click", () => {
    if (confirm("Вы уверены? Все несохраненные данные будут удалены.")) {
        welcomeWindow.style.display = "block";
        colorTableWindow.style.display = "none";
        addColorForm.style.display = "none";
    }
})

//opens new color table 
let openNewTable = () => {
    welcomeWindow.style.display = "none";
    colorTableWindow.style.display = "block";
    entityArray = [];
    fillTable();
}
//listens and processes new table button click events
openNewTableBtn.addEventListener("click", () => {
    openNewTable();
})

//opens latest saved table
let openSavedTable = () => {
    welcomeWindow.style.display = "none";
    colorTableWindow.style.display = "block";
    openData();
    fillTable();
}
//listens and processes open saved table button click events
openSavedTableBtn.addEventListener("click", () => {
    openSavedTable();
})
//listens start draggind events
tableContent.addEventListener("dragstart", (event) => {
    event.target.classList.add("selected");
});
//listens end dragging events
tableContent.addEventListener("dragend", (event) => {
    event.target.classList.remove("selected");
});
//takes cursor and moved element positions and returns next row
const defineNextRow = (cursor, element) => {
    let elementPosition = element.getBoundingClientRect();
    let elementCenter = elementPosition.y + elementPosition.height / 2;   
    let nextRow;
    if (cursor < elementCenter) {
        nextRow = element;
    } else {
        nextRow = element.nextElementSibling;
    }   
    return nextRow;
};
//listens and processes dragging and dropping events
tableContent.addEventListener("dragover", (event) => {
    event.preventDefault();  
    let selectedRow = tableContent.querySelector(".selected");
    const belowRow = event.target;      
    const isMoveable = selectedRow !== belowRow &&
    belowRow.classList.contains("table-entity");   
    if (!isMoveable) {
        return;
    }  
    let nextRow = defineNextRow(event.clientY, belowRow);   
    if (
        nextRow && 
      selectedRow === nextRow.previousElementSibling ||
      selectedRow === nextRow
    ) {
      return;
    }         
    tableContent.insertBefore(selectedRow, nextRow);
});