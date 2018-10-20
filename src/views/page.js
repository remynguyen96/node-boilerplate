/* eslint-disable no-unused-expressions */
const validateEmail = (email) => {
  email.addEventListener('input', () => {
    // email.validity.typeMismatch ? email.setCustomValidity("Địa chỉ email không chính xác !") : email.setCustomValidity("");
    !email.validity.valid ? email.classList.add('error') : email.classList.remove('error');
  }, false);
};
const validatePhone = (phone) => {
  phone.addEventListener('input', (e) => {
    const { value } = e.target;
    const btn = document.querySelector('.btn');
    const regx = /^[^A-Za-z!@#$%^&*()]+$/g;
    if (regx.test(value)) {
      phone.classList.remove('error');
      btn.removeAttribute('disabled');
    } else {
      phone.classList.add('error');
      btn.setAttribute('disabled', true);
    }
  }, false);
};
const getValue = ({ name, address, receive, phone, email, typeBook, quantity }) => {
  const valName = name.value;
  const valEmail = email.value;
  const valPhone = phone.value;
  const valAddress = address.value;
  const valQuantity = quantity.value;
  const valReceive = Array.from(receive).find((r) => r.checked).value;
  const valTypeBook = Array.from(typeBook).find((t) => t.checked).value;
  return {
    name: valName,
    email: valEmail,
    phone: valPhone,
    address: valAddress,
    quantity: valQuantity,
    receive: valReceive,
    books: valTypeBook,
  };
};

const pageSuccess = ({ name, email, phone, address, quantity, receive, books }) => {
  const parseGetPrice = (strBooks) => {
    const arr = strBooks.split(/[^0-9]/);
    return parseInt(arr.filter((item) => item !== '')[0], 10);
  };
  const total = (parseGetPrice(books) * quantity * 1000).toLocaleString('de-DE');
  const receiving = receive === 'M1' ? 'M1: Miền Bắc- Miền Trung' : 'M2: Miền Nam';
  return `
    <style>
    .container-success {
      width: 50%;
      margin: 30px auto;
      font-size: 1.6rem;
    }
    .container-success .row {
      padding: 0;
      margin: 0;
    }
    .container-success h1 {
      text-align: center;
      text-transform: uppercase;
      color: #1dd1a1;
      font-size: 2.4rem;
      letter-spacing: 2px;
      margin-top: 30px;
      line-height: 35px;
    }
    .container-success img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    .container-success p {
      font-weight: 500;
      color: #676161;
      line-height: 28px;
      text-align: center;
      margin-bottom: 40px;
    }
    .container-success table {
      border-collapse: collapse;
      width: 100%;
    }
    .container-success table, td, th {
      border: 1px solid #bababa;
      margin-bottom: 35px;
    }
    .container-success td {
      padding: 8px;
    }
    .container-success th {
      text-transform: capitalize;
      text-align: center;
      height: 40px;
      padding: 0 5px;
    }
    .container-success .order td {
      text-align: center;
    }
    .container-success .table {
      overflow-x:auto;  
    }
    
    @media only screen and (max-width: 1280px) {
      .container-success {
        width: 70%;
      }
    }
    @media only screen and (max-width: 1024px) {
      .container-success {
        width: 90%;
      }
    }
    @media only screen and (max-width: 414px) {
      .container-success {
        margin: 0 0 30px 0;
        width: 100%;
      }
      .container-success .row {
        padding: 0 10px;
      }
      .container-success table {
        margin-bottom: 8px;
      }
      .container-success .order {
        margin-top: 35px;
      }
    }
    </style>
    <div class="container-success">
  <img src="./bg-mail-order.jpg" alt="Background Books">
    <div class="row">
    <h1>Thông Tin Xác Nhận Đăng Kí Mua sách</h1>
  <p>Xin chào <strong>${name}</strong>, bạn vui lòng xác nhận lại thông tin đăng kí mua sách bên dưới: </p>
  <div class="table">
    <table>
      <tr>
        <th>Tên</th>
        <th>Địa Chỉ</th>
        <th>email</th>
        <th>số điện thoại</th>
      </tr>
      <tr>
        <td>${name}</td>
        <td>${address}</td>
        <td>${email}</td>
        <td>${phone}</td>
      </tr>
    </table>
  </div>
  <div class="table">
    <table class="order">
      <tr>
        <th>Đăng ký nhận sách</th>
        <th>Chọn mua</th>
        <th>Số lượng</th>
        <th>Tổng tiền</th>
      </tr>
      <tr>
        <td>${receiving}</td>
        <td>${books}</td>
        <td>${quantity}</td>
        <td>${total} vnđ</td>
      </tr>
    </table>
  </div>
</div>
</div>`;
};

const handleSubmit = ({ name, address, receive, phone, email, typeBook, quantity }) => {
  const form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', async (event) => {
    try {
      event.preventDefault();
      const serialize = getValue({ name, address, receive, phone, email, typeBook, quantity });
      const url = 'http://localhost:4500/api/send-mail';
      const fetchData = await fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(serialize),
      });
      const { success } = await fetchData.json();
      if (success) {
        console.log('%c Buy books successfully 📗', 'font-size: 24px; color: #7CFFC2');
        document.body.innerHTML = pageSuccess(serialize);
      }
    } catch (error) {
      console.log('Request failure: ', error);
    }
  }, false);
};

document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('name');
  const address = document.getElementById('address');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const receive = document.getElementsByName('receiving');
  const typeBook = document.getElementsByName('buy');
  const quantity = document.getElementById('quantity');
  validateEmail(email);
  validatePhone(phone);
  handleSubmit({ name, address, receive, phone, email, typeBook, quantity });
});
