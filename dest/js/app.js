var server = "127.0.0.1";
//var server = "35.187.200.200";

var toolname = "Cygnet Infotech LLC";

var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
};



function setToolDetail() {
    document.getElementById("tool-name").innerHTML = toolname;
    document.getElementById("tool-version").innerHTML = getCookie("version");
}

function setCookie(cname, cvalue, exdays) {
    /*
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    */
    document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

function addLiClickListener(li) {
    li.addEventListener("click", function(e){
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
			 $(this).siblings().removeClass('active');
        }
    });
}

function addLiCheckClickListener(span) {
    span.addEventListener('click', function() {
        if ($(this).hasClass('glyphicon-unchecked')) {
            $(this).removeClass('glyphicon-unchecked');
            $(this).addClass('glyphicon-check');
        } else if ($(this).hasClass('glyphicon-check')) {
            $(this).removeClass('glyphicon-check');
            $(this).addClass('glyphicon-unchecked');
        }
    });
}

function makeBadgeType(type) {
    switch (type) {
        case 'boolean':
            type = 'boolean'
            break;
        case 'byte':
            type = 'byte';
            break;
        case 'date':
            type = 'dt';
            break;
        case 'double':
            type = 'double';
            break;
        case 'float':
            type = 'float';
            break;
        case 'int':
            break;
        case 'long':
            type = 'int';
            type = 'long';
            break;
        case 'short':
            type = 'short';
            break;
        case 'string':
            type = 'string';
            break;
        case 'timestamp':
            type = 'timestamp';
            break;
    }

    return type;
}

function insertCheckLi(ul, text, type, i = '') {
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
	li.setAttribute("data-id", i);
    /*
    var img = document.createElement("img");
    img.setAttribute("src", "../dest/img/" + type + ".png");
    img.setAttribute("style", "width:12px; height:12px; margin-top:4px; float:left;");
    li.appendChild(img);
    */

    var badgespan = document.createElement("span");
    badgespan.setAttribute("class", "badge");
    badgespan.setAttribute("style", "font-size: 9px; float: left; margin-top:4px;");
    badgespan.innerHTML = makeBadgeType(type);
    li.appendChild(badgespan);

    var textdiv = document.createElement("div");
    textdiv.setAttribute("class", "li-tiff");
    textdiv.setAttribute("style", "width: 146px;float: left;");
    textdiv.innerText = text;
    li.appendChild(textdiv);

    var checkspan = document.createElement("span");
    checkspan.setAttribute("class", "glyphicon glyphicon-unchecked testing");
	checkspan.setAttribute("id", i);
	checkspan.setAttribute("new-div-id", i);
    checkspan.setAttribute("style", "float: right;");

    addLiCheckClickListener(checkspan);
    addLiClickListener(li);

    li.appendChild(checkspan);
    ul.appendChild(li);

    return li;
}

function insertLi(ul, text, type) {
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");

    var badgespan = document.createElement("span");
    badgespan.setAttribute("class", "badge");
    badgespan.setAttribute("style", "font-size: 9px; float: left; margin-top:4px;");
    badgespan.innerHTML = makeBadgeType(type);
    li.appendChild(badgespan);

    var textdiv = document.createElement("div");
    textdiv.setAttribute("class", "li-tiff");
    //textdiv.setAttribute("style", "width:255px;");
    textdiv.innerText = text;
    li.appendChild(textdiv);

    addLiClickListener(li);
    ul.appendChild(li);

    return li;
}

//Applying class for TICKS.
function insertMapper(mapper, mapped,i = '') {
	//alert(i);
	//alert(mapper);
	
    var div = document.createElement("div");
	div.setAttribute("class", "list_"+i);
	
	//alert("list_"+i);
	
    var img = document.createElement("img");
	img.setAttribute("rel", i);
	img.setAttribute("class", "uncheck");

	//alert(mapped);
    if (mapped)
        var imgSrc = "../dest/img/tick.png";
    else
        var imgSrc = "../dest/img/cross54_33.png";
    img.setAttribute("src", imgSrc);

    div.appendChild(img);
    mapper.appendChild(div);
    return div;
}

function createTypeahead(target, values, key) {
    var cols = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace(key),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: values
    });
    cols.initialize();
    target.tagsinput({
        itemValue: key,
        itemText: key,
        typeaheadjs: {
            name: 'cols',
            displayKey: key,
            source: cols.ttAdapter()
        }
    });
}

function resetRuleData() {
    $('ul#src_column li').remove();
    $('ul#dest_column li').remove();

    $('ul#src_excluded li').remove();
    $('ul#dest_excluded li').remove();

    while ($('.src-rule-extra').length > 0) {
        $('.src-rule-extra')[0].remove();
    }

    while ($('.dest-rule-extra').length > 0) {
        $('.dest-rule-extra')[0].remove();
    }

    $('.src_trans_column').tagsinput('removeAll');
    $('.dest_trans_column').tagsinput('removeAll');

    $('.src_trans_rule').val('');
    $('.dest_trans_rule').val('');
}

function resetSrcRuleData() {
    $('ul#src_column li').remove();
    $('ul#src_excluded li').remove();

    while ($('.src-rule-extra').length > 0) {
        $('.src-rule-extra')[0].remove();
    }

    $('.src_trans_column').tagsinput('removeAll');
    $('.src_trans_rule').val('');
}

function resetdestRuleData() {
    $('ul#dest_column li').remove();
    $('ul#dest_excluded li').remove();

    while ($('.dest-rule-extra').length > 0) {
        $('.dest-rule-extra')[0].remove();
    }
    $('.dest_trans_column').tagsinput('removeAll');
    $('.dest_trans_rule').val('');
}


