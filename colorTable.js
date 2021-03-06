
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
            <h1>?????????????? ????????????</h1>
            <div class="sys-btn">
                <p id="open-btn">&#10054;</p>
                <p id="save-btn" class="fa">&#xf0c7;</p>
                <p id="close-btn">&times;</p>
            </div>
        </div>
        <!-- table body -->
        <div class="color-table">
            <div class="color-table-header table-row">
                <h1>????????</h1>
                <h1>????????????????</h1>
                <h1>??????</h1>
                <h1>??????</h1>
                <h1>????????????????</h1>
                <h1>??????????????</h1>
            </div>
            <div id="table-content"></div>
        </div>
        <!-- footer -->
        <div class="editor-table-footer">
            <button id="add-color" class="btn-style">???????????????? ????????</button>
        </div>
    </div>
`

class ColorTable extends HTMLElement {
    
    content = []; 

    constructor() {
        super();

        this.appendChild(template.content.cloneNode(true));
        this.tableContent = this.querySelector("#table-content");
        this.clsBtn = this.querySelector("#close-btn");
        this.saveBtn = this.querySelector("#save-btn");
        this.openBtn = this.querySelector("#open-btn");
    }
    //opens color table
    openTable() {
        this.tableContent.innerHTML = "";
        this.style.display = "block";
    }
    //retrieves data of color table saved in the local storage
    openData() {
        this.content = [];
        try {
            let data = JSON.parse(localStorage.getItem("colorTable"))
            data.forEach(element => this.content.push(element));
        } catch(err) {
            alert("???? ?????????? ?????????????????????? ?????????????? ???? ????????????????????")
        }
    }
    //opens saved table
    openSavedTable() {
        this.openTable();
        this.openData();
        this.fillTable(this.content);
    }
    //closes color table
    closeTable() {
        this.clearArray();
        this.style.display = "none";
    }
    //fills the table with elements of entityArray
    fillTable(arr) {
        this.content = arr;
        this.tableContent.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            this.tableContent.innerHTML += '<table-row-content class="table-row table-entity" draggable="true" rowId="' + i + '" name="'+arr[i].name+'" type="'+arr[i].type+'" code="'+arr[i].code+'"></table-row-content>';
        }
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

    //saves data from color table to the local storage
    saveData() {
        try {
            localStorage.setItem("colorTable", JSON.stringify(this.content));
            localStorage.getItem("colorTable") ? alert("??????????????-????????... ???????????? ??????????????????!") : alert("????????... ??????-???? ???? ??????... ???????????????? ?????? ??????. ?????????? ??????????????.");
        } catch(err) {
            alert("????????... ??????-???? ???? ??????... ???????????????? ?????? ??????. ?????????? ??????????????.")
        }

    }
    //adds color table with new data
    addTableData(data) {
        this.content.push(data);
        this.fillTable(this.content)
    }
    //returns entity array
    getEntityArray() {
        return this.content;
    }
    //changes element of antity array
    changeArrayElement(index, data) {
        this.content[index].name = data.name;
        this.content[index].type = data.type;
        this.content[index].code = data.code;
        this.fillTable(this.content)
    }
    //removes an element of the array
    deleteRow(index) {
        this.content.splice(index, 1);
        this.fillTable(this.content)
    }
    //clears array
    clearArray() {
        this.content = [];
    }
    connectedCallback() {
        //listens and processes save button click events
        this.saveBtn.addEventListener("click", () => this.saveData());
        this.openBtn.addEventListener("click", () => {
            if (confirm("???? ??????????????? ?????? ?????????????????????????? ???????????? ?????????? ??????????????.")) {
                this.openData();
                this.fillTable(this.content);
            }
        })
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