var terminal = null;
var value = "";
var operater = "> ";
var options = "";
const PAGES = ["Top", "AboutMe", "Develop", "GPS"];
var variable = {};

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
	if (key == 13) {
		value = terminal.value.replace(/>\s/g,"");	// textareaの文字列を取得
	
		if (value.match(/\n$/) == null) {	// 漢字変換でEnterキーを押した場合
			return;										// 取得した文字の最後が改行文字ではないので何もしない
		}
        // 新しいプロンプトを追加表示
        value = value.replace(/\r?\n/g,"");
        // 何か入力されたら
        if (value != "") {
            msg_draw("");
            command_check(value);
        }
        terminal.value = operater + options;
        terminal_draw(value);
        options = "";
        
		// フォーカスを常にtextareaにしておく
		terminal.focus();
	} else if (key == 27) {
        terminal_clear();
    };
});

function terminal_draw(str) {
    console.log("[" + str + "]");
}

function terminal_clear() {
    terminal.value = operater;
}

function title_draw(str) {
    document.getElementById("title").innerHTML = str;
}

function msg_draw(str) {
    document.getElementById("msg").innerHTML = str;
};

function page_check(page) {
    if (PAGES.includes(page)) {
        return true;
    } else {
        return false;
    }
}

function command_check(str) {
    ary = str.split(" ");
    if (ary[0] == "print") {
        com_check_print(str);
    } else if (ary[0] == "cd") {
        com_check_cd(str);
    } else if (str == "cls") {
        com_check_cls(str);
    } else if (ary[0] == "var") {
        com_check_var(str);
    } else if (str == "list") {
        com_check_list();
    } else {
        msg_draw(`What's '${str.split(" ")[0]}'?<br>Is it delicious?`);
    }
}

function com_check_print(str) {
    ary = str.split(" ");
    if (str == "print" || str == "print " || str == "print -h") {
        msg_draw(` ! Print Command<br>print 'text'`);
    } else {
        var text = `${ary[1]}`;
        for (let i = 2; ary.length > i; i++) {
            text = text + " " + ary[i];
        }
        if ((/^[0-9]*$/).test(text)) {
            title_draw(`${text}`) || "null";
        } else if ((/^'(.*?)'$/).test(text)) {
            const matches = ((/'(.*?)'/).exec(text)[1]) || "null";
            title_draw(`${matches}`);
        } else if ((/^"(.*?)"$/).test(text)) {
            const matches = ((/"(.*?)"/).exec(text)[1]) || "null";
            title_draw(`${matches}`);
        } else {
            if (variable[text]) {
                title_draw(`${variable[text]}`) || "null";
            } else {
                msg_draw(`undefined ${text}!`);
            }
        }
    }
}

function com_check_cd(str) {
    ary = str.split(" ");
    if (str == "cd" || str == "cd " || str == "cd -h") {
        msg_draw(` ! CD Command<br>cd 'page'`);
    } else if (ary.length != 2) {
        msg_draw(`Syntax Error`);
    } else {
        if (page_check(ary[1]) == true) {
            title_draw(`go to ${ary[1]}`);
            com_cd_motion(ary[1]);
        } else {
            msg_draw(`'${ary[1]}'<br>is not found!`);
        }
    }
}

function com_cd_motion(page) {
    //  // スクロール速度(ミリ秒)
     var speed = 800;
    //  // 移動先を取得
     var position = $(`#${page}`).offset().top;
     // 移動
     $('body,html').animate({scrollTop:position}, speed, 'swing');
     return false;
}

function com_check_cls(str) {
    if (str == "cls") {
        title_draw(`(.<span class="UnderBar">_</span>.)`);
        options = "・・・";
    }
}

function com_check_var(str) {
    ary = str.split(" ");
    if (ary[0] == "var" && ary[2] == "=") {
        if (ary[3] in variable) {
            ary[3] = variable[ary[3]];
        }
        if ((/^[0-9]*$/).test(ary[3])) {
            variable[ary[1]] = Number(ary[3]);
            console.log(variable[ary[1]]);
            msg_draw(`def ${ary[1]} > ${variable[ary[1]]}`);
        } else if ((/^'(.*?)'$/).test(ary[3])) {
            ary[3] = (/^'(.*?)'$/).exec(ary[3])[1] || "null";
            variable[ary[1]] = String(ary[3]);
            msg_draw(`def ${ary[1]} > '${variable[ary[1]]}'`);
        } else if ((/^"(.*?)"$/).test(ary[3])) {
            ary[3] = ((/^"(.*?)"$/).exec(ary[3])[1]) || "null";
            variable[ary[1]] = String(ary[3]);
            msg_draw(`def ${ary[1]} > '${variable[ary[1]]}'`);
        } else {
            msg_draw(`undefined ${ary[1]}`);
        }
    } else {
        msg_draw(`Var Command<br>var name = (value)`);
    }
}

function com_check_list() {
    var msg = ""
    for (let key in variable) {
        msg = (msg + `N: ${key} V: ${variable[key]} T: ${typeof(variable[key])}<br>`);
    }
    msg_draw(msg);
}
