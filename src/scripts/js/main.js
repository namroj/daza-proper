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
