
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
                            '<div class="delete-row font-style" onclick="deleteRow(' + this.rowId + ')"><span>&#128465;</span></div>'  
    }


    connectedCallback() {
        if (!this.rendered) {
          this.render();
          this.rendered = true;
        }
    }
}

customElements.define("table-row-content", TableRow);