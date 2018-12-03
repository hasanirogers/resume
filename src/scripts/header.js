const fixedHeader = () => {
  const header = document.querySelector('.header');
  const social = document.querySelector('me-social');
  const fixedPoint = 72; // header.offsetTop;

  if (window.pageYOffset > fixedPoint) {
    header.classList.add('header--fixed');
    social.setAttribute('fixed', true);
  } else {
    header.classList.remove('header--fixed');
    social.removeAttribute('fixed');
  }
}

window.onload = fixedHeader;
window.onscroll = fixedHeader;
