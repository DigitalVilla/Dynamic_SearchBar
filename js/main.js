"use strict";

(function () {
    var proSearch = document.querySelector('.ProSearch');
    var search = document.querySelector('.searchTxt');
    var list = document.querySelector('.searchList');
    var btn = document.querySelector('.searchBtn');
    var table = document.getElementById('display');
    var url = "/res/dataset.xml";
    var XHR, html, indx, emp;
    let sdx = -1;
    search.value = "";
    var keys = {
        RETURN: 13,
        TAB: 9,
        DOWN: 40,
        UP: 38
    };

    // create and send XHR request
    function xhRequest() {
        var XHR = new XMLHttpRequest();
        //response Method 
        XHR.onreadystatechange = function () {
            if (XHR.readyState === 4 && XHR.status == 200) {
                var data = XHR.responseXML;
                emp = data.getElementsByTagName("employee");
                indx = radioNum();
                html = "";
                iforEach(emp, function (e, i) {
                    loadList(e.children[indx].innerHTML);
                });
                showList();
            }
        };
        XHR.open("Get", url);
        XHR.send(null);
    }

    function iforEach(array, callback) {
        for (var i = 0; i < array.length; i++) {
            callback(array[i], i, array);
        }
    }

    function loadList(xml) {
        if (search.value != "" && xml.toLowerCase().startsWith(search.value.toLowerCase()) == true)
            html += '<li>' + xml + '</li>';
    }

    proSearch.addEventListener("click", function (e) {
        if (e.target.localName == "li" || e.target.className == "searchBtn") {
            let value = e.target.localName == "li" ? e.target.innerHTML : search.value;
            closeList(value);
            displayData(value);
        }
    });

    document.addEventListener("keydown", function (e) {
        // let sdx = 0;
        if (e.keyCode != 13 && e.keyCode != 9 && e.keyCode != 40 && e.keyCode != 38)
            xhRequest();
        if (e.keyCode == 13) {
            let value = document.querySelector('.Selected');
            value = value != null ? value.innerHTML : search.value;
            closeList(value);
            displayData(value);
        }
        if (e.keyCode == 40) {
            sdx = ++sdx < list.children.length ? sdx : list.children.length - 1;
            arrowSelect(sdx);
        }
        if (e.keyCode == 38) {
            sdx = --sdx >= 0 ? sdx : 0;
            arrowSelect(sdx);
        }
    });


    function showList() {
        list.innerHTML = "";
        list.innerHTML = html;
    }

    function closeList(key) {
        list.innerHTML = "";
        search.value = key;
    }

    function radioNum() {
        let radioBtns = document.querySelectorAll('.rdBtn');
        var indx;
        sdx = -1; //reset sdx 
        iforEach(radioBtns, function (el, i) {
            if (el.checked == true) indx = i;
        });
        return indx = indx == 0 ? 2 : indx == 1 ? 0 : 4;
    }

    function displayData(key) {
        var search = 0;
        table.innerHTML = "";
        if (emp != null && iforEach(emp, function (el, i) {
                if (el.children[indx].innerHTML === key && ++search > 0)
                    printRecord(el.children[0].innerHTML, el.children[1].innerHTML,
                        el.children[2].innerHTML, el.children[3].innerHTML,
                        el.children[4].innerHTML, el.children[5].innerHTML)
            }));
        if (search == 0 || emp == null)
            alert("Not Found");

            sdx = -1;
    }

    function printRecord(a, b, c, d, e, f) {
        var el = document.createElement("tr");
        el.setAttribute("class", "record");
        html = ['<td>' + c + '</td><td>' + b + '</td><td>' + a + '</td>\
        <td>' + f + '</td><td>' + d + '</td><td>' + e + '</td>'].join("");
        el.innerHTML = html;
        table.appendChild(el)
    }

function arrowSelect(sdx) {
    iforEach(list.children, function (el, i) {
        el.classList.remove('Selected');
    })  
    list.children[sdx].classList.add('Selected');
}

    
})();

// 0: <last_name>
// 1: <first_name>
// 2: <id>
// 3: <company>
// 4: <job_title>
// 5: <phone>



// function idx(indx) {
//     indx = indx == 0 ? 2 : indx == 1 ? 0 : 4;
//     console.log(indx);
// }




// <div class="ProSearch">
// <input class="searchTxt" type="search">
// <button class="searchBtn" type="button"><img src="/res/search.png" alt=""></button>
// <ul class="searchList">
//     <li>info 1</li>
//     <li>info 2</li>
//     <li>info 3</li>
//     <li>info 4</li>
//     <li>info 5</li>
//     <li>info 6</li>
// </ul>
// </div>