function insertRule(nextEl, tag) {
    var group = document.createElement("div");
    group.setAttribute("class", "form-group row " + tag + "-rule-extra");
    group.setAttribute("style", "margin-top: 15px;");

    var labelCol = document.createElement("label");
    labelCol.setAttribute("class", "col-sm-3");
    labelCol.innerHTML = "Column";

    var divCol = document.createElement("div");
    divCol.setAttribute("class", "col-sm-9");
    var divColp = document.createElement("div");
    divColp.setAttribute("class", tag + "_trans_column");
    var inputCol = document.createElement("input");
    inputCol.setAttribute("type", "text");
    inputCol.setAttribute("class", "form-control");

    group.appendChild(labelCol);
    divColp.appendChild(inputCol);
    divCol.appendChild(divColp);
    group.appendChild(divCol);


    var labelRule = document.createElement("label");
    labelRule.setAttribute("class", "col-sm-3");
    labelRule.innerHTML = "Rule";

    var divColq = document.createElement("div");
    divColq.setAttribute("class", "col-sm-9");

    var inputRule = document.createElement("input");
    inputRule.setAttribute("type", "text");
    inputRule.setAttribute("class", "form-control " + tag + "_trans_rule");
    divColq.appendChild(inputRule);
    group.appendChild(labelRule);
    group.appendChild(divColq);

    nextEl.parentNode.insertBefore(group, nextEl);
}

function removeRule(target) {
    if (target.length > 0)
        target[target.length - 1].remove();
}

function makeDataToColumn(data) {
    var column = new Array;
    for (var i = 0; i < data.length; i++) {
        var col = {};
        col["name"] = data[i].col;
        col["dataType"] = data[i].colType;
        column.push(col);
    }
    return column;
}

function makeSrcColumn(srcColumns) {
    var cols = srcColumns;
    if (false && cols)
    for (var i = 0; i < cols.length; i++){
        if (cols[i].name.indexOf('__') > 0) {
            cols[i].name = cols[i].name.split('__')[0];
        }
    }
    return cols;
}

function makedestColumn(destColumns) {
    var cols = destColumns;
    if (false && cols)
    for (var i = 0; i < cols.length; i++){
        if (cols[i].name.indexOf('__') > 0) {
            cols[i].name = cols[i].name.split('__')[1];
        }
    }
    return cols;
}

function concatExclude(srcColumns, srcExcluded) {
    var tmp = new Array;
    for (var i = 0; i < srcExcluded.length; i++) {
        var ex = {};
        ex["name"] = srcExcluded[i];
        tmp.push(ex);
    }
    return srcColumns.concat(tmp);
}

