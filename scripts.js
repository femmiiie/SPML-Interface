
function optionSelector() {
    let opt = document.getElementById("sheet-type").value;
    switch (opt) {
        case 'wind':
            document.getElementById('grade').hidden = false;
            document.getElementById('').hidden = false;

            break;
        case 'jazz':
            document.getElementById('grade').hidden = false;
            document.getElementById('').hidden = false;

            break;
        case 'misc':
            document.getElementById('grade').hidden = true;
            document.getElementById('').hidden = true;

            break;
    }
}









module.exports = {
    optionSelector
}