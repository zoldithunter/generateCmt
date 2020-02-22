var _listRule = [];
var _listData = [];
$( document ).ready(function() {
    $('#run').click(function(){
        let fileData = document.getElementById('loadData').files[0];

        if (fileData) {
            getRuleAndData();
            let reader = new FileReader();
            let number = parseInt($('#number').val());
            reader.onload = function(progressEvent) {
                let lines = this.result.split('\n');
                var listOutput = getRandomArray(number, lines.length);
                
                var listOutputContents = [];
                [...listOutput].forEach((element, index) => {
                    listOutputContents.push(replaceByRule(lines[element], _listRule, _listData));
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

function replaceByRule(content, listRule, listData){
    var tmp = content;
    [...listRule].forEach((ele, idx) => {
        let eles = listData[idx].split('|');
        let random = Math.floor(Math.random() * eles.length);
        tmp = tmp.replace(ele, eles[random]);
    })
    return tmp;
}

function getRuleAndData() {
    _listRule = [];
    _listData = [];
    let countRule = $("input[name='rule']");
    [...countRule].forEach((ele, idx) => {
        _listRule.push($("#rule" + idx).val());
        _listData.push($("#text" + idx).val());
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
