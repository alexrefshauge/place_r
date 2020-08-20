var palette = document.getElementById("paletteContainer");

function flipPalette() {
    if (palette.style.height > palette.style.width) {
        palette.style.flexDirection = "column";
        console.log("column")
    } else {
        palette.style.flexDirection = "row";
        console.log("row")
    }
}

flipPalette();