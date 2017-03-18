var nonTextSelected = 0
var TRANSLATE_URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170305T053617Z.246e0c7605e30fc1.f58783d349226ddb655927e2d4881a67a1e17e68"
var LANG_CODE = ["de" /* French */, "ar" /* Arabic */, "fr" /* French */, "hi" /* Hindi */, "es" /* Spanish */, "zh" /* Chinese */]

function getTranslateUrl(text, lang) {
  return TRANSLATE_URL + "&text=" + encodeURI(text) + "&lang=" + lang
}

function translateDe(context) {
  langCode = "de"
  translate(context, langCode)
}

function translateZh(context) {
  langCode = "zh"
  translate(context, langCode)
}

function translateFr(context) {
  langCode = "fr"
  translate(context, langCode)
}

function translateHi(context) {
  langCode = "hi"
  translate(context, langCode)
}

function translateAr(context) {
  langCode = "ar"
  translate(context, langCode)
}

function translatePs(context) {
  langCode = "ps"
  translate(context, langCode)
}

function translateEs(context) {
  langCode = "es"
  translate(context, langCode)
}


function translate(context,langCode) {
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
  
  if (langCode == "ps") {
    pseudoLocalizeList(srcList, selection, numOfLayers)
  } else {
    translateList(srcList, selection, numOfLayers, 0)
  }

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

function pseudoLocalize(string) {
  var chars = "介引户הаí先ร简аน取정úσιмÜП介мのαşแةбй계ذะяřт紹소иЗ介นşрωtبčنごдčש帳าаůсחое簡üγกвцΕ戶н客иез개介引户הаí先ร简аน取정úσιмÜП介мのαşแةбй계ذะяřт紹소иЗ介นşрωtبčنごдčש帳าаůсחое簡üγกвцΕ戶н客иез개介引户הаí先ร简аน取정úσιмÜП介мのαşแةбй계ذะяřт紹소иЗ介นşрωtبčنごдčש帳าаůсחое簡üγกвцΕ戶н客иез개" 

  var length = string.length();
  if (length > 100) {
    length = length * 0.3;
  } else if (length > 12) {
    length = length * 0.4;
  } else if (length > 5) {
      length = length * 0.5;
  } else if (length > 0) {
    length = length * 1.2;
  }
  if (length != 0) {
    var translation = "[" + string + "]" + chars.slice(0, length) + "]"
  }
  return translation;
}

function pseudoLocalizeList(srcList, selection, numOfLayers) {
  var item
  for (item = 0; item < numOfLayers; item++) {
    var layer = selection[item]
    var layerClass = layer.class()
    if (layerClass == MSTextLayer) {
      var text = pseudoLocalize(srcList[item])
      layer.stringValue = "" + text
      log(text)
    }
  }
}
