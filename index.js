const date = new Date();

$(document).ready(function () {
    document.querySelector(".heading h1").innerHTML = date;
});

$(document).ready(function () {
    document.querySelector(".footer h4").innerHTML = "Copyright &copy; " + date.getFullYear();
});

const inputBox = document.querySelector("#input-box");
listContainer = document.querySelector("#list-container");
function addTask() {
    if ("" === inputBox.value) alert("You must write something! ");
    else {
        var e = document.createElement("li");
        e.innerHTML = "<input type='checkbox' class='cut'>" + inputBox.value + "</input>";
        e.setAttribute("id", "");
        listContainer.appendChild(e);
        var t = document.createElement("button");
        t.innerHTML = "Delete";
        e.appendChild(t);
        t.setAttribute("class", "delete");
        var n = document.createElement("button");
        n.innerHTML = "Edit";
        e.appendChild(n);
        n.setAttribute("class", "edit");
    }
    inputBox.value = "";
    saveData();
}
function saveData() {
    localStorage.setItem("dat", listContainer.innerHTML);
}
function displayData() {
    listContainer.innerHTML = localStorage.getItem("dat");
}
listContainer.addEventListener("click", function (e) {
    if ("delete" === e.target.className) {
        e.target.parentElement.remove();
        saveData();
    }
});
listContainer.addEventListener("click", function (e) {
    if ("cut" === e.target.className) {
        if (e.target.parentElement.getAttribute("id") === "") {
            e.target.parentElement.setAttribute("id", "done");
        }
        else {
            e.target.parentElement.setAttribute("id", "");
        }
        saveData();
    }
});
inputBox.addEventListener("keypress", function (e) {
    "Enter" === e.key && (addTask(), saveData())
});

listContainer.addEventListener("click", function (e) {
    if ("edit" === e.target.className) {
        var t = e.target.parentElement.textContent;
        t = t.replace("Delete", "");
        t = t.replace("Edit", "");
        inputBox.value = t;
        inputBox.focus();
        e.target.parentElement.remove();
        saveData();
    }
});


displayData();