function prepareAdvancedRule(reload, jobname, srcColumns, srcExcluded, destColumns, destExcluded, primaryKeys, srcTransformations, destTransformations, srcFiterSql, destFilterSql, matchBoth, columnMaps, randomSample, columnMapping) {
    if (reload == true) {   //determine to create or show
        resetRuleData();
		
        var n= $('#job_name').val(jobname);
		
        /******************************Generate Column Map Tab *******************************************/
        /*************************************************************************************************/
        var srcUl = document.getElementById("src_column");
        var destUl = document.getElementById("dest_column");

        var mapper = document.getElementById("mapper");

        var srcExUl = document.getElementById("src_excluded");
        var destExUl = document.getElementById("dest_excluded");

        //When src or dest column not exist, return;
        if (srcColumns == null || destColumns == null) {
            document.getElementById("danger-msg").innerHTML = "Source or Destination columns don't exist in the job.";
            $('.alert-danger').show();
            return;
        }

        var remainSrcColumns = {}, remaindestColumns = {};

        //Write src columns to the list.
        for (var i = 0; i < srcColumns.length; i++) {

            //$('.list img').attr('rel', i);

            //When src column mapped to dest column, extract src column name.
            /*for (var t = 0; t < columnMapping.length; t++) {
                if (columnMapping[t].srcColumn == srcColumns[i].name) {
                    insertCheckLi(srcUl, columnMapping[t].srcColumn, srcColumns[i].dataType, i);
                    insertLi(destUl, columnMapping[t].destColumn, srcColumns[i].dataType);
                    insertMapper(mapper, true, i);
                    remainSrcColumns[columnMapping[t].srcColumn] = true;
                    remaindestColumns[columnMapping[t].destColumn] = true;
                }*/
                var flag = false;
                for (var t = 0; t < columnMapping.length; t++) {
                    if (columnMapping[t].srcColumn == srcColumns[i].name) {
                        insertCheckLi(srcUl, columnMapping[t].srcColumn, srcColumns[i].dataType, i);
                        insertLi(destUl, columnMapping[t].destColumn, srcColumns[i].dataType);
                        insertMapper(mapper, true, i);
                        remainSrcColumns[columnMapping[t].srcColumn] = true;
                        remaindestColumns[columnMapping[t].destColumn] = true;
                        flag = true;
                        break;
                    }
                }
                if (flag == true)
                    continue;
                if (false && srcColumns[i].name.indexOf('__') > 0) {
                    var vals = srcColumns[i].name.split('__');
                    insertCheckLi(srcUl, vals[0], srcColumns[i].dataType,i);
                    insertLi(destUl, vals[1], srcColumns[i].dataType);
                    insertMapper(mapper, true, i);
                    remainSrcColumns[srcColumns[i].name] = true;
                    remaindestColumns[srcColumns[i].name] = true;
                } else {    // when src column contains excluded column, don't include to src list.
                    if (srcExcluded.length > 0) {
                        var srcNotExcluded = true;
                        for (var j = 0; j < srcExcluded.length; j++) {
                            if (srcExcluded[j] == srcColumns[i].name) {
                                srcNotExcluded = false;
                                break;
                            }
                        }
                        if (srcNotExcluded) {
                            for (var j = 0; j < destColumns.length; j++) {
                                if (destExcluded.length > 0) {
                                    var destNotExcluded = true;
                                    for (var k = 0; k < destExcluded.length; k++) {
                                        if (destColumns[j].name == destExcluded[k]) {
                                            destNotExcluded = false;
                                            break;
                                        }
                                    }
                                    if (destNotExcluded) {
                                        if (srcColumns[i].name == destColumns[j].name) {
                                            insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType, i);
                                            remainSrcColumns[srcColumns[i].name] = true;
                                            insertLi(destUl, destColumns[j].name, destColumns[j].dataType);
                                            remaindestColumns[destColumns[j].name] = true;
                                            insertMapper(mapper, true, i);
                                            break;
                                        }
                                    }
                                } else if (srcColumns[i].name == destColumns[j].name) {
                                    insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType, i);
                                    remainSrcColumns[srcColumns[i].name] = true;
                                    insertLi(destUl, destColumns[j].name, destColumns[j].dataType);
                                    remaindestColumns[destColumns[j].name] = true;
                                    insertMapper(mapper, true, i);
                                }
                            }
                        }
                    } else { //when src column doesn't contain excluded column include to src list.
                        for (var j = 0; j < destColumns.length; j++) {
                            if (destExcluded.length > 0) {
                                var destNotExcluded = true;
                                for (var k = 0; k < destExcluded.length; k++) {
                                    if (destColumns[j].name == destExcluded[k]) {
                                        destNotExcluded = false;
                                        break;
                                    }
                                }
                                if (destNotExcluded) {
                                    if (srcColumns[i].name == destColumns[j].name) {
                                        li = insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType, i);
                                        remainSrcColumns[srcColumns[i].name] = true;
                                        insertLi(destUl, destColumns[j].name, destColumns[j].dataType);
                                        remaindestColumns[destColumns[j].name] = true;
                                        insertMapper(mapper, true, i);
                                        break;
                                    }
                                }
                            } else if (srcColumns[i].name == destColumns[j].name) {
                                li = insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType, i);
                                remainSrcColumns[srcColumns[i].name] = true;
                                insertLi(destUl, destColumns[j].name, destColumns[j].dataType);
                                remaindestColumns[destColumns[j].name] = true;
                                insertMapper(mapper, true, i);
                            }
                        }
                    }
                }
            //}
        }
    }

    for (var i = 0; i < srcColumns.length; i++) {
        if (remainSrcColumns[srcColumns[i].name] != true) {
            if (srcExcluded.length > 0) {
                var srcNotExcluded = true;
                for (var j = 0; j < srcExcluded.length; j++) {
                    if (srcExcluded[j] == srcColumns[i].name) {
                        srcNotExcluded = false;
                        break;
                    }
                }
                if (srcNotExcluded) {
                    insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType,i);
                    var map = insertMapper(mapper, false,i);
                    for (var j = 0; j < columnMaps.length; j++) {
                        if (columnMaps[j].srcColumn == srcColumns[i]) {
                            map.children[0].setAttribute("src", "../dest/img/green_arrow.png");
                            break;
                        }
                    }
                }
            }else {
                insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType,i);
                var map = insertMapper(mapper, false,i);
                for (var j = 0; j < columnMaps.length; j++) {
                    if (columnMaps[j].srcColumn == srcColumns[i].name) {
                        map.children[0].setAttribute("src", "../dest/img/green_arrow.png");
                        break;
                    }
                }
            }
        }
    }

    for (var i = 0; i < destColumns.length; i++) {
        if (remaindestColumns[destColumns[i].name] != true) {
            if (srcExcluded.length > 0) {
                var destNotExcluded = true;
                for (var j = 0; j < destExcluded.length; j++) {
                    if (destExcluded[j] == destColumns[i].name) {
                        destNotExcluded = false;
                        break;
                    }
                }
                if (destNotExcluded) {
                    insertLi(destUl, destColumns[i].name, destColumns[i].dataType);
                }
            } else {
                insertLi(destUl, destColumns[i].name, destColumns[i].dataType);
            }
        }
    }

    //when src column contains primary key set column make check mark.
    $('ul#src_column li').each(function(index){
        for (var i = 0; i < primaryKeys.length; i++) {
            if ($(this)[0].children[1].innerText == primaryKeys[i]) {
                $(this)[0].children[2].classList.remove("glyphicon-unchecked");
                $(this)[0].children[2].classList.add("glyphicon-check");
            }
        }
    });

    //Write src excluded columns to list
    for (var i = 0; i < srcExcluded.length; i++) {
        for (var j = 0; j < srcColumns.length; j++) {
            if (srcExcluded[i] == srcColumns[j].name) {
                insertCheckLi(srcUl, srcColumns[j].name, srcColumns[j].dataType == null ? 'no' : srcColumns[j].dataType,j);
                insertMapper(mapper, false,j);
            }
        }
    }

    //Write dest excluded columns to list
    for (var i = 0; i < destExcluded.length; i++) {
        for (var j = 0; j < destColumns.length; j++) {
            if (destExcluded[i] == destColumns[j].name) {
                insertLi(destUl, destColumns[j].name, destColumns[j].dataType == null ? 'no' : destColumns[j].dataType);
            }
        }
    }


    /***********************************End Generating Column Map Tab***************************************/
    /*******************************************************************************************************/

    /***********************************Generate check boxes ***********************************************/

    $('#rule_matchboth').prop( "checked", matchBoth );
    //$('#rule_matchboth').prop('checked', true);
    if(matchBoth == false){
        var url = window.location.href;
        var result = url.split('/');
        var length= result.length - 1;
        //alert(result[length]);
        if(result[length] == 'addjob.html'){
            $('#rule_matchboth').prop("checked", true);
        }else{
            $('#rule_matchboth').prop("checked", false);
        }
    }else if(matchBoth == true){
        $('#rule_matchboth').prop("checked", true);
    }



    //$('#rule_compare').prop("checked", compareCommon);
    if (randomSample != false && randomSample != null)
        $('#rule_randomsample').val(randomSample);
    else
        $('#rule_randomsample').val("");

    /***********************************Generate Transformations Tab****************************************/
    /*******************************************************************************************************/

    //when transformations exist put the values to proper form
    if (srcTransformations.length > 1) {
        for (var i = 0; i < srcTransformations.length - 1; i++) {
            var srcNext = document.getElementById("src_trans_next");
            insertRule(srcNext, "src");
            createTypeahead($('.src_trans_column'), concatExclude(srcColumns, srcExcluded), 'name');
        }
    }
    if (srcTransformations.length > 0) {
        $('.src_trans_column').each(function(index){
            for (var i = 0; i < srcTransformations[index].column.length; i++) {
                $(this).tagsinput('add', {"name":srcTransformations[index].column[i]});
            }
        });
        $('.src_trans_rule').each(function(index){
            $(this).val(Base64.decode(srcTransformations[index].rule));
        });
    }

    //when transformations exist put the values to proper form
    if (destTransformations.length > 1) {
        for (var i = 0; i < destTransformations.length - 1; i++) {
            var srcNext = document.getElementById("dest_trans_next");
            insertRule(srcNext, "dest");
            createTypeahead($('.dest_trans_column'), concatExclude(destColumns, destExcluded), 'name');
        }
    }
    if (destTransformations.length > 0) {
        $('.dest_trans_column').each(function(index){
            for (var i = 0; i < destTransformations[index].column.length; i++) {
                $(this).tagsinput('add', {"name":destTransformations[index].column[i]});
            }
        });
        $('.dest_trans_rule').each(function(index){
            $(this).val(Base64.decode(destTransformations[index].rule));
        });
    }
    /***********************************End Generating Transformations Tab***********************************/
    /********************************************************************************************************/



    if (srcFiterSql != null) {
        $('#src_filter_sql').val(srcFiterSql);
    } else {
        $('#src_filter_sql').val("");
    }
    if (destFilterSql != null) {
        $('#dest_filter_sql').val(destFilterSql);
    } else {
        $('#dest_filter_sql').val("");
    }

    setMapperListener();
}




