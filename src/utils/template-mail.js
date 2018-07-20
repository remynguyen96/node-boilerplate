const generalSectionTemplate = (description) => (`
<style>
.container {
    width: 600px;
    margin: 0 auto;
    text-align: center;
}
h1 {
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    padding: 8px 20px;
    background: #7cb32d;
}
h2 {
    text-transform: capitalize;
    color: #676161;
}
.logo {
    width: 100%;
    text-align: center;
}
.logo img {
    width: 100px;
    height: 100px;
}
p {
    font-weight: 600;
    color: #797979;
}
.btn {
    text-decoration: none;
    padding: 8px 24px;
    color: #ffffff;
    background: #36d26d;
    border-radius: 30px;
    margin: 2px 0;
    display: inline-block;
}
.notice {
    font-style: italic;
    font-weight: 400;
}
</style>
<div class="container">
    <div class="logo">
        <img src="http://relaxingmusic.website/wp-content/uploads/2015/10/Business-Logo-Meditation.png" alt="logo">
        <h1>Understanding Meditation</h1>
    </div>
    <section>${description}</section>
</div>
`);

export const ConfirmAccount = (name, url, token) => {
  const description = `
        <h2>Hi ${name} !</h2>
        <p>Before you go out and play on Website, please verify your email address.</p>
        <p>Why, you ask? Connecting with other readers and writers is a big part of the Website experience. We'll email you about interactions with other people on Website</p>
        <p>If you did not create a Website account using this address, please contact us at remy@gmail.com</p>
        <a href="${url}/${token}" class="btn">Verify your account</a>
        <p class="notice">This link will be valid the next 7 days</p>
    `;
  return `
        ${generalSectionTemplate(description)}
    `;
};
