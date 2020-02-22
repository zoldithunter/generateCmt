var _listRule = [];
$( document ).ready(function() {

    // readTextFile("rule.txt");
    loadXMLDoc();

    $('#run').click(function(){
        let fileData = document.getElementById('loadData').files[0];
        if (fileData) {
            getRule();
            let reader = new FileReader();
            var number = parseInt($('#number').val());
            if (number < 1) {
                number = 1;
                $('#number').val(1);
            }
            reader.onload = function(progressEvent) {
                let lines = this.result.split('\n');
                var listOutput = getRandomArray(number, lines.length);
                
                var listOutputContents = [];
                [...listOutput].forEach((element, index) => {
                    listOutputContents.push(replaceByRule(lines[element], _listRule));
                })

                $('#output').val(listOutputContents.join("\n"));
            }
            reader.readAsText(fileData);
        } else {
            alert("no data input");
        }
    })
});

function getRandomArray(number, maxNumber){
    var arr = [];
    while(arr.length < number){
        var r = Math.floor(Math.random() * maxNumber);
        arr.push(r);
    }
    return arr;
}

function replaceByRule(content, listRule){
    var tmp = content;
    [...listRule].forEach((ele) => {
        let eles = ele.value.split('|');
        let random = Math.floor(Math.random() * eles.length);
        tmp = tmp.replace(ele.rule, eles[random]);
    })
    return tmp;
}

function getRule() {
    _listRule = [];
    let countRule = $("input[name='rule']");
    [...countRule].forEach((ele, idx) => {
        _listRule.push({ 
            rule:   $("#rule" + idx).val() , 
            value:  $("#text" + idx).val()
        });
    })
}

function loadRule(file) {
    $('#body').html("");
    let reader = new FileReader();
    reader.onload = function(progressEvent) {
        let lines = this.result.split('\n');
        [...lines].forEach((ele, i) => {
            let line = lines[i].split('|');
            let rule = line.splice(0,1);
            let data = line.join("|");
            $('#body').append("<tr><td>Rule" + (i + 1) + ":</td><td><input id = 'rule" + i + "' name='rule' value='" + rule +"'></td><td><input id = 'text" + i +"' name='value' value='"+data+"' ></td></tr>");
        })
    }
    reader.readAsText(file.files[0]);
}

function readTextFile(filePath)
{
    let file = new File(["string"], filePath);
    let reader = new FileReader();
    reader.onload = function(progressEvent) {
        let lines = this.result.split('\n');
        console.log(lines);
    }
    reader.readAsText(file);
}

function loadXMLDoc() {
var xmlhttp;
if (window.XMLHttpRequest) {
xmlhttp = new XMLHttpRequest();
} else {
// code for older browsers
xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
console.log(this.responseText);
}
};
xmlhttp.open("GET", "rule.txt", true);
xmlhttp.send();
}