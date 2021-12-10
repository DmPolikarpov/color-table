const tableTemplate = document.createElement("template");
tableTemplate.innerHTML = `
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
        .content {
            display: none;
            width: 50vw;
            height: 28vw;
            grid-column: 1;
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
        
        .sys-btn {
            display: flex;
            justify-content: space-around;
            width: 15%;
            color: #777777;
            font-size: 1.4vw;
        }
        
        .sys-btn p:hover {
            cursor: pointer;
            color: #4aa4c1;
        }
        
        .color-table {
            background-color: #424242;
            width: 100%;
            height: 18vw;
        }
        
        .color-table-header {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 0.7vw;
            color: #fff;
        }
        
        .table-row {
            width: 100%;
            display: grid;
            grid-template-columns: 15% 15% 15% auto 15% 15%;
            align-items: center;
            text-align: center;
        }
        
        .table-row:hover {
            background-color: #545454;
            background-image: linear-gradient(#545454, #333333);
        }
        
        #table-content {
            width: 100%;
            height: 80%;
            overflow-y: scroll;
        }
        
        #table-content::-webkit-scrollbar {
            width: 0.5vw;
        }
        
        #table-content::-webkit-scrollbar-track {
            box-shadow: inset 0 0 4px grey; 
            border-radius: 0.25vw;
        }
        
        #table-content::-webkit-scrollbar-thumb {
            background: rgb(106, 112, 73); 
            border-radius: 0.25vw;
        }
        
        #table-content::-webkit-scrollbar-thumb:hover {
            background: #c94c4c;
        }
        
        .table-entity {
            height: 3vw;
            color: #9f9f9f;
        }
        
        .selected {
            opacity: 0.5;
        }
        
        .color-row {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .color-row-content {
            width: 2vw;
            height: 2vw;
        }
        
        .change-row:hover {
            color: #4fb0ce;
            cursor: pointer;
        }
        
        .delete-row:hover {
            color: #c94c4c;
            cursor: pointer;
        }
        
        .editor-table-footer {
            width: 100%;
            height: 5vw;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        #add-color {
            width: 30%;
        }
    </style>
    <div>
        <!-- title with close and save buttons -->
        <div class='header'>
            <h1>Таблица цветов</h1>
            <div class="sys-btn">
                <p id="open-btn">&#10054;</p>
                <p id="save-btn" class="fa">&#xf0c7;</p>
                <p id="close-btn">&times;</p>
            </div>
        </div>
        <!-- table body -->
        <div class="color-table">
            <div class="color-table-header table-row">
                <h1>Цвет</h1>
                <h1>Название</h1>
                <h1>Тип</h1>
                <h1>Код</h1>
                <h1>Изменить</h1>
                <h1>Удалить</h1>
            </div>
            <div id="table-content"></div>
        </div>
        <!-- footer -->
        <div class="editor-table-footer">
            <button id="add-color" class="btn-style">Добавить цвет</button>
        </div>
    </div>
`

class ColorTable extends HTMLElement {

    constructor() {
        super();

        this.appendChild(tableTemplate.content.cloneNode(true));
        this.tableContent = this.querySelector("#table-content");
    }

    //takes cursor and moved element positions and returns next row
    defineNextRow(cursor, element) {
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

    connectedCallback() {
        //listens start draggind events
        this.tableContent.addEventListener("dragstart", (event) => {
            event.target.classList.add("selected");
        });
        //listens end dragging events
        this.tableContent.addEventListener("dragend", (event) => {
            event.target.classList.remove("selected");
        });
        //listens and processes dragging and dropping events
        this.tableContent.addEventListener("dragover", (event) => {
            event.preventDefault();  
            let selectedRow = this.tableContent.querySelector(".selected");
            const belowRow = event.target;      
            const isMoveable = selectedRow !== belowRow &&
            belowRow.classList.contains("table-entity");   
            if (!isMoveable) {
                return;
            }  
            let nextRow = this.defineNextRow(event.clientY, belowRow);   
            if (
                nextRow && 
            selectedRow === nextRow.previousElementSibling ||
            selectedRow === nextRow
            ) {
            return;
            }         
            this.tableContent.insertBefore(selectedRow, nextRow);
        });
    }
}

window.customElements.define("color-table-component", ColorTable);