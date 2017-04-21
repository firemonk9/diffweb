var server = "127.0.0.1";
//var server = "35.187.200.200";

var toolname = "Diff Tool";

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

function insertCheckLi(ul, text, type) {
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    /*
    var img = document.createElement("img");
    img.setAttribute("src", "../dist/img/" + type + ".png");
    img.setAttribute("style", "width:12px; height:12px; margin-top:4px; float:left;");
    li.appendChild(img);
    */

    var badgespan = document.createElement("span");
    badgespan.setAttribute("class", "badge");
    badgespan.setAttribute("style", "font-size: 9px; float: left; margin-top:4px;");
    badgespan.innerHTML = makeBadgeType(type);
    li.appendChild(badgespan);

    var textdiv = document.createElement("div");
    textdiv.setAttribute("class", "li-tiff")
    textdiv.setAttribute("style", "width: 163px;float: left;");
    textdiv.innerText = text;
    li.appendChild(textdiv);

    var checkspan = document.createElement("span");
    checkspan.setAttribute("class", "glyphicon glyphicon-unchecked");
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

function insertMapper(mapper, mapped) {
    var div = document.createElement("div");

    var img = document.createElement("img");
    if (mapped)
        var imgSrc = "../dist/img/tick.png";
    else
        var imgSrc = "../dist/img/cross54_33.png";
    img.setAttribute("src", imgSrc);
    //img.setAttribute("style", "width: 100px; height:36px; margin-top: 2px;");

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
    $('ul#dist_column li').remove();

    $('ul#src_excluded li').remove();
    $('ul#dist_excluded li').remove();

    while ($('.src-rule-extra').length > 0) {
        $('.src-rule-extra')[0].remove();
    }

    while ($('.dist-rule-extra').length > 0) {
        $('.dist-rule-extra')[0].remove();
    }

    $('.src_trans_column').tagsinput('removeAll');
    $('.dist_trans_column').tagsinput('removeAll');

    $('.src_trans_rule').val('');
    $('.dist_trans_rule').val('');
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
    for (var i = 0; i < cols.length; i++){
        if (cols[i].name.indexOf('__') > 0) {
            cols[i].name = cols[i].name.split('__')[0];
        }
    }
    return cols;
}

function makeDistColumn(distColumns) {
    var cols = distColumns;
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

function prepareAdvancedRule(reload, jobname, srcColumns, srcExcluded, distColumns, distExcluded, primaryKeys, srcTransformations, distTransformations, srcFiterSql, distFilterSql, matchBoth, columnMaps, randomSample) {
    if (reload == true) {   //determine to create or show
        resetRuleData();

        $('#job_name').val(jobname);

        /******************************Generate Column Map Tab *******************************************/
        /*************************************************************************************************/
        var srcUl = document.getElementById("src_column");
        var distUl = document.getElementById("dist_column");

        var mapper = document.getElementById("mapper");

        var srcExUl = document.getElementById("src_excluded");
        var distExUl = document.getElementById("dist_excluded");

        //When src or dist column not exist, return;
        if (srcColumns == null || distColumns == null) {
            document.getElementById("danger-msg").innerHTML = "Source or Destination columns don't exist in the job.";
            $('.alert-danger').show();
            return;
        }

        var remainSrcColumns = {}, remainDistColumns = {};

        //Write src columns to the list.
        for (var i = 0; i < srcColumns.length; i++){
			alert('1');
            //When src column mapped to dist column, extract src column name.
            if (srcColumns[i].name.indexOf('__') > 0) {
                var vals = srcColumns[i].name.split('__');
                insertCheckLi(srcUl, vals[0], srcColumns[i].dataType);
                insertLi(distUl, vals[1], srcColumns[i].dataType);
                insertMapper(mapper, true);
                remainSrcColumns[srcColumns[i].name] = true;
                remainDistColumns[srcColumns[i].name] = true;
            } else {    // when src column contains excluded column, don't include to src list.
                if (srcExcluded.length > 0) {
                    var srcNotExcluded = true;
                    for (var j = 0; j < srcExcluded.length; j++){
                        if (srcExcluded[j] == srcColumns[i].name) {
                            srcNotExcluded = false;
                            break;
                        }
                    }
                    if (srcNotExcluded) {
                        for (var j = 0; j < distColumns.length; j++) {
                            if (distExcluded.length > 0) {
                                var distNotExcluded = true;
                                for (var k = 0; k < distExcluded.length; k++) {
                                    if (distColumns[j].name == distExcluded[k]) {
                                        distNotExcluded = false;
                                        break;
                                    }
                                }
                                if (distNotExcluded) {
                                    if (srcColumns[i].name == distColumns[j].name) {
                                        insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType);
                                        remainSrcColumns[srcColumns[i].name] = true;
                                        insertLi(distUl, distColumns[j].name, distColumns[j].dataType);
                                        remainDistColumns[distColumns[j].name] = true;
                                        insertMapper(mapper, true);
                                        break;
                                    }
                                }
                            } else if (srcColumns[i].name == distColumns[j].name) {
                                insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType);
                                remainSrcColumns[srcColumns[i].name] = true;
                                insertLi(distUl, distColumns[j].name, distColumns[j].dataType);
                                remainDistColumns[distColumns[j].name] = true;
                                insertMapper(mapper, true);
                            }
                        }
                    }
                } else { //when src column doesn't contain excluded column include to src list.
                    for (var j = 0; j < distColumns.length; j++) {
                        if (distExcluded.length > 0) {
                            var distNotExcluded = true;
                            for (var k = 0; k < distExcluded.length; k++) {
                                if (distColumns[j].name == distExcluded[k]) {
                                    distNotExcluded = false;
                                    break;
                                }
                            }
                            if (distNotExcluded) {
                                if (srcColumns[i].name == distColumns[j].name) {
                                    li = insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType);
                                    remainSrcColumns[srcColumns[i].name] = true;
                                    insertLi(distUl, distColumns[j].name, distColumns[j].dataType);
                                    remainDistColumns[distColumns[j].name] = true;
                                    insertMapper(mapper, true);
                                    break;
                                }
                            }
                        } else if (srcColumns[i].name == distColumns[j].name) {
                            li = insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType);
                            remainSrcColumns[srcColumns[i].name] = true;
                            insertLi(distUl, distColumns[j].name, distColumns[j].dataType);
                            remainDistColumns[distColumns[j].name] = true;
                            insertMapper(mapper, true);
                        }
                    }
                }
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
                        insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType);
                        var map = insertMapper(mapper, false);
                        for (var j = 0; j < columnMaps.length; j++) {
                            if (columnMaps[j].srcColumn == srcColumns[i]) {
                                map.children[0].setAttribute("src", "../dist/img/green_arrow.png");
                                break;
                            }
                        }
                    }
                }else {
                    insertCheckLi(srcUl, srcColumns[i].name, srcColumns[i].dataType);
                    var map = insertMapper(mapper, false);
                    for (var j = 0; j < columnMaps.length; j++) {
                        if (columnMaps[j].srcColumn == srcColumns[i].name) {
                            map.children[0].setAttribute("src", "../dist/img/green_arrow.png");
                            break;
                        }
                    }
                }
            }
        }

        for (var i = 0; i < distColumns.length; i++) {
            if (remainDistColumns[distColumns[i].name] != true) {
                if (srcExcluded.length > 0) {
                    var distNotExcluded = true;
                    for (var j = 0; j < distExcluded.length; j++) {
                        if (distExcluded[j] == distColumns[i].name) {
                            distNotExcluded = false;
                            break;
                        }
                    }
                    if (distNotExcluded) {
                        insertLi(distUl, distColumns[i].name, distColumns[i].dataType);
                    }
                } else {
                    insertLi(distUl, distColumns[i].name, distColumns[i].dataType);
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
                    insertCheckLi(srcUl, srcColumns[j].name, srcColumns[j].dataType == null ? 'no' : srcColumns[j].dataType);
                    insertMapper(mapper, false);
                }
            }
        }

        //Write dist excluded columns to list
        for (var i = 0; i < distExcluded.length; i++) {
            for (var j = 0; j < distColumns.length; j++) {
                if (distExcluded[i] == distColumns[j].name) {
                    insertLi(distUl, distColumns[j].name, distColumns[j].dataType == null ? 'no' : distColumns[j].dataType);
                }
            }
        }
        /***********************************End Generating Column Map Tab***************************************/
        /*******************************************************************************************************/

        /***********************************Generate check boxes ***********************************************/

        $('#rule_matchboth').prop( "checked", matchBoth );
        //$('#rule_compare').prop("checked", compareCommon);
        if (randomSample != false && randomSample != null)
            $('#rule_randomsample').val(randomSample);

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
        if (distTransformations.length > 1) {
            for (var i = 0; i < distTransformations.length - 1; i++) {
                var srcNext = document.getElementById("dist_trans_next");
                insertRule(srcNext, "dist");
                createTypeahead($('.dist_trans_column'), concatExclude(distColumns, distExcluded), 'name');
            }
        }
        if (distTransformations.length > 0) {
            $('.dist_trans_column').each(function(index){
                for (var i = 0; i < distTransformations[index].column.length; i++) {
                    $(this).tagsinput('add', {"name":distTransformations[index].column[i]});
                }
            });
            $('.dist_trans_rule').each(function(index){
                $(this).val(Base64.decode(distTransformations[index].rule));
            });
        }
        /***********************************End Generating Transformations Tab***********************************/
        /********************************************************************************************************/

        if (srcFiterSql != null) {
            $('#src_filter_sql input').val(srcFiterSql);
        }
        if (distFilterSql != null) {
            $('#dist_filter_sql input').val(distFilterSql);
        }

        setMapperListener();
    }
}

