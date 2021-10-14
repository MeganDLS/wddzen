/*******************
		typography
	********************/
const heading = document.querySelector('#typography h1'),
  headingDescriptionText = heading.children[0],
  body = heading.nextElementSibling,
  bodyDescriptionText = body.children[0];

setTypography(heading, headingDescriptionText);
setTypography(body, bodyDescriptionText);
window.addEventListener('resize', function() {
  setTypography(heading, headingDescriptionText);
  setTypography(body, bodyDescriptionText);
});

function setTypography(element, textElement) {
  const cs = document.defaultView.getComputedStyle(element, null);
  let fontSize = Math.round(cs.fontSize.replace('px', '')) + 'px',
    fontFamily = cs.fontFamily
      .split(',')[0]
      .replace(/\'/g, '')
      .replace(/\"/g, ''),
    fontWeight = cs.fontWeight;
  textElement.innerText = fontWeight + ' ' + fontFamily + ' ' + fontSize;
}

/*******************
		main navigation
	********************/
const contentSections = document.querySelectorAll('main section');
//build navigation links
const mainNavElement = document.querySelector('.cd-main-nav');
mainNavElement.innerHTML = '';
contentSections.forEach(function(section) {
  let item = document.createElement('li');
  item.innerHTML = `<a href="#${section.id}">${
    section.children[0].innerHTML
  }</a>`;
  mainNavElement.appendChild(item);
});

// open navigation on mobile
document.querySelector('.cd-nav-trigger').addEventListener('click', function() {
  document.querySelector('header').classList.toggle('nav-is-visible');
});
// smooth scroll to the selected section
document.querySelectorAll('.cd-main-nav a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    const header = document.querySelector('header');
    header.classList.remove('nav-is-visible');
    const target = document.querySelector(this.hash),
      topMargin = document.defaultView
        .getComputedStyle(target, null)
        .marginTop.replace('px', ''),
      headerHeight = header.scrollHeight;
    scrollTo(
      document.body,
      parseInt(target.offsetTop - headerHeight - topMargin),
      200
    );
  });
});

function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  var difference = to - element.scrollTop;
  var perTick = (difference / duration) * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}

//update selected navigation element
window.addEventListener('scroll', function(event) {
  updateNavigation(event.target);
});

function updateNavigation() {
  contentSections.forEach(function(target) {
    const actual = target;
    const cs = document.defaultView.getComputedStyle(actual, null);
    const actualHeight = actual.height,
      topMargin = cs.marginTop.replace('px', ''),
      actualAnchor = document.querySelector(
        '.cd-main-nav a[href="#' + actual.id + '"]'
      );

    if (
      parseInt(
        actual.offsetTop -
          document.querySelector('.cd-main-nav').height -
          topMargin
      ) <= window.scrollY &&
      parseInt(actual.offsetTop + actualHeight - topMargin) > window.scrollY + 1
    ) {
      actualAnchor.classList.add('selected');
    } else {
      actualAnchor.classList.remove('selected');
    }
  });
}
