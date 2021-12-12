let selectMenu = document.getElementById("select-menu");
let select = document.getElementById("slt-color-type");
let selectedItem = document.createElement("div");
selectedItem.setAttribute("class", "selected-item");
selectedItem.innerHTML = select.options[select.selectedIndex].innerHTML;
selectMenu.appendChild(selectedItem);
let option = document.createElement("div");
option.setAttribute("class", "fake-options hidden");
for (j = 1; j < select.length; j++) {
    let selectOption = document.createElement("div");
    selectOption.innerHTML = select.options[j].innerHTML;
    selectOption.addEventListener("click", function() {
        let origSelItem = this.parentNode.previousSibling;
        for (i = 0; i < select.length; i++) {
            if (select.options[i].innerHTML == this.innerHTML) {
            select.selectedIndex = i;
            origSelItem.innerHTML = this.innerHTML;
            let likeSelectItem = this.parentNode.getElementsByClassName("selected-fake-item");
            for (k = 0; k < likeSelectItem.length; k++) {
                likeSelectItem[k].removeAttribute("class");
            }
            this.setAttribute("class", "selected-fake-item");
            break;
            }
        }
        origSelItem.click();
    });
    option.appendChild(selectOption);
}
selectMenu.appendChild(option);
selectedItem.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("hidden");
    this.classList.toggle("select-arrow-active");
});

function closeAllSelect(element) {
    let indexArray = [];
    let options = document.getElementsByClassName("fake-options");
    let selectedItems = document.getElementsByClassName("selected-item");
    for (i = 0; i < selectedItems.length; i++) {
      if (element == selectedItems[i]) {
          indexArray.push(i)
      } else {
          selectedItems[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < options.length; i++) {
      if (indexArray.indexOf(i)) {
          options[i].classList.add("hidden");
      }
    }
}

document.addEventListener("click", closeAllSelect);