function setMoveDownListener() {
    $('.move-down').on('click', function(e) {
        var actives = '';
        actives = $('ul#dist_column li.active');
        if (actives[0] == null)
            return;
        var index = $('ul#dist_column li').index(actives[0]);
        var li = $("ul#dist_column li:eq("+index+")");
        index += 1;
        var liAfter = $("ul#dist_column li:eq("+index+")");
        liAfter.after(li);
    });
}

function setMoveUpListener() {
    $('.move-up').on('click', function(e) {
        var actives = '';
        actives = $('ul#dist_column li.active');
        if (actives[0] == null)
            return;
        var index = $('ul#dist_column li').index(actives[0]);
        if (index <= 0)
            return;
        var li = $("ul#dist_column li:eq("+index+")");
        index -= 1;
        var liBefore = $("ul#dist_column li:eq("+index+")");
        liBefore.before(li);
    });
}

function setIncludeListener() {
    $('.include').on('click', function(e) 	{
        var srcExcludeActives = '', distExcludeActives = '';
        srcExcludeActives = $('ul#src_excluded li.active');
        distExcludeActives = $('ul#dist_excluded li.active');

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

        if (distExcludeActives.length > 0) {
            for (var i = 0; i < distExcludeActives.length; i++) {
                var index = $('ul#dist_excluded li').index(distExcludeActives[i]);
                var liDist = $("ul#dist_excluded li:eq("+index+")");
                liDist.remove();

                insertLi(document.getElementById("dist_column"), liDist[0].innerText);

                /*
                 distExcluded = distExcluded.filter(function(el){
                 return el !== liDist[0].innerText;
                 });
                 */
            }
        }
    });
}

