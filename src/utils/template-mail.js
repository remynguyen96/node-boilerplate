const TemplateMail = ({ name, email, phone, address, quantity, receive, books }) => {
  const parseGetPrice = (strBooks) => {
    const arr = strBooks.split(/[^0-9]/);
    return parseInt(arr.filter((item) => item !== '')[0], 10);
  };
  const total = (parseGetPrice(books) * quantity * 1000).toLocaleString('de-DE');
  const receiving = receive === 'M1' ? 'M1: Miền Bắc- Miền Trung' : 'M2: Miền Nam';
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <title>Email Đăng Kí Mua Sách</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0; padding:10px 0 0 0;" bgcolor="#F8F8F8">
<table align="center" border="0" cellpadding="0" cellspacing="0" width="95%%">
  <tr>
    <td align="center">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600"
             style="border-collapse: separate; border-spacing: 2px 5px"
             bgcolor="#FFFFFF">
        <tr>
          <td align="center">
            <img src="../views/bg-mail-order.jpg" alt="Image Banner" style="display: block;border:0;" height="100%%" width="600"/>
          </td>
        </tr>
        <tr>
          <td bgcolor="#ffffff" style="padding: 20px 30px 40px 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%%">
              <tr>
                <td style="color: #1dd1a1; font-weight: 700; padding: 10px 0 10px 0; font-family: Avenir, sans-serif; font-size: 24px; text-align: center; line-height: 30px;">
                  Thông Tin Xác Nhận Đăng Kí Mua Sách
                </td>
              </tr>
              <tr>
                <td style="line-height: 28px; padding: 10px 0 10px 0; font-family: Avenir, sans-serif; font-size: 18px; text-align: center">
                  Xin chào <strong>${name}</strong>, bạn vui lòng xác nhận lại thông tin đăng kí mua sách bên dưới:
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td bgcolor="#F1F7F7">
            <table border="0" cellpadding="0" cellspacing="0" width="100%%" style="padding: 20px 10px 10px 10px;">
              <tr>
                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Tên
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${name}
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="font-size: 0; line-height: 0;" width="5">
                  &nbsp;
                </td>
                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Địa Chỉ
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${address}
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="font-size: 0; line-height: 0;" width="5">
                  &nbsp;
                </td>
                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Email
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${email}
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="font-size: 0; line-height: 0;" width="5">
                  &nbsp;
                </td>
                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Số Điện Thoại
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 95px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${phone}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr style="display: inline-block; padding-top: 15px;">
          <td bgcolor="#F1F7F7">
            <table border="0" cellpadding="0" cellspacing="0" width="100%%" style="padding: 20px 10px 10px 10px;">
              <tr>
                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Đăng Ký Nhận Sách
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 80px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${receiving}
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="font-size: 0; line-height: 0;" width="5">
                  &nbsp;
                </td>

                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Chọn Mua
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 80px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${books}
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="font-size: 0; line-height: 0;" width="5">
                  &nbsp;
                </td>

                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Số Lượng
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 80px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${quantity}
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="font-size: 0; line-height: 0;" width="5">
                  &nbsp;
                </td>

                <td width="150" valign="top" style="padding: 0 0 15px 0;">
                  <table border="1" cellpadding="0" cellspacing="0" width="100%%"  style="border-collapse: separate;">
                    <tr>
                      <td align="center" style="color:#414645;font-size: 14px; font-weight: 700;padding: 10px 0 0 0;">
                        Tổng Tiền
                      </td>
                    </tr>
                    <tr>
                      <td align="center"
                          style="height: 80px; color:#4d4d4d;font-size: 14px;padding: 10px 0 0 0;">
                        ${total} VNĐ
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
};

module.exports = {
  TemplateMail,
};

