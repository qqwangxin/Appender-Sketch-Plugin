var TRANSLATE_URL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170305T053617Z.246e0c7605e30fc1.f58783d349226ddb655927e2d4881a67a1e17e68"

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
  var numOfLayers = selection.count();
  if (!numOfLayers) {
    [app displayDialog:"Please select an Artboard Group to translate text" withTitle:"Locally"]
     return
   }

  // always layer number 0 will be the one in edit mode
  var layer = selection[0]

  // get list of text layers
  var textLayersFromSelection = layer.children().slice().filter(layer => layer.class() == "MSTextLayer")


  // check if there are no layers selected
  if (layer.class() != MSArtboardGroup) {
    [app displayDialog:"You must select an Artboard Group to translate text" withTitle:"Locally"]
    return
  }

  // check if the user is editing text layer
  if (layer.class() == MSTextLayer && layer.isEditingText()) {
    [app displayDialog:"I can't append text while you are in edit mode :s" withTitle:"Locally"]
    return
  }

  translateList(textLayersFromSelection, 0)
}

function translateList(textLayersFromSelection, langCodeIndex) {
  for (item = 0; item < textLayersFromSelection.length; item++) {
    layer = textLayersFromSelection[item];
    sourceText = layer.stringValue()
    if (langCode == 'ps') {
      //handle multiline text layers
      var textArray = layer.stringValue().split("\n");
      for (var x = 0; x < textArray.length; x++) {
        textArray[x] = pseudoLocalize(textArray[x])          
      }
      var translation = textArray.join("\n")
      if (translation) {
          layer.stringValue = translation;
          layer.adjustFrameToFit()
      }
    } else {
      var translateUrl = getTranslateUrl(sourceText, langCode)
      var translationJSON = getJSON(translateUrl)
      layer.stringValue = "" + translationJSON.text
    }
  }
}

// Useful function to get json data from url
function getJSON (url) {
    // https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170305T053617Z.246e0c7605e30fc1.f58783d349226ddb655927e2d4881a67a1e17e68&text=settings&lang=de
    var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
    return JSON.parse(NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding));
}

function pseudoLocalize(string) {
  var chars = "介引户הаí 先ร简 аน取정úσι мÜП介мのα şแةбй 계ذะяř т紹소 иЗ介นşрωt بčنごдčש 帳าаůсחо е 簡üγก вцΕ戶н客 иез개介引 户הаí 先ร简аน取정ú σιмÜП 介 мのαşแ ةбй계ذะ яřт紹 소иЗ介นşрω tبčنごд čש帳าаůсחое 簡üγก вцΕ戶 н客иез개 介引户הа í先 ร简аน取정 úσιмÜ П介мのα şแةбй 계ذะяřт紹 소иЗ介น şрω tبčنごд čש帳า аůс ח ое簡üγ กвцΕ戶н客иез 개" 

  var length = string.length;
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