function setExcludeListener() {
    $('.exclude').on('click', function(e) {
        var srcActives = '', distActives = '';
        srcActives = $('ul#src_column li.active');
        distActives = $('ul#dist_column li.active');

        if (srcActives.length > 0) {
            for (var i = 0; i < srcActives.length; i++) {
                var index = $('ul#src_column li').index(srcActives[i]);
                var liSrc = $("ul#src_column li:eq("+index+")");
                liSrc.remove();

                insertLi(document.getElementById("src_excluded"), liSrc[0].innerText);
            }
        }

        if (distActives.length > 0) {
            for (var i = 0; i < distActives.length; i++) {
                var index = $('ul#dist_column li').index(distActives[i]);
                var liDist = $("ul#dist_column li:eq("+index+")");
                liDist.remove();

                insertLi(document.getElementById("dist_excluded"), liDist[0].innerText);

                //distExcluded.push(liDist[0].innerText);
            }
        }
    });
}

function setMapperListener() {
    $('#mapper img').each(function(index){
        var img = $(this);
        img.on('click', function(e){
			
            if (img[0].src.indexOf("tick") > 0) {
	
                img[0].src = "../dist/img/cross54_33.png";
            } else {
                img[0].src = "../dist/img/tick.png";
            }
        });
    });
}

