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
                for (var ii =0; ii < listOutput.length; ii++) {
                    let tmpContent = lines[listOutput[ii]-1];
                    listOutputContents.push(replaceByRule(tmpContent, _listRule, _listData));
                }

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
        var r = Math.floor(Math.random() * maxNumber) + 1;
        // if(arr.indexOf(r) === -1) arr.push(r);
        arr.push(r);
    }
    return arr;
}

function replaceByRule(content, listRule, listData){
    var tmp = content;
    for (var i = 0; i < listRule.length; i++) {
        tmp = tmp.replace(listRule[i], listData[i]);
    }
    return tmp;
}

function getRuleAndData() {
    _listRule = [];
    _listData = [];
    let countRule = $("input[name='rule']").length;
    for(var i = 1; i<= countRule; i++) {
        _listRule.push($("#rule" + i).val());
        _listData.push($("#text" + i).val());
    }
}

function loadRule(file) {
    $('#body').html("");
    let reader = new FileReader();
    reader.onload = function(progressEvent) {
        let lines = this.result.split('\n');
        for (var i =1; i<= lines.length; i++) {
            $('#body').append("<tr><td>Rule" + i + ":</td><td><input id = 'rule" + i + "' name='rule' value='" + lines[i-1] +"'></td><td><input id = 'text" + i +"' name='value' ></td></tr>");
        }
    }
    reader.readAsText(file.files[0]);
}
