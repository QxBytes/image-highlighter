function onOpen(){ 
  DocumentApp.getUi().createMenu("Custom")
    .addItem("Color image", "colorImagePrompt")
    .addToUi(); 
}
