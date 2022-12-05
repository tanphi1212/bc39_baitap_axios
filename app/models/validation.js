function Validation(){
    this.kiemTraRong = function(value, errorId, mess){
        if (value === "") {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block"
            return false;
        }
        getEle(errorId).innerHTML = ""
        getEle(errorId).style.display = "none"
        return true;
    }
    this.kiemTraDoDaiKyTu = function (value, errorId, mess, min, max) {
        if (value.trim().length >= min && value.trim().length <= max) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none"
            return true
        }
        getEle(errorId).innerHTML = mess
        getEle(errorId).style.display = "block"
        return false
    }
    this.kiemTraSo = function(value,errorId,mess){
        var letter = /^[0-9]+$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none"
            return true
        }

        getEle(errorId).innerHTML = mess
        getEle(errorId).style.display = "block"
        return false
    }
    this.kiemTraChuoiKyTu = function (value, errorId, mess) {
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none"
            return true
        }

        getEle(errorId).innerHTML = mess
        getEle(errorId).style.display = "block"
        return false
    }

    this.kiemTraEmail = function (value, errorId, mess) {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none"
            return true
        }

        getEle(errorId).innerHTML = mess
        getEle(errorId).style.display = "block"
        return false
    }

    this.kiemTraMatKhau = function (value, errorId, mess){
        var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none"
            return true
        }

        getEle(errorId).innerHTML = mess
        getEle(errorId).style.display = "block"
        return false
    }
    this.kiemTraMinMax = function(value, errorId, mess, min, max){
        if (value >= min && value <= max) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none"
            return true
        }
        getEle(errorId).innerHTML = mess
        getEle(errorId).style.display = "block"
        return false
    }

    this.kiemTraChon = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
          getEle(errorId).innerHTML = "";
          getEle(errorId).style.display = "none";
          return true;
        }
    
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
      };
     
      this.kiemTraTrungTaiKhoan = function (value, errorId, mess, data) {
        var exist = false;
        for (var i = 0; i < data.length; i++) {
          var user = data[i];
          if (user.taiKhoan === value) {
            exist = true;
            break;
          }
        }
    
        if (exist) {
          getEle(errorId).innerHTML = mess;
          getEle(errorId).style.display = "block";
          return false;
        }
    
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
      };

}