function setMoveDownListener() {
    $('.move-down').on('click', function(e) {
        var actives = '';
        actives = $('ul#dest_column li.active');
        if (actives[0] == null)
            return;
        var index = $('ul#dest_column li').index(actives[0]);
        var li = $("ul#dest_column li:eq("+index+")");
        index += 1;
        var liAfter = $("ul#dest_column li:eq("+index+")");
        liAfter.after(li);
    });
}

function setMoveUpListener() {
    $('.move-up').on('click', function(e) {
        var actives = '';
        actives = $('ul#dest_column li.active');
        if (actives[0] == null)
            return;
        var index = $('ul#dest_column li').index(actives[0]);
        if (index <= 0)
            return;
        var li = $("ul#dest_column li:eq("+index+")");
        index -= 1;
        var liBefore = $("ul#dest_column li:eq("+index+")");
        liBefore.before(li);
    });
}

function setIncludeListener() {
    $('.include').on('click', function(e) 	{
        var srcExcludeActives = '', destExcludeActives = '';
        srcExcludeActives = $('ul#src_excluded li.active');
        destExcludeActives = $('ul#dest_excluded li.active');

        if (srcExcludeActives.length > 0)  {
            for (var i = 0; i < srcExcludeActives.length; i++) {
                var index = $('ul#src_excluded li').index(srcExcludeActives[i]);
                var liSrc = $("ul#src_excluded li:eq("+index+")");
                liSrc.remove();

                insertCheckLi(document.getElementById("src_column"), liSrc[0].innerText);

                /*
                 srcExcluded = srcExcluded.filter(function(el){
                 return el !== liSrc[0].innerText;
                 });
                 */
            }
        }

        if (destExcludeActives.length > 0) {
            for (var i = 0; i < destExcludeActives.length; i++) {
                var index = $('ul#dest_excluded li').index(destExcludeActives[i]);
                var lidest = $("ul#dest_excluded li:eq("+index+")");
                lidest.remove();

                insertLi(document.getElementById("dest_column"), lidest[0].innerText);

                /*
                 destExcluded = destExcluded.filter(function(el){
                 return el !== lidest[0].innerText;
                 });
                 */
            }
        }
    });
}

function setExcludeListener() {
    $('.exclude').on('click', function(e) {
        var srcActives = '', destActives = '';
        srcActives = $('ul#src_column li.active');
        destActives = $('ul#dest_column li.active');

        if (srcActives.length > 0) {
            for (var i = 0; i < srcActives.length; i++) {
                var index = $('ul#src_column li').index(srcActives[i]);
                var liSrc = $("ul#src_column li:eq("+index+")");
                liSrc.remove();

                insertLi(document.getElementById("src_excluded"), liSrc[0].innerText);
            }
        }

        if (destActives.length > 0) {
            for (var i = 0; i < destActives.length; i++) {
                var index = $('ul#dest_column li').index(destActives[i]);
                var lidest = $("ul#dest_column li:eq("+index+")");
                lidest.remove();

                insertLi(document.getElementById("dest_excluded"), lidest[0].innerText);

                //destExcluded.push(lidest[0].innerText);
            }
        }
    });
}

function setMapperListener() {
	
	$('.uncheck').on('click', function(e){
		var rel_old= $(this).attr('rel');
		var new_id= "[new-div-id="+rel_old+"]";
		//alert(new_id);
		var rel= $(new_id).attr('id');
		var source= $(this).attr('src');
		
		//alert(rel_old);
		//alert(rel);
		var id= '#'+rel;
		
		if(source == '../dest/img/cross54_33.png'){
			//$(id).removeClass();
			//$(id).addClass('glyphicon glyphicon-check');
		}else if(source == '../dest/img/tick.png'){
			$(id).removeClass();
			$(id).addClass('glyphicon glyphicon-unchecked');
		}
		//alert(source);
	 });
	
	
    $('#mapper img').each(function(index){
        var img = $(this);
        img.on('click', function(e){
			
            if (img[0].src.indexOf("tick") > 0) {
                img[0].src = "../dest/img/cross54_33.png";
            } else {
                img[0].src = "../dest/img/tick.png";
            }
        });
    });
}

