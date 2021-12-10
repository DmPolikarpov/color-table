const template = document.createElement("template");
template.innerHTML = `
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
            width: 90%;
            height: 90%;
            background-color: transparent;
            border: none;
            color: #9f9f9f;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 1.1vw;
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
            <div class="form-field">
                <select id="slt-color-type" name="colorType">
                    <option value="Main" selected>Main</option>
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

class AddColorForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild(template.content.cloneNode(true));
        this.addColorBtn = this.querySelector("#add-color-form-btn");
        this.changeColorBtn = this.querySelector("#change-color-form-btn");
    }

    getData() {
        let colorName = this.querySelector("#txt-color-name");
        let colorType = this.querySelector("#slt-color-type");
        let colorCode = this.querySelector("#color-picker");
        let data = {
            name: colorName.value,
            type: colorType.value,
            code: colorCode.value,
        }
        return data;
    }

    getColor() {
        let data = this.getData();
        this.dispatchEvent(new CustomEvent('addData', { detail: data }));
    }

    changeColor() {
        let data = this.getData();
        let index = this.getAttribute("row-index");
        this.dispatchEvent(new CustomEvent('changeData', { 
            detail: {
                data : data,
                index : index
            } 
        }));

    }

    connectedCallback() {
        this.addColorBtn.addEventListener("click", () => this.getColor());
        this.changeColorBtn.addEventListener("click", () => this.changeColor());
    }
}

window.customElements.define("add-color-form", AddColorForm);