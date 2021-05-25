const doc = DocumentApp.getActiveDocument();
let src;
let ratio;

function colorImagePrompt() {
  let ui = DocumentApp.getUi();
  try {
    let chars = getInput('Settings', 'Characters per line? Usually 70.');
    if (!chars) return;
    chars = parseInt(chars);

    ratio = getInput('Settings', 'Height:Width of character ratio? Usually 1.35');
    if (!ratio) return;
    ratio = parseFloat(ratio);

    let url = getInput('Settings', 'URL of src?');
    if (!url) return;
    src = readDocument(url);
    
    colorImage(chars);
  } catch (error) {
    ui.alert("Invalid input: " + error.message);
  }
}
//142 if .1 margins and 7 pt font. Roboto Mono Font
function colorImage(width=70) {
  let data = getAllLines(src)[0].split(" ");
  console.log("All lines received");
  let visible = 0;
  let line = 0;
  let txt = text();
  forEachChar( (char, index, line_num, line_index, txtObj) => {
    if (char === '\n') {
      line++;
      visible = 1;
      return;
    }
    if ((char === ' ' && willWrap(index, txt, visible, width))) {
      line++;
      visible = 0;
      return;
    }
    if (visible % width === 0 && line_index !== 0) {
      line++;
      visible = 0;
    }
    let select = Math.floor(line * ratio) * width + visible;
    if (select < data.length && data[select] !== "" && data[select] !== undefined) {
      txtObj.setForegroundColor(index, index, data[select]);
    }
    visible++;
  }, doc);
}
function willWrap(offset, txt, line_index, width) {
  let next = txt.indexOf(' ', offset + 1);
  if (next === -1) next = txt.length;
  let word = txt.substring(offset, next);
  if (word.length + line_index > width) {
    return true;
  }
  return false;
}



function test() {
  console.log(getAllLines(src).length);
}
