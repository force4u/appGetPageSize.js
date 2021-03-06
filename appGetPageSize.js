//
//appGetPageSize.js
// 20150621 rev04
//
//ダウンロード後文字コードをUTF16に変更してからインストールする
//
/*
Adobe Acrobat 11　用
（下位バージョンでは動作確認していないだけですが）
インストール先は以下の任意のどれか
アプリケーションドメイン
/Applications/Adobe Acrobat XI Pro/Adobe Acrobat Pro.app/Contents/Resources/JavaScripts
ローカルドメイン
/Library/Application Support/Adobe/Acrobat/11.0/JavaScripts
ユーザードメイン
/Users/ユーザー名/Library/Application Support/Adobe/Acrobat/11.0/JavaScripts
*/


function GetPageSizeAlert(){
	//ピクセル情報からミリ情報に変換用の変数　=1/72*25.4
	var px2mm = 0.352778;
	//表示中のページ番号を取得
	var nPage = this.pageNum;
	
	//各サイズをリストで取得
	var MediaBoxSize = this.getPageBox("Media", nPage);
	var BleedBoxSize = this.getPageBox("Bleed", nPage);
	var TrimBoxSize = this.getPageBox("Trim", nPage);
	var CropBoxSize = this.getPageBox("Crop", nPage);
	var ArtBoxSize = this.getPageBox("Art", nPage);
	var BoundingBoxBoxSize = this.getPageBox("BBox", nPage);

//ログ
console.println('Media: ' + MediaBoxSize);
console.println('Bleed: ' + BleedBoxSize);
console.println('Trim: ' + TrimBoxSize);
console.println('Crop: ' + CropBoxSize);
console.println('Art: ' + ArtBoxSize);
console.println('BBox: ' + BoundingBoxBoxSize);
console.println('\n\n');


//リストから幅と高さを計算
	var MediaBoxSizeWidth = MediaBoxSize[2] - MediaBoxSize[0];
	var MediaBoxSizeHeight = MediaBoxSize[1] - MediaBoxSize[3];
	var BleedBoxSizeWidth = BleedBoxSize[2] - BleedBoxSize[0];
	var BleedBoxSizeHeight = BleedBoxSize[1] - BleedBoxSize[3];
	var TrimBoxSizeWidth = TrimBoxSize[2] - TrimBoxSize[0];
	var TrimBoxSizeHeight = TrimBoxSize[1] - TrimBoxSize[3];
	var CropBoxSizeWidth = CropBoxSize[2] - CropBoxSize[0];
	var CropBoxSizeHeight = CropBoxSize[1] - CropBoxSize[3];
	var ArtBoxSizeWidth = ArtBoxSize[2] - ArtBoxSize[0];
	var ArtBoxSizeHeight = ArtBoxSize[1] - ArtBoxSize[3];
	var BoundingBoxWidth = BoundingBoxBoxSize[2] - BoundingBoxBoxSize[0];
	var BoundingBoxHeight = BoundingBoxBoxSize[1] - BoundingBoxBoxSize[3];

//ログ
console.println(MediaBoxSizeWidth + " " + MediaBoxSizeHeight);
console.println(BleedBoxSizeWidth + " " + BleedBoxSizeHeight);
console.println(TrimBoxSizeWidth + " " + TrimBoxSizeHeight);
console.println(CropBoxSizeWidth + " " + CropBoxSizeHeight);
console.println(ArtBoxSizeWidth + " " + ArtBoxSizeHeight);
console.println(BoundingBoxWidth + " " + BoundingBoxHeight);

//ピクセル情報からmmに変換
	MediaSizeWidth = (Math.round(MediaBoxSizeWidth*px2mm*10))/10;
	MediaSizeHeight = (Math.round(MediaBoxSizeHeight*px2mm*10))/10;
	BleedSizeWidth = (Math.round(BleedBoxSizeWidth*px2mm*10))/10;
	BleedSizeHeight = (Math.round(BleedBoxSizeHeight*px2mm*10))/10;
	TrimSizeWidth = (Math.round(TrimBoxSizeWidth*px2mm*10))/10;
	TrimSizeHeight = (Math.round(TrimBoxSizeHeight*px2mm*10))/10;
	CropSizeWidth = (Math.round(CropBoxSizeWidth*px2mm*10))/10;
	CropSizeHeight = (Math.round(CropBoxSizeHeight*px2mm*10))/10;
	ArtSizeWidth = (Math.round(ArtBoxSizeWidth*px2mm*10))/10;
	ArtSizeHeight = (Math.round(ArtBoxSizeHeight*px2mm*10))/10;
	BoundingWidth = (Math.round(BoundingBoxWidth*px2mm*10))/10;
	BoundingHeight = (Math.round(BoundingBoxHeight*px2mm*10))/10;

//サイズ警告用
BleedSizeAlert = (" ");
if(BleedSizeWidth > MediaSizeWidth){
	BleedSizeAlert = ("【情報】塗足しブリードサイズが\n用紙サイズを超えている可能性があります(w-Bleed)\n-------\n");
}
if(BleedSizeHeight > MediaSizeHeight){
	BleedSizeAlert = ("【情報】塗足しブリードサイズが\n用紙サイズを超えている可能性があります(h-Bleed)\n-------\n");
}
//サイズ警告用
ArtSizeAlert = (" ");
if(ArtSizeWidth > CropSizeWidth){
	ArtSizeAlert = ("【情報】表示サイズの外に\nオブジェクトがある可能性があります(w-Art)\n-------\n");
}
if(ArtSizeHeight > CropSizeHeight){
	ArtSizeAlert = ("【情報】表示サイズの外に\nオブジェクトがある可能性があります(h-Art)\n-------\n");
}
//サイズ警告用
TrimSizeAlert = (" ");
if(TrimSizeWidth > BleedSizeWidth){
	TrimSizeAlert = ("【情報】塗足しサイズより\n仕上がりが大きい可能性があります(w-Trim)\n-------\n");
}
if(TrimSizeHeight > BleedSizeHeight){
	TrimSizeAlert = ("【情報】塗足しサイズより\n仕上がりが大きい可能性があります(h-Trim)\n-------\n");
}
//サイズ警告用
MediaZeroAlert = (" ");
if( 0 > MediaBoxSize[0] ){
	MediaZeroAlert = ("-------\n【警告！】メディアサイズに負の値があります(m-Zero)\n");
}

nPage = nPage + 1 ;


//アラートを表示
	app.alert(
	BleedSizeAlert + " " + TrimSizeAlert + " " + ArtSizeAlert + "\n" + 
			"MediaSize\nメディア・サイズ・用紙サイズ\n（PS 記述上の出力メディアの大きさ）:\n Width: " + 
			MediaSizeWidth +  "mm  Height : " + MediaSizeHeight + "mm\n\n" + 
			"BleedSize\nブリード・裁ち落としサイズ\n（塗足しを加えたページの大きさ）:\n  Width: " + 
			BleedSizeWidth +  "mm  Height : " + BleedSizeHeight + "mm\n\n" + 
			"TrimSize\nページ・サイズ・仕上がりサイズ\n（実際の最終仕上りページの大きさ）:\n  Width: " + 
			TrimSizeWidth +  "mm  Height : " + TrimSizeHeight + "mm\n\n" + 
			"CropSize\nトリミング・サイズ・表示サイズ\n（画面に表示可能な大きさ）:\n  Width: " + 
			CropSizeWidth +  "mm  Height : " + CropSizeHeight + "mm\n\n" + 
			"ArtSize\nアート・サイズ\n（Cropトリミングサイズと同一がデフォルト）:\n  Width: " + 
			ArtSizeWidth +  "mm  Height : " + ArtSizeHeight + "mm\n\n" + 
			"BoundingBoxSize（Read-only）\nバウンディングボックス\n（オブジェクトの境界線ボックスサイズ）:\n  Width: " + 
			BoundingWidth +  "mm  Height : " + BoundingHeight + "mm\n\n" + nPage + "ページの情報" +
			"\n\n" + MediaZeroAlert + " ");
}

//メニュー構成
var GetPageSize = 
{
cName: "appGetPageSize",
cParent: "Help",
cExec: "GetPageSizeAlert()",
cEnable: "event.rc = true",
cMarked: "event.rc = false",
cTooltext: "ページサイズを取得してアラートに表示します",
nPos: -1,
cLabel: "ページサイズを表示する"};

//メニュー本体
app.addToolButton(GetPageSize);


//
