import './ie10-viewport-bug-workaround.js';
import './jquery.min.js';
import './wow.min.js';
import './scrollTo.min.js';
import './slick.min.js';

const getCurrentYear = () => new Date().getFullYear()

$(function () {
  $('#current-year').text(getCurrentYear())
})

const developer = {
  first_name: 'Jorman',
  last_name: 'Espinoza',
  email: 'espinoza.dev@gmail.com'
}

console.info({ developer })
