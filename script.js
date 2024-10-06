const dropArea = document.getElementById('drop-area');
const imageElement = document.getElementById('pasted-image');
const downloadLink = document.getElementById('download-link');
const progress = document.getElementById('progress');
const undoButton = document.getElementById('undo-button');
let imageUrl = null; // To store image URL for undo functionality

// Handle drag and drop events
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('drag-over');
    const file = event.dataTransfer.files[0];
    handleImageFile(file);
});

// Handle paste events
document.addEventListener('paste', (event) => {
    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            handleImageFile(blob);
        }
    }
});

// Handle image file
function handleImageFile(file) {
    const imgURL = URL.createObjectURL(file);
    imageUrl = imgURL; // Store for undo
    imageElement.src = imgURL;
    imageElement.style.display = 'block';

    progress.style.display = 'block';

    // Simulate image processing delay
    setTimeout(() => {
        progress.style.display = 'none';
        downloadLink.href = imgURL;
        downloadLink.style.display = 'inline-block';
        downloadLink.textContent = "Download Image";
        undoButton.style.display = 'inline-block';
    }, 1000);
}

// Clear the image after download
downloadLink.addEventListener('click', () => {
    setTimeout(() => {
        resetCanvas();
    }, 500); // Delay to allow download action
});

// Undo the last image action
undoButton.addEventListener('click', () => {
    resetCanvas();
});

// Reset the canvas
function resetCanvas() {
    imageElement.src = '';
    imageElement.style.display = 'none';
    downloadLink.style.display = 'none';
    undoButton.style.display = 'none';
    imageUrl = null; // Clear the stored URL
}
