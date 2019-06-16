function doPost(e) {

  var properties = PropertiesService.getScriptProperties().getProperties();
  var webhook = properties.SLACK_WEBHOOK_URL;

  var jsonString = e.postData.getDataAsString();
  var data = JSON.parse(jsonString)

  /// 文字列に含まれる空白文字を削除
  data.text = data.text.replace(/\s+/g, "");

  var options = {
    "method": "POST",
    "payload": JSON.stringify(data)
  }

  var response = UrlFetchApp.fetch(webhook, options);

  return response.getContentText("UTF-8");
}
