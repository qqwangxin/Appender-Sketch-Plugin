var nonTextSelected = 0
var TRANSLATE_URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170305T053617Z.246e0c7605e30fc1.f58783d349226ddb655927e2d4881a67a1e17e68"
var LANG_CODE = ["de" /* French */, "ar" /* Arabic */, "fr" /* French */, "hi" /* Hindi */, "es" /* Spanish */, "zh" /* Chinese */]

function onRun(context) {

  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document
  var document = context.document

  // get selection
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if there are no layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender"]
    return
  }

  // check if the user is editing text layer
  // always layer number 0 will be the one in edit mode
  var layer = selection[0]
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Appender"]
    return
  }

  // call append function
  // doTheThing (selection, numOfLayers, userTextInput)
  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }
  translateList(srcList, selection, numOfLayers)

  // notify if there are any non text layer selected
  if (nonTextSelected) {
    document.hideMessage()  // hide previous message
    document.showMessage("Non-text layer selected, nothing happened to them ^_^")
  }
}

// append previous input to current selection
function appendAgain(context) {

  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document & selection
  var document = context.document
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if some layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender - Append Again"]
    
    return
  }

  // get previous user input
  var previousUserInput = sketch.settingForKey("userTextInput")

  // check if its null
  if (previousUserInput == null) {
    [app displayDialog:"I don't remember that you asked me to append text before :-|" withTitle:"Appender"]
    
    return
  }

  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }

  // append text
  // doTheThing (selection, numOfLayers, previousUserInput)
  // translateList(srcList, selection, numOfLayers)
}

function getTranslateUrl(text, lang) {
  return TRANSLATE_URL + "&text=" + encodeURI(text) + "&lang=" + lang
}

function translateDe(context) {
  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document
  var document = context.document

  // get selection
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if there are no layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender"]
    return
  }

  // check if the user is editing text layer
  // always layer number 0 will be the one in edit mode
  var layer = selection[0]
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Appender"]
    return
  }

  // call append function
  // doTheThing (selection, numOfLayers, userTextInput)
  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }
  
  translateList(srcList, selection, numOfLayers, 0)

  // notify if there are any non text layer selected
  if (nonTextSelected) {
    document.hideMessage()  // hide previous message
    document.showMessage("Non-text layer selected, nothing happened to them ^_^")
  }
}

function translateAr(context) {
  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document
  var document = context.document

  // get selection
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if there are no layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender"]
    return
  }

  // check if the user is editing text layer
  // always layer number 0 will be the one in edit mode
  var layer = selection[0]
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Appender"]
    return
  }

  // call append function
  // doTheThing (selection, numOfLayers, userTextInput)
  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }
  
  translateList(srcList, selection, numOfLayers, 1)

  // notify if there are any non text layer selected
  if (nonTextSelected) {
    document.hideMessage()  // hide previous message
    document.showMessage("Non-text layer selected, nothing happened to them ^_^")
  }
}

function translateFr(context) {
  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document
  var document = context.document

  // get selection
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if there are no layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender"]
    return
  }

  // check if the user is editing text layer
  // always layer number 0 will be the one in edit mode
  var layer = selection[0]
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Appender"]
    return
  }

  // call append function
  // doTheThing (selection, numOfLayers, userTextInput)
  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }
  
  translateList(srcList, selection, numOfLayers, 2)

  // notify if there are any non text layer selected
  if (nonTextSelected) {
    document.hideMessage()  // hide previous message
    document.showMessage("Non-text layer selected, nothing happened to them ^_^")
  }
}

function translateHi(context) {
  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document
  var document = context.document

  // get selection
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if there are no layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender"]
    return
  }

  // check if the user is editing text layer
  // always layer number 0 will be the one in edit mode
  var layer = selection[0]
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Appender"]
    return
  }

  // call append function
  // doTheThing (selection, numOfLayers, userTextInput)
  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }
  
  translateList(srcList, selection, numOfLayers, 3)

  // notify if there are any non text layer selected
  if (nonTextSelected) {
    document.hideMessage()  // hide previous message
    document.showMessage("Non-text layer selected, nothing happened to them ^_^")
  }
}

