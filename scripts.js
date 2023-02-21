

//Streamlines hiding and showing the input and its label
function setHiddenWL(id) {
    document.getElementById(id).setAttribute("hidden", "hidden");
    document.getElementById(id + 'L').setAttribute("hidden", "hidden");
}

function removeHiddenWL(id) {
    document.getElementById(id).removeAttribute("hidden");
    document.getElementById(id + 'L').removeAttribute("hidden");
}

//Changes form display based on the value of sheettype select
function optionSelector() {
    let opt = document.getElementById("sheettype").value;
    console.log(opt);

    switch (opt) {
        case 'wind':
            removeHiddenWL('grade');
            setHiddenWL('type');
            setHiddenWL('instrument');
            setHiddenWL('amount');
            removeHiddenWL('score');
            removeHiddenWL('missing');
            break;

        case 'jazz':
            setHiddenWL('grade');
            setHiddenWL('type');
            setHiddenWL('instrument');
            setHiddenWL('amount');
            removeHiddenWL('score');
            removeHiddenWL('missing');
            break;

        case 'misc':
            setHiddenWL('grade');
            removeHiddenWL('type');
            removeHiddenWL('instrument');
            removeHiddenWL('amount');
            setHiddenWL('score');
            setHiddenWL('missing');
            break;
    }
}
//Resets options to wind band when pressing reset button
function formReset() {
    removeHiddenWL('grade');
    setHiddenWL('type');
    setHiddenWL('instrument');
    setHiddenWL('amount');
    removeHiddenWL('score');
    removeHiddenWL('missing');
    document.getElementById("extra").setAttribute("hidden", "hidden");
}

function divOpen() {
    let panel = document.getElementById("extra");
    if (panel.hidden === true) {
        panel.removeAttribute("hidden");
    } else {
        panel.setAttribute("hidden", "hidden");
    }
}

//Event Listeners
document.getElementById("sheettype").addEventListener("change", optionSelector);
document.getElementById("searchform").addEventListener("reset", formReset);
document.getElementById("drop").addEventListener("click", divOpen);