function getInputData(compareCommon) {
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
    var distExcludeColmns = new Array;

    for (var i = 0; i < $('ul#src_column li').length; i++) {
        var colMap = {};
        if ($('#mapper img')[i].src.indexOf('green_arrow.png') > 0) {
            if ($('ul#src_column li div')[i].innerText != $('ul#dist_column li div')[i].innerText && $('ul#dist_column li')[i] != null) {
                colMap["srcColumn"] = $('ul#src_column li div')[i].innerText;
                colMap["distColumn"] = $('ul#dist_column li div')[i].innerText;
                columnMapping.push(colMap);
            }
        } else if ($('#mapper img')[i].src.indexOf('yellow_arrow.png') > 0) {
            if ($('ul#src_column li')[i] != null)
                srcExcludeColmns.push($('ul#src_column li div')[i].innerText);
            if ($('ul#dist_column li')[i] != null) {
                distExcludeColmns.push($('ul#dist_column li div')[i].innerText);
            }
        }
    }
    result["columnMapping"] = columnMapping;

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
    srcFile["srcPath"] = $('#src_path').val();
    srcFile["srcFormat"] = $('#select_src_type').val();
    if (srcFile["srcFormat"] == "CSV") {
        srcFile["header"] = $('#src_header').val() == "True" ? true : false;
        srcFile["srcDelimiter"] = $('#src_delimiter').val();
        if (srcFile["header"])
            srcFile["useOtherSchema"] = true;
        else {
            srcFile["useOtherSchema"] = false;
            srcFile["columns"] = $('#src_file_schema').val().split(srcFile["srcDelimiter"]);
        }
    } else if (srcFile["srcFormat"] == "JDBC") {
        var jdbcData = {};
        jdbcData["jdbcUrl"] = $('#src_url').val();
        jdbcData["jdbcUser"] = $('#src_user').val();
        jdbcData["jdbcPassword"] = $('#src_pass').val();
        jdbcData["jdbcDriverPath"] = $('#src_driver').val();
        srcFile["jdbcData"] = jdbcData;
    }
    var transformations = new Array;
    if ($('.src_trans_column').tagsinput('items').length > 0) {
        $('.src_trans_column').each(function(index){
            var transform = {};
            transform["base64"] = true;
            var column = new Array;
            for (var i = 0; i < $(this).tagsinput('items').length; i++) {
                column.push($(this).tagsinput('items')[i].name);
            }
            transform["column"] = column;
            transform["rule"] = Base64.encode($('.src_trans_rule')[index].value);
            transformations.push(transform);
        });
    }
    srcFile["transformations"] = transformations;
    result["srcFile"] = srcFile;
    /***********************************End src Input********************************/

    /**********************************Make dist Input*******************************/
    var distFile = {};
    /*
    for (var i = 0; i < $('ul#dist_excluded li').length; i++) {
        distExcludeColmns.push($('ul#dist_excluded li div')[i].innerText);
    }
    */
    if ($('#dist_filter_sql').val() != '') {
        distFile["filterSql"] = $('#dist_filter_sql').val();
    }
    distFile["excludeColmns"] = distExcludeColmns;
    distFile["srcPath"] = $('#dist_path').val();
    distFile["srcFormat"] = $('#select_dist_type').val();
    if (distFile["srcFormat"] == "CSV") {
        distFile["header"] = $('#dist_header').val() == "True" ? true : false;
        distFile["srcDelimiter"] = $('#dist_delimiter').val();
        if (distFile["header"])
            distFile["useOtherSchema"] = true;
        else {
            distFile["useOtherSchema"] = false;
            distFile["columns"] = $('#dist_file_schema').val().split(distFile["srcDelimiter"]);
        }
    } else if (distFile["srcFormat"] == "JDBC") {
        var jdbcData = {};
        jdbcData["jdbcUrl"] = $('#dist_url').val();
        jdbcData["jdbcUser"] = $('#dist_user').val();
        jdbcData["jdbcPassword"] = $('#dist_pass').val();
        jdbcData["jdbcDriverPath"] = $('#dist_driver').val();
        distFile["jdbcData"] = jdbcData;
    }
    transformations = [];
    if ($('.dist_trans_column').tagsinput('items').length > 0) {
        $('.dist_trans_column').each(function(index){
            var transform = {};
            transform["base64"] = true;
            var column = new Array;
            for (var i = 0; i < $(this).tagsinput('items').length; i++) {
                column.push($(this).tagsinput('items')[i].name);
            }
            transform["column"] = column;
            transform["rule"] = Base64.encode($('.dist_trans_rule')[index].value);
            transformations.push(transform);
        });
    }
    distFile["transformations"] = transformations;
    result["distFile"] = distFile;
    /*******************************End dist Input*********************************/

    var primaryKey = new Array;
    for (var i = 0; i < $('ul#src_column li span.glyphicon-check').length; i++) {
        primaryKey.push($('ul#src_column li span.glyphicon-check')[i].previousSibling.innerText);
    }
    result["primaryKey"] = primaryKey;
    return result;
}

