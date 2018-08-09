const fetchUrl = (url, method, body = null) => {
  const urlServer = `http://localhost:4500/api/${url}`;
  switch (method) {
    case 'post':
    case 'patch':
    case 'put':
    case 'delete':
      return fetch(urlServer, {
        method,
        body: JSON.stringify(body),
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }).then((response) => response.json()).catch((error) => {
        console.error(error, 'Fetch data error !');
      });
    case 'get':
    default:
      return fetch(urlServer, {
        method,
      }).then((response) => response.json()).catch((error) => {
        console.error(error, 'Fetch data error !');
      });
  }
};
const validate = (field) => new Promise((resolve, reject) => {
  const { value } = field;
  if (!value || value === null || value === '') {
    reject(Error('Field is required'));
  }
  resolve(true);
});

const renderTemplate = (post) => (`
<div class="single-products-catagory clearfix">
    <a href="posts/${post.slug}">
      <img src="img/product-img/${post.images}" alt="${post.title}">
      <div class="hover-content">
        <div class="line"></div>
        <p>From ${post.id}</p>
        <h4>${post.title}</h4>
      </div>
    </a>
   </div>
`);

const homepage = async () => {
  try {
    const posts = await fetchUrl('posts', 'get');
    console.log(posts, 'posts');
    const domPosts = document.querySelector('.amado-pro-catagory.clearfix');
    posts.forEach((post) => {
      domPosts.insertAdjacentHTML('beforeend', renderTemplate(post));
    });
  } catch (err) {
    console.error(err, 'error');
  }
};

const email = document.getElementById('email');
const password = document.getElementById('password');
const signup = async () => {
  const name = document.getElementById('name');
  const confirm = document.getElementById('confirm-password');
  const intro = document.getElementById('intro');
  const formSignup = document.getElementById('form-signup');
  const validatePass = () => {
    const { value } = password;
    const { value: valueConfirm } = confirm;
    if (valueConfirm !== value) {
      return confirm.setCustomValidity('Passwords Don\'t Match');
    }
    return confirm.setCustomValidity('');
  };
  password.onchange = validatePass;
  confirm.onkeyup = validatePass;
  formSignup.onsubmit = async (e) => {
    e.preventDefault();
    try {
      await validate(name);
      await validate(email);
      await validate(password);
      await validate(confirm);
      const signUp = await fetchUrl('users/sign-up', 'post', {
        name: name.value,
        email: email.value,
        password: password.value,
        passClient: confirm.value,
        intro: intro.value,
      });
      console.log(signUp, 'signUp');
    } catch (err) {
      console.error(err, 'error');
    }
  };
};
const login = async () => {
  const formLogin = document.getElementById('form-login');
  formLogin.onsubmit = async (e) => {
    e.preventDefault();
    try {
      const loginPage = await fetchUrl('users/sign-in', 'post', {
        email: email.value,
        password: password.value,
      });
      console.log(loginPage, 'loginPage');
    } catch (err) {
      console.error(err, 'error');
    }
  };
};

function checkPage() {
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      return homepage();
    case '/sign-up':
      return signup();
    case '/login':
      return login();
    default:
      return homepage();
  }
}
window.onload = checkPage;
