function onOpen(){ 
  DocumentApp.getUi().createMenu("Image Highlighter")
    .addItem("Color image", "colorImagePrompt")
    .addToUi(); 
}
