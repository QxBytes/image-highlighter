/**
 * @author QxBytes
 * LIB (Put as first GS script loaded)
 */
const active = DocumentApp.getActiveDocument();
const cacheTxt = new Map();
const cacheTxtObj = new Map();
function readDocument(url) {
  return DocumentApp.openByUrl(url);
}
/**
 * Warning! Very slow! 
 * @param doc the document to get the text object of, or the active document if none available
 * @returns the rich text object of the doc
 */
function textObject(doc) {
  if (!doc) {
    doc = active;
  }
  if (cacheTxtObj.has(doc.getId())) {
    return cacheTxtObj.get(doc.getId());
  }
  cacheTxtObj.set(doc.getId(), doc.getBody().editAsText());
  return cacheTxtObj.get(doc.getId());
}
/**
 * Warning! Very slow!
 * @param doc the document to get text content of, or active document if none available
 * @returns text string of doc
 */
function text(doc) {
  if (!doc) {
    doc = active;
  }
  if (cacheTxt.has(doc.getId())) {
    return cacheTxt.get(doc.getId());
  }
  cacheTxt.set(doc.getId(), textObject(doc).getText());
  return cacheTxt.get(doc.getId());
}
function clearCache() {
  cacheTxt.clear();
  cacheTxtObj.clear();
}
/**
 * @param offset character position in txt string
 * @param txt the string containing everything
 * @returns [start, endOffsetInclusive]
 */
function getLineBounds(offset, txt) {
  let end = offset;
  while (end < txt.length && txt.charAt(end) !== '\n') {
    end++;
  }
  end -= 1; //get us back in bounds
  let start = offset;
  while (start >= 0 && txt.charAt(start) !== '\n') {
    start--;
  }
  start++; //get us back in bounds
  return [start, end]; //start endOffsetInclusive
}
/**
 * @param offset character position in txt string
 * @param txt string containing everything
 * @returns string with the contents of the line the character at that index is on
 */
function getLine(offset, txt) {
  let [start, end] = getLineBounds(offset, txt);
  return txt.substring(start, end+1);
}
/**
 * Expensive/slow call
 * @param offset character position in txt string
 * @param txt string containing everything
 * @returns rich text object with contents of line the character at that index is on
 */
//returns the rich text of the line of the offset
function getRichLine(offset, txt) {
  let [start, end] = getLineBounds(offset, txt);
  console.log(`From ${start} to ${end}`);
  return copy(start, end);
}
/**
 * Expensive/slow call
 * @param startOffset
 * @param endOffsetInclusive
 * @returns rich text object from the start to end offset (inclusive)
 */
//returns rich text copy segment
function copy(startOffset, endOffsetInclusive) {
  let copy = textObject().copy();
  startOffset -= 1; //So we delete only stuff not in selection
  if (startOffset >= 0) {
    copy.deleteText(0, startOffset);
  }
  console.log(copy.getText());
  let end = copy.getText().length - 1;
  let start = endOffsetInclusive - startOffset + 1;
  if (start > end) {
    return copy;
  }
  copy.deleteText(start, end); //pesky inclusive end
  return copy;
}

/**
 * Relatively Fast
 * @param predicate params: (char, index, line_number, index_in_line, textObject)
 * @param doc document object
 */
function forEachChar(predicate, doc) {
  let line_index = 0;
  let line_number = 0;
  let len = text(doc).length;
  let txt = text(doc);
  let txtObj = textObject(doc);
  for (let i = 0 ; i < len ; i++) {
    if (txt.charAt(i) === '\n') {
      line_index = 0;
      line_number++;
    }
    //char, index, full text object
    predicate(txt.charAt(i), i, line_number, line_index, txtObj);
    line_index++;
  }
}
/**
 * Fast
 * @param doc document to get lines from
 * @returns an array of all plain text lines in the document
 */
function getAllLines(doc) {
  let lines = [];
  let prev = -1;
  forEachChar( (char, index, line_num, line_index) => {
    if (prev !== line_num) {
      lines.push("");
      prev = line_num;
      if (char === '\n') return;
    }
    lines[line_num] += char;
  } , doc);
  return lines;
}
/**
 * @param title
 * @param message
 * @returns the user input as a string, otherwise, returns nothing (undefined)
 * Consider checking with if (!res) return;
 */
function getInput(title, msg) {
  let ui = DocumentApp.getUi();
  let response = ui.prompt(title, msg, ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
    return response.getResponseText();
  } else {
    return;
  }
}