function uncheckbox(){
  $('#mapper img.uncheck').on('click', function(e){
	  var page = $('#mapper img.uncheck').attr('rel');
			alert(page);
			
		 });
}


function getInputData(compareCommon, sql, column) {
    var result = {};

    result["jobname"] = $('#job_name').val();
    //result["compareCommonColumnsOnly"] = $('#rule_compare')[0].checked;
    result["compareCommonColumnsOnly"] = compareCommon;
    //result["validateRowsCount"] = $('#rule_validaterowscount')[0].checked;

    if ($('#rule_randomsample').val() != '')
        result["randomSample"] = parseInt($('#rule_randomsample').val());
    result["matchBoth"] = $('#rule_matchboth')[0].checked;
    result["process"] = true;

    var columnMapping = new Array;

    var srcExcludeColmns = new Array;
    var destExcludeColmns = new Array;

    for (var i = 0; i < $('ul#src_column li').length; i++) {
        var colMap = {};
        if ($('#mapper img')[i].src.indexOf('tick.png') > 0) {
            if ($('ul#src_column li div')[i].innerText != $('ul#dest_column li div')[i].innerText && $('ul#dest_column li')[i] != null) {
                colMap["srcColumn"] = $('ul#src_column li div')[i].innerText;
                colMap["destColumn"] = $('ul#dest_column li div')[i].innerText;
                columnMapping.push(colMap);
            }
        } else if ($('#mapper img')[i].src.indexOf('cross54_33.png') > 0) {
            if ($('ul#src_column li')[i] != null)
                srcExcludeColmns.push($('ul#src_column li div')[i].innerText);
            if ($('ul#dest_column li')[i] != null) {
                destExcludeColmns.push($('ul#dest_column li div')[i].innerText);
            }
        }
    }
    result["columnMapping"] = columnMapping;

    /*job resources*/
    var jobResources = {};
    jobResources["numExecutors"] = $("#numExecutors").val();
    jobResources["executorCores"] = $("#executorCores").val();
    jobResources["executorMemory"] = $("#executorMemory").val();

    result["jobResources"] = jobResources;
    
    /*********************************Make Src Input***********************************/
    var srcFile = {};
    /*
    for (var i = 0; i < $('ul#src_excluded li').length; i++) {
        srcExcludeColmns.push($('ul#src_excluded li div')[i].innerText);
    }
    */
    if ($('#src_filter_sql').val() != '') {
        srcFile["filterSql"] = $('#src_filter_sql').val();
    }
    srcFile["excludeColmns"] = srcExcludeColmns;
    srcFile["datasetPath"] = $('#src_path').val();
    srcFile["datasetFormat"] = $('#select_src_type').val();
    if (srcFile["datasetFormat"] == "CSV") {
        srcFile["header"] = $('#src_header').val() == "True" ? true : false;
        srcFile["datasetDelimiter"] = $('#src_delimiter').val();
        if (srcFile["header"])
            srcFile["useOtherSchema"] = true;
        else {
            srcFile["useOtherSchema"] = false;
            srcFile["columns"] = $('#src_file_schema').val().split(',');
        }
    } else if (srcFile["datasetFormat"] == "JDBC") {
        /*
        var jdbcData = {};
        jdbcData["jdbcUrl"] = $('#src_url').val();
        jdbcData["jdbcUser"] = $('#src_user').val();
        jdbcData["jdbcPassword"] = $('#src_pass').val();
        jdbcData["jdbcDriverPath"] = $('#src_driver').val();
        srcFile["jdbcData"] = jdbcData;
        */
        jdbcData={}
        jdbcData["jdbcUrl"] = $('#src_url').val();
        jdbcData["jdbcUser"] = $('#src_user').val();
        jdbcData["jdbcPassword"] = $('#src_pass').val();
        jdbcData["jdbcDriverPath"] = $('#src_driver').val();
        jdbcData["jdbcDriverClass"] = $('#src_driver_class').val();
        srcFile["datasetPath"] = $('#src_jtable').val();
        srcFile["jdbcData"]=jdbcData
    }
    var transformations = new Array;
    // if ($('.src_trans_column').tagsinput('items').length > 0) {
    //     $('.src_trans_column').each(function(index){
    if($('.src_trans_rule')[0].value ) {
            var transform = {};
            transform["base64"] = true;
            var column = new Array;
            // for (var i = 0; i < $(this).tagsinput('items').length; i++) {
            //     column.push($(this).tagsinput('items')[i].name);
            // }

            transform["sql"]=true;
            transform["column"] = ["c"];
            transform["rule"] = Base64.encode($('.src_trans_rule')[0].value);
            transformations.push(transform);
    //     });
     }

    srcFile["transformations"] = transformations;

    /*validation*/
    srcFile["validation_src_sql"] = sql;
    srcFile["validation_src_unique_cols"] = $("#validation_src_unique_cols").val();
    srcFile["validation_src_column_name"] = column;
    srcFile["validation_src_notnull_cols"] = $("#validation_src_notnull_cols").val();
    srcFile["validation_src_notempty_cols"] = $("#validation_src_notempty_cols").val();
    
    result["srcFile"] = srcFile;
    /***********************************End src Input********************************/

    /**********************************Make dest Input*******************************/
    var destFile = {};

    /*
    for (var i = 0; i < $('ul#dest_excluded li').length; i++) {
        destExcludeColmns.push($('ul#dest_excluded li div')[i].innerText);
    }
    */
    if ($('#dest_filter_sql').val() != '') {
        destFile["filterSql"] = $('#dest_filter_sql').val();
    }
    destFile["excludeColmns"] = destExcludeColmns;
    destFile["datasetPath"] = $('#dest_path').val();
    destFile["datasetFormat"] = $('#select_dest_type').val();
    if (destFile["datasetFormat"] == "CSV") {
        destFile["header"] = $('#dest_header').val() == "True" ? true : false;
        destFile["datasetDelimiter"] = $('#dest_delimiter').val();
        if (destFile["header"])
            destFile["useOtherSchema"] = true;
        else {
            destFile["useOtherSchema"] = false;
            destFile["columns"] = $('#dest_file_schema').val().split(',');
        }
    } else if (destFile["datasetFormat"] == "JDBC") {
        /*
        var jdbcData = {};
        jdbcData["jdbcUrl"] = $('#dest_url').val();
        jdbcData["jdbcUser"] = $('#dest_user').val();
        jdbcData["jdbcPassword"] = $('#dest_pass').val();
        jdbcData["jdbcDriverPath"] = $('#dest_driver').val();
        destFile["jdbcData"] = jdbcData;
        */

        jdbcData={}
        jdbcData["jdbcUrl"] = $('#dest_url').val();
        jdbcData["jdbcUser"] = $('#dest_user').val();
        jdbcData["jdbcPassword"] = $('#dest_pass').val();
        jdbcData["jdbcDriverPath"] = $('#dest_driver').val();
        jdbcData["jdbcDriverClass"] = $('#dest_driver_class').val();
        destFile["datasetPath"] = $('#dest_jtable').val();
        destFile["jdbcData"]=jdbcData
    }
    transformations = [];
    // if ($('.dest_trans_column').tagsinput('items').length > 0) {
    //     $('.dest_trans_column').each(function(index){
    if($('.dest_trans_rule')[0].value ) {
        var transform = {};
        transform["base64"] = true;
        var column = new Array;
        //   for (var i = 0; i < $(this).tagsinput('items').length; i++) {
        //  column.push($(this).tagsinput('items')[0].name);
        //  }
        transform["sql"] = true;
        transform["column"] = ["c"];
        transform["rule"] = Base64.encode($('.dest_trans_rule')[0].value);
        transformations.push(transform);
        //     });
        // }
    }
    destFile["transformations"] = transformations;

    /*validation*/
    destFile["validation_dest_sql"] = $("#validation_dest_sql").val();
    destFile["validation_dest_unique_cols"] = $("#validation_dest_unique_cols").val();
    destFile["validation_dest_column_name"] = $("#validation_dest_column_name").val();
    destFile["validation_dest_notnull_cols"] = $("#validation_dest_notnull_cols").val();
    destFile["validation_dest_notempty_cols"] = $("#validation_dest_notempty_cols").val();

    result["destFile"] = destFile;
    /*******************************End dest Input*********************************/

    var compareKey = new Array;
    for (var i = 0; i < $('ul#src_column li span.glyphicon-check').length; i++) {
        compareKey.push($('ul#src_column li span.glyphicon-check')[i].previousSibling.innerText);
    }
    result["compareKey"] = compareKey;
    return result;
}

