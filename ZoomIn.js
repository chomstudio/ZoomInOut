var SCRIPT_TITLE = "Zoom In";

function getClientInfo() {
  return {
    "name" : SV.T(SCRIPT_TITLE),
    "author" : "Chomstudio",
    "versionNumber" : 1.0,
    "minEditorVersion" : 65537
  };
}

function getTranslations(langCode) {
  if(langCode == "ja-jp") {
    return [
      ["Zoom In", "拡大"]
    ];
  }
  return [];
}

function main() {
  pb = SV.getPlayback();
  ta = SV.getProject().getTimeAxis();
  cs = SV.getMainEditor().getNavigation();

  //倍率
  zoomLevel = 1.5;

  //現在の表示エリアを取得し、拡大基準位置を決定する
  //マウスホイールの場合「マウス位置」だが、マウス位置は取得できないので
  //今回は画面の中心にする
  viewRange = cs.getTimeViewRange()
  viewBeforeStart = viewRange[0];
  viewBeforeEnd = viewRange[1];
  zoomPoint = (viewBeforeStart + viewBeforeEnd) / 2;

  //ズーム地点から画面左端の距離
  distanceBefore = zoomPoint - viewBeforeStart;

  //拡大を適用
  currentZoom = cs.getTimePxPerUnit();
  cs.setTimeScale(currentZoom * zoomLevel);

  //拡大後の画面のズレを補正
  //「ズーム地点から画面左端の距離」は1/Nになっているはず
  distanceAfter = distanceBefore / zoomLevel;
  newLeft = zoomPoint - distanceAfter;
  if (newLeft < 0) newLeft = 0;
  cs.setTimeLeft(newLeft);

  //おわり
  SV.finish();
}
