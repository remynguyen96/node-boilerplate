const generalSectionTemplate = (description) => (`
<style>
    .container {
      width: 50%;
      margin: 30px auto;
      font-size: 16px;
    }
    .container .row {
      padding: 0;
      margin: 0;
    }
    .container h1 {
      text-align: center;
      text-transform: uppercase;
      color: #1dd1a1;
      font-size: 24px;
      letter-spacing: 2px;
      margin-top: 30px;
      line-height: 35px;
    }
    .container img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
    }
    .container p {
      font-weight: 500;
      color: #676161;
      line-height: 28px;
      text-align: center;
      margin-bottom: 40px;
    }
    .container table {
      border-collapse: collapse;
      width: 100%;
    }
    .container table, td, th {
      border: 1px solid #bababa;
      margin-bottom: 35px;
    }
    .container td {
      padding: 8px;
    }
    .container th {
      text-transform: capitalize;
      text-align: center;
      height: 40px;
      padding: 0 5px;
    }
    .container .order td {
      text-align: center;
    }
    .container .table {
      overflow-x:auto;  
    }
    
    @media only screen and (max-width: 1280px) {
      .container {
        width: 70%;
      }
    }
    @media only screen and (max-width: 1024px) {
      .container {
        width: 90%;
      }
    }
    @media only screen and (max-width: 414px) {
      .container {
        margin: 0 0 30px 0;
        width: 100%;
      }
      .container .row {
        padding: 0 10px;
      }
      .container table {
        margin-bottom: 8px;
      }
      .container .order {
        margin-top: 35px;
      }
    }
</style>
<div class="container">
  <img src="http://localhost:4500/bg-mail-order.jpg" alt="Background Books">
  <div class="row">
    ${description}
  </div>
</div>
`);

const TemplateMail = ({ name, email, phone, address, quantity, receive, books }) => {
  const parseGetPrice = (strBooks) => {
    const arr = strBooks.split(/[^0-9]/);
    return parseInt(arr.filter((item) => item !== '')[0], 10);
  };
  const total = (parseGetPrice(books) * quantity * 1000).toLocaleString('de-DE');
  const receiving = receive === 'M1' ? 'M1: Miền Bắc- Miền Trung' : 'M2: Miền Nam';
  const description = `
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
  </div>`;
  return `${generalSectionTemplate(description)}`;
};

module.exports = {
  TemplateMail,
};