function makeInputJson(jobname, compareCommonColumnsOnly, validateRowsCount, randomSample, matchBoth, process,
                       columnMapping, srcInput, destInput, compareKey, jobResources, checkValidation ) {

    var jsonTree = {};
    var filesCompareList = new Array;

    var filesCompareData = {};

    if (jobname != "") {
        filesCompareData["name"] = jobname;
    }

    filesCompareData["compareCommonColumnsOnly"] = compareCommonColumnsOnly;;
    filesCompareData["validateRowsCount"] = validateRowsCount;
    /*
    if (randomSample != "" ) {
        filesCompareData["randomSample"] = randomSample;
    }
    */
    filesCompareData["columnMapping"] = columnMapping;

    var destFile = {};
    destFile["filterSql"] = destInput.filterSql;
    destFile["excludeColmns"] = destInput.excludeColmns;
    destFile["datasetPath"] = destInput.datasetPath;
    destFile["datasetFormat"] = destInput.datasetFormat;
    if (destFile["datasetFormat"] == "CSV") {
        destFile["header"] = destInput.header;
        destFile["datasetDelimiter"] = destInput.datasetDelimiter;
        destFile["useOtherSchema"] = false;
        if (!destFile["header"]) {
            destFile["columns"] = destInput.columns;
        }
    } else if (destFile["datasetFormat"] == "JDBC") {
        var jdbcData = {};
        jdbcData["jdbcUrl"] = destInput.jdbcData.jdbcUrl;
        jdbcData["jdbcUser"] = destInput.jdbcData.jdbcUser;
        jdbcData["jdbcPassword"] = destInput.jdbcData.jdbcPassword;
        if (getCookie("localMode") == "true")
            jdbcData["jdbcDriverPath"] = "";
        else
            jdbcData["jdbcDriverPath"] = destInput.jdbcData.jdbcDriverPath;
        jdbcData["jdbcDriverClass"] = destInput.jdbcData.jdbcDriverClass;
        destFile["jdbcData"] = jdbcData;
    }

    destFile["transformations"] = destInput.transformations;
    filesCompareData["destFile"] = destFile;

    filesCompareData["matchBoth"] = matchBoth;

    filesCompareData["randomSample"] = randomSample;

    filesCompareData["compareKey"] = compareKey;

    filesCompareData["process"] = true;
    var srcFile = {};
    srcFile["filterSql"] = srcInput.filterSql;
    srcFile["excludeColmns"] = srcInput.excludeColmns;
    srcFile["datasetPath"] = srcInput.datasetPath;
    srcFile["datasetFormat"] = srcInput.datasetFormat;
    if (srcFile["datasetFormat"] == "CSV") {
        srcFile["header"] = srcInput.header;
        srcFile["datasetDelimiter"] = srcInput.datasetDelimiter;
        srcFile["useOtherSchema"] = false;
        if (!srcFile["header"]) {
            srcFile["columns"] = srcInput.columns;
        }
    } else if (srcFile["datasetFormat"] == "JDBC") {
        var jdbcData = {};
        jdbcData["jdbcUrl"] = srcInput.jdbcData.jdbcUrl;
        jdbcData["jdbcUser"] = srcInput.jdbcData.jdbcUser;
        jdbcData["jdbcPassword"] = srcInput.jdbcData.jdbcPassword;
        if (getCookie("localMode") == "true")
            jdbcData["jdbcDriverPath"] = "";
        else
            jdbcData["jdbcDriverPath"] = srcInput.jdbcData.jdbcDriverPath;

        jdbcData["jdbcDriverClass"] = srcInput.jdbcData.jdbcDriverClass;
        srcFile["jdbcData"] = jdbcData;
    }

    srcFile["transformations"] = srcInput.transformations;

    filesCompareData["srcFile"] = srcFile;

    /*src validation*/
    /*
    srcFile["validation_src_sql"] = $("#validation_src_sql").val();
    srcFile["validation_src_sql_value_min"] = $("#validation_src_sql_value_min").val();
    srcFile["validation_src_sql_value_max"] = $("#validation_src_sql_value_max").val();
    srcFile["validation_src_unique_cols"] = $("#validation_src_unique_cols").val();
    srcFile["validation_src_column_name"] = $("#validation_src_column_name").val();
    srcFile["validation_src_column_min"] = $("#validation_src_column_min").val();
    srcFile["validation_src_column_max"] = $("#validation_src_column_max").val();
    srcFile["validation_src_notnull_cols"] = $("#validation_src_notnull_cols").val();
    */
    var srcvalidationSQL = new Array;
    /*sql*/
    var src_sql = srcInput.validation_src_sql;
    if (src_sql){
        for(i = 0 ; i < src_sql.length ; i++){
            var sql_value = {};
            sql_value["beginTime"] = 0;
            sql_value["endTime"] = 0;
            sql_value["submittedTime"] = 0;

            var validationStatement = {};
            validationStatement["continueIfFail"] = false;

            for(j = 0 ; j < src_sql[i].length ; j++){

                var col = src_sql[i][j].col;
                var value = src_sql[i][j].value;

                if (col == 'sql')
                    validationStatement["sql"] = value;
                else if (col == 'min')
                    validationStatement["sqlValidRangeMin"] = parseInt(value);
                else if (col == 'max')
                    validationStatement["sqlValidRangeMax"] = parseInt(value);
                else continue;

                sql_value["validationStatement"] = validationStatement;
            }

            srcvalidationSQL.push(sql_value);
        }
    }
    
    /*unique*/
    var validation_src_unique_cols = srcInput.validation_src_unique_cols;
    if (validation_src_unique_cols){
        if (!Array.isArray(validation_src_unique_cols))
            validation_src_unique_cols = validation_src_unique_cols.split(",")
                                                    .map(Function.prototype.call, String.prototype.trim);

        var sql_value = {};
        sql_value["beginTime"] = 0;
        sql_value["endTime"] = 0;
        sql_value["submittedTime"] = 0;

        var validationStatement = {};
        validationStatement["continueIfFail"] = false;
        validationStatement["uniqueColumns"] = validation_src_unique_cols;
        
        sql_value["validationStatement"] = validationStatement;
        srcvalidationSQL.push(sql_value);
    }

    /*column*/
    var column = srcInput.validation_src_column_name;
    if (column){
        for(i = 0 ; i < column.length ; i++){
            var sql_value = {};
            sql_value["beginTime"] = 0;
            sql_value["endTime"] = 0;
            sql_value["submittedTime"] = 0;

            var validationStatement = {};
            validationStatement["continueIfFail"] = false;

            for(j = 0 ; j < column[i].length ; j++){

                var col = column[i][j].col;
                var value = column[i][j].value;

                if (col == 'column')
                    validationStatement["columnName"] = value;
                else if (col == 'min')
                    validationStatement["columnRangeMin"] = parseInt(value);
                else if (col == 'max')
                    validationStatement["columnRangeMax"] = parseInt(value);
                else continue;

            }
            sql_value["validationStatement"] = validationStatement;
            srcvalidationSQL.push(sql_value);
        }
    }
    /*notnull*/
    var validation_src_notnull_cols = srcInput.validation_src_notnull_cols;
    if (validation_src_notnull_cols){

        var notnull_cols = validation_src_notnull_cols;
        if (!Array.isArray(validation_src_notnull_cols))
            notnull_cols = validation_src_notnull_cols.split(",")
                                                    .map(Function.prototype.call, String.prototype.trim);

        for(i = 0 ; i < notnull_cols.length ; i++){

            var sql_value = {};
            sql_value["beginTime"] = 0;
            sql_value["endTime"] = 0;
            sql_value["submittedTime"] = 0;

            var validationStatement = {};
            validationStatement["continueIfFail"] = false;
            validationStatement["columnName"] = notnull_cols[i];
            validationStatement["notNull"] = true;

            sql_value["validationStatement"] = validationStatement;
            srcvalidationSQL.push(sql_value);
        }
    }

    /*notempty*/
    var validation_src_notempty_cols = srcInput.validation_src_notempty_cols;
    if (validation_src_notempty_cols){

        var notempty_cols = validation_src_notempty_cols;
        if (!Array.isArray(validation_src_notempty_cols))
            notempty_cols = validation_src_notempty_cols.split(",")
                                                    .map(Function.prototype.call, String.prototype.trim);

        for(i = 0 ; i < notempty_cols.length ; i++){

            var sql_value = {};
            sql_value["beginTime"] = 0;
            sql_value["endTime"] = 0;
            sql_value["submittedTime"] = 0;

            var validationStatement = {};
            validationStatement["continueIfFail"] = false;
            validationStatement["columnName"] = notempty_cols[i];
            validationStatement["notEmpty"] = true;

            sql_value["validationStatement"] = validationStatement;
            srcvalidationSQL.push(sql_value);
        }
    }

    if (srcvalidationSQL.length != 0){
        filesCompareData["srcvalidationSQL"] = srcvalidationSQL;
        //filesCompareData["destvalidationSQL"] = srcvalidationSQL;
    }

    /*check empty validation condition*/
    if (checkValidation && srcvalidationSQL.length == 0) return "";

    /*job results*/
    if (jobResources){
        if (jobResources["numExecutors"])
            jsonTree["numExecutors"] = parseInt(jobResources["numExecutors"]);
        if (jobResources["executorCores"])
            jsonTree["executorCores"] = parseInt(jobResources["executorCores"]);
        if (jobResources["executorMemory"])
            jsonTree["executorMemory"] = jobResources["executorMemory"];
    }

    filesCompareList.push(filesCompareData);
    jsonTree["filesCompareList"] = filesCompareList;
    return JSON.stringify(jsonTree);
}