function translateEs(context) {
  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document
  var document = context.document

  // get selection
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if there are no layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender"]
    return
  }

  // check if the user is editing text layer
  // always layer number 0 will be the one in edit mode
  var layer = selection[0]
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Appender"]
    return
  }

  // call append function
  // doTheThing (selection, numOfLayers, userTextInput)
  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }
  
  translateList(srcList, selection, numOfLayers, 4)

  // notify if there are any non text layer selected
  if (nonTextSelected) {
    document.hideMessage()  // hide previous message
    document.showMessage("Non-text layer selected, nothing happened to them ^_^")
  }
}

function translateZh(context) {
  // "An NSApplication object manages an app’s main event loop in addition to resources used by all of that app’s objects." - Apple
  var app = [NSApplication sharedApplication]

  // get sketch context
  var sketch = context.api()

  // get document
  var document = context.document

  // get selection
  var selection = context.selection

  // number of layers selected
  var numOfLayers = selection.count()

  // check if there are no layers selected
  if (!numOfLayers) {
    [app displayDialog:"Select me some text layers, Please :/" withTitle:"Appender"]
    return
  }

  // check if the user is editing text layer
  // always layer number 0 will be the one in edit mode
  var layer = selection[0]
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Appender"]
    return
  }

  // call append function
  // doTheThing (selection, numOfLayers, userTextInput)
  var srcList = [];
  for (var item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      srcList.push(layer.stringValue())
    }
  }
  
  translateList(srcList, selection, numOfLayers, 5)

  // notify if there are any non text layer selected
  if (nonTextSelected) {
    document.hideMessage()  // hide previous message
    document.showMessage("Non-text layer selected, nothing happened to them ^_^")
  }
}

function translateList(srcList, selection, numOfLayers, langCodeIndex) {
  var item
  for (item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      log(LANG_CODE[langCodeIndex])
      var translateUrl = getTranslateUrl(srcList[item], LANG_CODE[langCodeIndex%6])
      var text = getJSON(translateUrl)
      layer.stringValue = "" + text.text
    }
  }
  langCodeIndex++
}

// Useful function to get json data from url
function getJSON (url) {
    // https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170305T053617Z.246e0c7605e30fc1.f58783d349226ddb655927e2d4881a67a1e17e68&text=settings&lang=de
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
    return JSON.parse(NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding));
}


function generatePlaceHolder(count) {
  var result = ""
  for (var i = 0;i < count; i++) {
    result += "S"
  }
  return result
}

function generateDummyText(text) {
  var length = text.length()
  if (length >=0 && length <= 10) {
    return generatePlaceHolder(length * 3)
  } else if (length >= 11 && length <= 20) {
    return generatePlaceHolder(length * 2)
  } else if (length >= 21 && length <= 30) {
    return generatePlaceHolder(length * 1.8)
  } else if (length >= 31 && length <= 50) {
    return generatePlaceHolder(length * 1.6)
  } else if (length >= 51 && length <= 70) {
    return generatePlaceHolder(length * 1.4)
  }
  return generatePlaceHolder(length * 1.3)
}

// show dialog to get user input
function getUserInput(sketch){

  // create new dialog
  var alert = COSAlertWindow.new()

  // dialog title & description
  alert.setMessageText("Appender")
  // alert.setInformativeText("")

  // create text field and its lable
  alert.addTextLabelWithValue("Text to append:")
  alert.addTextFieldWithValue(sketch.settingForKey("userTextInput"))

  // set it as first responder
  var textField = alert.viewAtIndex(1)
  alert.alert().window().setInitialFirstResponder(textField)

  // action buttons
  alert.addButtonWithTitle('Append') // 1000
  alert.addButtonWithTitle('Cancel') // 1001

  // show dialog
  var buttonPressed =  alert.runModal()

  // get user input
  var userInput = alert.viewAtIndex(1).stringValue()

  // return user input
  return [buttonPressed, userInput]
}
