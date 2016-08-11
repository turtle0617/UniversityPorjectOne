function check() {
    if (document.forma.Name.value.length == 0 || document.forma.Email.value.length == 0 || document.forma.Phone.value.length == 0) {
        alert("還有東西沒填完喔！");
        return false;
    } else {
        return true;
    }
}

function Total() {
    txt1 = document.getElementById('textfield').value;
    txt2 = document.getElementById('textfield2').value;
    txt3 = document.getElementById('textfield3').value;

    (txt1 != "") ? txt1 = parseInt(txt1, 10): txt1 = 0;
    (txt2 != "") ? txt2 = parseInt(txt2, 10): txt2 = 0;
    (txt3 != "") ? txt3 = parseInt(txt3, 10): txt3 = 0;

    total = txt1 + txt2 + txt3;
    document.getElementById('span1').innerHTML = total;
}