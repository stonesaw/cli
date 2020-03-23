var terminal = null;
var value = "";
var operater = "> "
const COMMAND = ["print", "cd"]
const PAGES = ["AboutMe", "Develop", "GPS"]

function setTerminal(){
	// ブラウザのウインドウサイズを取得
	let innerWidth =  window.innerWidth;
	let innerHeight = window.innerHeight;
	
	// textareaのサイズをウインドウにフィットさせる
	terminal.style.innerWidth  = innerWidth + "px";
	terminal.style.innerHeight = innerHeight + "px";
}

window.addEventListener("load", function(){
	terminal = document.getElementById("terminal");

	// ターミナルのサイズをブラウザ画面いっぱいに設定
    setTerminal();
    
    terminal_clear();

	// ターミナル（textareaタグ）にフォーカス ==>カーソルが点滅する
	terminal.focus();
});

window.addEventListener("keyup", function(e){
	// キー番号を取得
	let key = e.keyCode;
	
	// Enterキーが押されたとき
	if(key == 13){
		value = terminal.value.replace(/>\s/g,"");	// textareaの文字列を取得
	
		if(value.match(/\n$/) == null){	// 漢字変換でEnterキーを押した場合
			return;										// 取得した文字の最後が改行文字ではないので何もしない
		}
        // 新しいプロンプトを追加表示
        value = value.replace(/\r?\n/g,"");
        if (value != "") {
            command_check(value);
        }
		terminal.value = "" + operater;
        console.log("[" + value + "]");
        
		// フォーカスを常にtextareaにしておく
		terminal.focus();
	}
});

function terminal_clear() {
    terminal.value = operater;
};

function command_check(str){
    ary = str.split(" ")
    if (str == "print" || str == "print -h") {
        return document.getElementById("title").innerHTML = `print Command => print text`
    } else if (str == "cd" || str == "cd -h") {
        return document.getElementById("title").innerHTML = `cd Command => cd page`
    } else if (COMMAND.includes(ary[0])) {
        if ((/^print/).test(str)) {
            if (ary.length != 2) {
                document.getElementById("title").innerHTML = `Syntax Error`
            } else if ((ary[1].length < 1)) {
                document.getElementById("title").innerHTML = `no value`
            } else {
                document.getElementById("title").innerHTML = `${ary[1]}`
            }
        } else if ((/^cd/).test(str)) {
            if (ary.length != 2) {
                document.getElementById("title").innerHTML = `Syntax Error`
            } else if ((ary[1].length < 1)) {
                document.getElementById("title").innerHTML = `no value`
            } else {
                if (page_check(ary[1]) == true) {
                    document.getElementById("title").innerHTML = `go to ${ary[1]}`
                    window.location.href = ("./"+ary[1]+".html")
                } else {
                    document.getElementById("title").innerHTML = `${ary[1]} is Not found!`
                }
            }
        }
    } else {
        document.getElementById("title").innerHTML = `What's Command ${ary[0]}?`
    }
};

function page_check(page) {
    if (PAGES.includes(page)) {
        return true;
    } else {
        return false;
    }
};

