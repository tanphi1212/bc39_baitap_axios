let userServices = new UserServices();
let validation = new Validation();
let ds = [];
const getEle = (id) => document.getElementById(id);

const getInfo = (id = "", isAdd) => {
    let taiKhoan = getEle('TaiKhoan').value;
    let hoTen = getEle('HoTen').value;
    let matKhau = getEle('MatKhau').value;
    let email = getEle('Email').value;
    let hinhAnh = getEle('HinhAnh').value;
    let loaiND = getEle('loaiNguoiDung').value;
    let ngonNgu = getEle('loaiNgonNgu').value;
    let moTa = getEle('MoTa').value;

    let isVaild = true;

    if (isAdd) {
        isVaild &= validation.kiemTraRong(taiKhoan, "errTaiKhoan", "Không được để trống")
            && validation.kiemTraTrungTaiKhoan(taiKhoan, "errTaiKhoan", "Tài khoản đã tồn tại", ds)
    }


    isVaild &= validation.kiemTraRong(hoTen, "errHoTen", "Không được để trống")
        && validation.kiemTraChuoiKyTu(hoTen, "errHoTen", "Chỉ được nhập chữ cái")

    isVaild &= validation.kiemTraRong(matKhau, "errMatKhau", "Không được để trống")
            && validation.kiemTraDoDaiKyTu(matKhau, "errMatKhau", "Độ dài mật khẩu từ 6 -> 8", 6, 8)
            && validation.kiemTraMatKhau(matKhau, "errMatKhau","Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");
    isVaild &= validation.kiemTraRong(email, "errEmail", "Không được để trống")
            && validation.kiemTraEmail(email,"errEmail","nhập đúng email");
    isVaild &= validation.kiemTraRong(hinhAnh, "errHinhAnh", "Không được để trống")

    isVaild &= validation.kiemTraRong(moTa, "errMoTa", "Không được để trống")
    && validation.kiemTraDoDaiKyTu(moTa, "errMoTa", "Tối đa chỉ được 60 ký tự", 1, 60);

    isVaild &= validation.kiemTraChon("loaiNguoiDung", "errLoaiND", "Vui lòng chọn loại người dùng");

    isVaild &= validation.kiemTraChon("loaiNgonNgu", "errNgonNgu", "Vui lòng chọn ngôn ngữ");
    
    if (!isVaild) {
        return
    }

    let user = new User(id, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, ngonNgu, moTa);


    return user;
}

function renderHTML(data) {
    let content = "";
    data.forEach((user, index) => {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="editUser(${user.id})">Cập nhật</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Xóa</button>
            </td>
        </tr>
        `;
    });
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}


const getListUser = () => {
    userServices.getUserApi()
        .then((result) => {
            console.log(result);
            if (result.statusText === "OK") {
                ds = result.data
                renderHTML(ds)
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

getListUser();

// Thêm mới
getEle('btnThemNguoiDung').onclick = function () {
    console.log(123);
    document.querySelector('.modal-title').innerHTML = `Thêm người dùng`;

    var button = `<button class="btn btn-success" onclick="addUser()">Thêm Mới</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button;

    getEle('TaiKhoan').value = "";
    getEle('HoTen').value = "";
    getEle('MatKhau').value = "";
    getEle('Email').value = "";
    getEle('HinhAnh').value = "";
    getEle('loaiNguoiDung').value = "Chọn loại người dùng";
    getEle('loaiNgonNgu').value = "Chọn ngôn ngữ";
    getEle('MoTa').value = "";
}

const addUser = () => {
    let user = getInfo("", true);
    if (user) {
        userServices.addUsersApi(user)
            .then((result) => {
                alert("Thêm thành công");
                getListUser();
                document.getElementsByClassName('close')[0].click();
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

//cập nhật
const editUser = (id) => {
    var title = "Cập nhật Sản Phẩm";
    document.getElementsByClassName("modal-title")[0].innerHTML = title;

    var button = `<button class="btn btn-success" onclick="updateUser(${id})">Cập nhật sản phẩm</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button;

    userServices.getUserByIdApi(id)
        .then((result) => {
            getEle('TaiKhoan').value = result.data.taiKhoan;
            getEle('TaiKhoan').disabled = true;
            getEle('HoTen').value = result.data.hoTen;
            getEle('MatKhau').value = result.data.matKhau;
            getEle('Email').value = result.data.email;
            getEle('HinhAnh').value = result.data.hinhAnh;
            getEle('loaiNguoiDung').value = result.data.loaiND;
            getEle('loaiNgonNgu').value = result.data.ngonNgu;
            getEle('MoTa').value = result.data.moTa;
        })
        .catch((error) => {
            console.log(error);
        })
}

const updateUser = (id) => {
    let user = getInfo(id, false);
    userServices.updateUserByIdApi(user)
        .then((result) => {
            alert("Cập nhật thành công")
            getListUser();
            document.getElementsByClassName('close')[0].click();
        })
        .catch((error) => {
            console.log(error)
        })
}

//Xóa

const deleteUser = (id) => {
    console.log(123)
    userServices.deleteUserApi(id)
        .then((result) => {
            alert("Xóa thành công")
            getListUser()
        })
        .catch((error) => {
            console.log(error);
        })
}