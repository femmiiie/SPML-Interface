
function optionSelector() {
    let opt = document.getElementById("sheet-type").value;
    console.log(opt);
    switch (opt) {
        case 'wind':
            document.getElementById('grade').type = "number";
            //document.getElementById('').hidden = false;

            break;
        case 'jazz':
            document.getElementById('grade').type = "hidden";
            //document.getElementById('').hidden = false;

            break;
        case 'misc':
            document.getElementById('grade').type = "hidden";
            //document.getElementById('').hidden = true;

            break;
    }
    document.getElementById('sheet-type').onchange()
}

/*
let tableType = document.getElementById('sheet-type');

tableType.addEventListener('change', (val) => {
    switch (val.target.value) {
        case 'wind':
            document.getElementById('grade').hidden = false;
            break;
        case 'jazz':
            document.getElementById('grade').hidden = false;
            break;
        case 'misc':
            document.getElementById('grade').hidden = true;
            break;  
    }
})
*/





export {
    optionSelector
}