function colMapHelp() {
    //window.location.href = "https://tobymcdowell.wixsite.com/difftool/documentation";
    window.open("https://tobymcdowell.wixsite.com/difftool/documentation", '_blank', 'location=yes,scrollbars=yes,status=yes');
}

function transHelp() {
    //window.location.href = "https://tobymcdowell.wixsite.com/difftool/documentation";
    window.open("https://tobymcdowell.wixsite.com/difftool/documentation", '_blank', 'location=yes,scrollbars=yes,status=yes');
}

function setSampleDataTable(data, type){
    var id = "sample_data_table_" + type;
    var table = document.getElementById(id);
    var columns = Array();

    /*setting data*/
    var tabledata = Array();
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var rowdata = {};
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var col = cell.col;
            var value = cell.value;
            rowdata[col] = value;

            /*set header*/
            if (i == 0){
                columns.push(cell.col);
            }
        }
        tabledata.push(rowdata);
    }

    /**/
    table.innerHTML = "";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    /*header*/
    for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        var th = document.createElement("th");
        th.setAttribute("data-field", col);
        th.setAttribute("data-sortable", "true");
        th.innerHTML = col;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    $('#' + id).bootstrapTable("destroy");
    $('#' + id).bootstrapTable({
        data: tabledata
    });
    $('#' + id).bootstrapTable('refresh');
}