function makeInputJson(jobname, compareCommonColumnsOnly, validateRowsCount, randomSample, matchBoth, process,
                       columnMapping, srcInput, distInput, primaryKey ) {

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

    var distFile = {};
    distFile["filterSql"] = distInput.filterSql;
    distFile["excludeColmns"] = distInput.excludeColmns;
    distFile["srcPath"] = distInput.srcPath;
    distFile["srcFormat"] = distInput.srcFormat;
    if (distFile["srcFormat"] == "CSV") {
        distFile["header"] = distInput.header;
        distFile["srcDelimiter"] = distInput.srcDelimiter;
        distFile["useOtherSchema"] = false;
        if (!distFile["header"]) {
            distFile["columns"] = distInput.columns;
        }
    } else if (distFile["srcFormat"] == "JSON") {
        var jdbcData = {};
        jdbcData["jdbcUrl"] = distInput.jdbcUrl;
        jdbcData["jdbcUser"] = distInput.jdbcUser;
        jdbcData["jdbcPassword"] = distInput.jdbcPassword;
        jdbcData["jdbcDriverPath"] = distInput.jdbcDriverPath;
        distFile["jdbcData"] = jdbcData;
    }

    distFile["transformations"] = distInput.transformations;
    filesCompareData["distFile"] = distFile;

    filesCompareData["matchBoth"] = matchBoth;

    filesCompareData["randomSample"] = randomSample;

    filesCompareData["primaryKey"] = primaryKey;

    filesCompareData["process"] = true;
    var srcFile = {};
    srcFile["filterSql"] = srcInput.filterSql;
    srcFile["excludeColmns"] = srcInput.excludeColmns;
    srcFile["srcPath"] = srcInput.srcPath;
    srcFile["srcFormat"] = srcInput.srcFormat;
    if (srcFile["srcFormat"] == "CSV") {
        srcFile["header"] = srcInput.header;
        srcFile["srcDelimiter"] = srcInput.srcDelimiter;
        srcFile["useOtherSchema"] = false;
        if (!srcFile["header"]) {
            srcFile["columns"] = srcInput.columns;
        }
    } else if (srcFile["srcFormat"] == "JSON") {
        var jdbcData = {};
        jdbcData["jdbcUrl"] = srcInput.jdbcUrl;
        jdbcData["jdbcUser"] = srcInput.jdbcUser;
        jdbcData["jdbcPassword"] = srcInput.jdbcPassword;
        jdbcData["jdbcDriverPath"] = srcInput.jdbcDriverPath;
        srcFile["jdbcData"] = jdbcData;
    }

    srcFile["transformations"] = srcInput.transformations;

    filesCompareData["srcFile"] = srcFile;
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