function doPost(e) {

  var properties = PropertiesService.getScriptProperties().getProperties();
  var webhook = properties.SLACK_WEBHOOK_URL;

  var jsonString = e.postData.getDataAsString();
  var data = JSON.parse(jsonString)

  var text = data.text

  // 空白文字で分割
  // 半角英数字記号のみの場合は前後にスペースを挿入する
  text = text.split(/\s+/).map(s => {
    if (s.match(/^[!-~]+$/))
        return " " + s + " ";
    else
        return s;
  })

  // 連結して余分なスペースを削除する
  text = text.join("")
  text = text.replace(/\s+/g, " ")
  text = text.trim()

  data.text = text

  var options = {
    "method": "POST",
    "payload": JSON.stringify(data)
  }

  var response = UrlFetchApp.fetch(webhook, options);

  return response.getContentText("UTF-8");
}
