
const formTemplate = document.createElement("template");
formTemplate.innerHTML = `
    <style>
        .zone {
            background-color: #313131;
            border-radius: 1vw;
        }
        
        .font-style {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1vw;
        }
        
        .btn-style {
            height: 2.5vw;
            margin: 0 auto;
            background-color:transparent;
            border: 1px solid #4aa4c1;
            border-radius: 1.25vw;
            color: #fff;
            font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
            font-size: 1vw;
        }
        
        .btn-style:hover {
            cursor: pointer;
            background-color: #53cbf1;
        }

        .add-color-form {
            width: 30vw;
            display: none;
            grid-column: 2;
            grid-row: 1;
            margin: 0 auto;
        }

        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            height: 5vw;
        }
        
        .header h1 {
            width: 75%;
            margin-left: auto;
            text-align: center;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.8vw;
        }

        .form-header {
            width: 100%;
            margin: 0 auto;
        }

        .form-item {
            width: 80%;
            height: 3vw;
            margin: 1vw auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #9f9f9f;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.1vw;
        }

        .form-field {
            width: 60%;
            height: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #5e5e5e;
            background-color: #424242;
            border-radius: 7px;
        }

        .form-field input,
        .form-field select {
            width: 100%;
            height: 100%;
            background-color: transparent;
            border: none;
            color: #9f9f9f;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.1vw;
        }

        #select-menu {
            position: relative;
            font-family: Arial;
            border: 1px solid #5e5e5e;
            background-color: #424242;
            border-radius: 7px;
        }
        
        #select-menu select {
            display: none; 
        }
        
        .fake-options div {
            color: #9f9f9f;
            padding: 8px 16px;
            cursor: pointer;
            user-select: none;
        }

        .selected-item {
            text-align: center;
            width: 100%;
            height: 50%;
            color: #9f9f9f;
            background-color: #424242;
            border-radius: 7px;
            cursor: pointer;
            user-select: none;
        }
        
        .fake-options {
            position: absolute;
            border: 1px solid #5e5e5e;
            border-top: 1px dotted #5e5e5e;
            background-color: #424242;
            border-bottom-right-radius: 7px;
            border-bottom-left-radius: 7px;
            top: 100%;
            left: 0;
            right: 0;
            z-index: 99;
        }
        
        .hidden {
            display: none;
        }
        
        .fake-options div:hover, .selected-fake-item {
            color: rgba(255, 255, 255, 0.6);
            background-color: rgba(255, 255, 255, 0.2);
        }




        #slt-color-type :hover::before {
            color: rgba(255, 255, 255, 0.6);
            background-color: rgba(255, 255, 255, 0.2);
          }

        .form-item button {
            width: 60%;
        }

        #change-color-form-btn {
            display: none;
        }
    </style>
    <div>
        <div class="header">
            <h1 class="form-header">Добавление цвета</h1>
        </div>
        <div class="form-item">
            <label for="txt-color-name">Название цвета</label>
            <div class="form-field">
                <input type="text" id="txt-color-name" placeholder="Введите название" required name="colorName">
            </div>
        </div>
        <div class="form-item">
            <label for="txt-color-name">Выберите тип</label>
            <div id="select-menu" class="form-field">
                <select id="slt-color-type" name="colorType">
                    <option value="Main">Main</option>
                    <option value="Main">Main</option>
                    <option value="Primary">Primary</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Base">Base</option>
                </select>
            </div>
        </div>
        <div class="form-item">
            <label for="color-picker">Выберите цвет</label>
            <div class="form-field">
                <input type="color" id="color-picker" value="#701010">
            </div>
        </div>
        <div class="form-item">
            <button id="add-color-form-btn" class="btn-style">Добавить цвет</button>
            <button id="change-color-form-btn" class="btn-style">Изменить цвет</button>
        </div>
    </div>
`

class ColorForm extends HTMLElement {
    constructor() {
        super();

        this.appendChild(formTemplate.content.cloneNode(true));
        this.addColorBtn = this.querySelector("#add-color-form-btn");
        this.changeColorBtn = this.querySelector("#change-color-form-btn");
        this.formHeader = this.querySelector(".form-header");
        this.colorName = this.querySelector("#txt-color-name");
        this.colorType = this.querySelector("#slt-color-type");
        this.colorCode = this.querySelector("#color-picker");
        this.colorTable = document.querySelector(".color-table-component");
    }
    //opens form window
    openForm() {
        this.clearContent();
        this.style.display = "block";
    }
    //closes form window
    closeForm() {
        this.clearContent();
        this.style.display = "none";
    }
    //retrieves data from the form, stores it in an object, and returns the object
    getData() {
        let data = {
            name: this.colorName.value,
            type: this.colorType.value,
            code: this.colorCode.value,
        }
        return data;
    }
    //takes data from getData(), updates entityArray of parent element and closes color form
    getColor() {
        let data = this.getData();
        const colorTableWindow = document.getElementsByClassName("content")[0];
        colorTableWindow.addTableData(data);
        this.closeForm();
    }
    //sets current data into color form
    setData(index) {
        const colorTableWindow = document.getElementsByClassName("content")[0];
        let arr = colorTableWindow.getEntityArray();
        this.colorName.value = arr[index].name;
        this.colorType.value = arr[index].type;
        this.colorCode.value = arr[index].code;
    }
    //changes an element of entity array and updates color table
    changeColor(index) {
        let data = this.getData();
        const colorTableWindow = document.getElementsByClassName("content")[0];
        colorTableWindow.changeArrayElement(index, data);
        this.closeForm();
    }
    //deletes a table row
    deleteRow(index) {
        const colorTableWindow = document.getElementsByClassName("content")[0];
        colorTableWindow.deleteRow(index);
    }
    //sets a title of color form
    setTitle(title) {
        this.formHeader.textContent = title;
    }
    //manages color buttons. If condition is true addColor button will appear.
    manageColorButtons(condition) {
        if (condition) {
            this.addColorBtn.style.display = "block";
            this.changeColorBtn.style.display = "none";
        } else {
            this.changeColorBtn.style.display = "block"; 
            this.addColorBtn.style.display = "none";
        }
    }
    //manages change color button
    manageAddColorButton(condition) {
        condition ? 
        this.addColorBtn.style.display = "block" : 
        this.addColorBtn.style.display = "none";
    }
    //clears content of the form
    clearContent() {
        this.colorName.value = "";
        this.colorType.value = "Main";
        this.colorCode.value = "#701010";
    }

    connectedCallback() {
        this.addColorBtn.addEventListener("click", () => this.getColor());
        this.changeColorBtn.addEventListener("click", () => {
            let index = this.getAttribute("row-index");
            this.changeColor(index);
        });
       
    }
}

window.customElements.define("add-color-form", ColorForm);