function create_new_item(ischeck, column, value, min, max, actualvalue, checkresult){

    var result = Array();
    var condition = Array();
    condition['col'] = column;
    condition['value'] = value;
    result.push(condition);

    if (column == 'sql' || column == 'column'){
        var condition = Array();
        condition['col'] = 'min';
        condition['value'] = min;
        result.push(condition); 

        var condition = Array();
        condition['col'] = 'max';
        condition['value'] = max;
        result.push(condition);
    }

    if (ischeck){

        if (column == 'sql' || column == 'notnull' || column == 'notempty'){
            var condition = Array();
            condition['col'] = 'actual';
            condition['value'] = "<b>" + actualvalue + "</b>";
            result.push(condition);
        }

        var condition = Array();
        condition['col'] = 'Status';
        condition['value'] = checkresult ? "<b style='color:green'>Pass</b>" : "<b style='color:red'>Fail</b>";
        result.push(condition);

        if (column == 'column' || column == 'notnull' || column == 'notempty'){
            var condition = Array();
            condition['col'] = 'sample_data';
            condition['value'] = checkresult ? "" : "<a style='color:red' href='javascript:sample_data_show(\"" + column + "\")'>sample data</a>";
            result.push(condition);
        }

    }
    return result;
}

function show_data_table(data, id){

    if (data.length == 0) return;
    var table = document.getElementById(id);
    var columns = Array();

    /*setting data*/
    var tabledata = Array();
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var rowdata = {};
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var col = cell.col;
            var value = cell.value;

            if (row[0].col == 'column'){
                if (col == 'min')
                    col = "Min Column Value";
                else if (col == 'max')
                    col = "Max Column Value";
                else if (col == "actual")
                    col = "Actual Value";
            }else if (row[0].col == 'notnull'){
                if (col == 'notnull')
                    col = 'Field';
                else if (col == 'actual')
                    col = 'Null Count';
            }else if (row[0].col == 'notempty'){
                if (col == 'notempty')
                    col = 'Field';
                else if (col == 'actual')
                    col = 'Empty Count';
            }else{
                if (col == 'min')
                    col = "Excepted Min";
                else if (col == 'max')
                    col = "Excepted Max";
                else if (col == "actual")
                    col = "Actual Value";
            } 

            /*set header*/
            if (i == 0){
                columns.push(col);
            }

            rowdata[col] = value;
        }
        tabledata.push(rowdata);
    }

    /**/
    table.innerHTML = "";
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    /*header*/
    for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        var th = document.createElement("th");
        th.setAttribute("data-field", col);
        th.setAttribute("data-sortable", "true");
        th.innerHTML = col;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    $('#' + id).bootstrapTable("destroy");
    $('#' + id).bootstrapTable({
        data: tabledata,

    });

    $('#' + id).bootstrapTable('refresh');
}

/*auto complete*/
function setSelect(fields, id, maxCount, default_value){
        
    var fields_name = Array();

    for(i = 0 ; i < fields.length ; i++){
        var one = {};
        one['title'] = fields[i].name;
        one['id'] = fields[i].name;
        fields_name.push(one);
    }

    if (!maxCount) maxCount  = null;
    if (maxCount == 1){
        var html = '';
        for(i = 0 ; i < fields.length ; i++){
            html += '<option>' + fields[i].name + '</option>';
        }
        $('#' + id).html(html);
        $('#' + id).val('');
        return;
    }

    var $select = $('#' + id).selectize({
        maxItems: null,
        valueField: 'id',
        labelField: 'title',
        searchField: 'title',
        /*options: [
            {id: 1, title: 'Spectrometer', url: 'http://en.wikipedia.org/wiki/Spectrometers'},
            {id: 2, title: 'Star Chart', url: 'http://en.wikipedia.org/wiki/Star_chart'},
            {id: 3, title: 'Electrical Tape', url: 'http://en.wikipedia.org/wiki/Electrical_tape'}
        ],*/
        options: fields_name,
        maxItems : maxCount,
        create: false
    });

    //default_value = ["email", "company"];
    if (default_value){
        var selectize = $select[0].selectize;
        selectize.setValue(default_value);
    }
}