import './ie10-viewport-bug-workaround.js'
import './jquery.min.js'
import './backstretch.min.js'
import './jquery.bxslider.js'
import './wow.min.js'
import './scrollTo.min.js'
import './validate.js'

let screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width
let headerHeight
const sm = 767
const sliders = []

const getWindowUpset = () => (screenWidth <= sm ? 0 : -99)

const goToHash = () => {
  const hashValue = window.location.hash
  if (!hashValue) return

  const section = $(hashValue)
  $(window).scrollTo(section, 1000, {
    offset: getWindowUpset()
  })
}

const onScroll = () => {
  const navHeight = $('nav').height()
  const scrollPosition = $(document).scrollTop() + navHeight
  headerHeight = $('header').height()

  if (screenWidth <= sm) {
    $(window).scrollTop() > headerHeight
      ? $('nav:not(.visible) .toggler').addClass('scrolled')
      : $('.toggler').removeClass('scrolled')
  }

  $('nav ul li a').each(function () {
    const href = $(this).attr('href')
    if (!href) {
      return
    }

    const section = $(this).attr('href')
    const refElement = $(section)

    if (
      refElement.position().top <= scrollPosition &&
      refElement.position().top + refElement.height() > scrollPosition
    ) {
      $('nav ul li a').removeClass('active')
      $(this).addClass('active')
      return
    }

    $(this).removeClass('active')
  })
}

const buildMenu = () => {
  $('.toggler').on('click', function () {
    $(this).toggleClass('clicked')
    $('body').toggleClass('no-scroll')
    $('nav').toggleClass('visible')
    $('.wa').toggle()
    $('footer').toggle()

    if ($('nav').hasClass('visible')) {
      $(this).removeClass('scrolled')
    }

    if (!$(this).hasClass('clicked')) {
      if (screenWidth <= sm) {
        $(window).scrollTop() > headerHeight
          ? $('.toggler').addClass('scrolled')
          : $('.toggler').removeClass('scrolled')
      }
    }
  })

  $('nav ul li a, .go-to').on('touchstart click', function () {
    if (screenWidth <= sm) {
      setTimeout(function () {
        $('.btn-menu-close').trigger('click')
      }, 250)
    }

    const section = $($(this).attr('href'))
    if (!section) {
      return
    }

    if (screenWidth <= sm) {
      $(window).scrollTo(section, 1000, {
        offset: 0
      })
      setTimeout(() => {
        $('nav').removeClass('visible')
        $('.toggler').toggleClass('clicked')
      }, 500)
      return
    }

    $(window).scrollTo(section, 1000, {
      offset: getWindowUpset()
    })
  })
}

const updateSliderCaption = (index, container, device) => {
  const caption = $(`#unidades .bxslider.${device} li:not(.bx-clone)`)
    .eq(index)
    .data('caption')

  $(`${container} .slider.${device} .caption`).text(caption)
}

const buildSlider = (config) => {
  const { container, device, isCaptionEnabled } = config

  return $(`${container} .bxslider.${device}`).bxSlider({
    auto: $(`${container} .bxslider.${device} li`).length > 1,
    controls: false,
    keyboardEnabled: true,
    mode: 'horizontal',
    pager: true,
    pause: 5000,
    responsive: true,
    speed: 1000,
    onSliderLoad: (currentIndex) => {
      if (!isCaptionEnabled) return
      updateSliderCaption(currentIndex, container, device)
    },
    onSlideAfter: (slideElement, oldIndex, newIndex) => {
      if (!isCaptionEnabled) return
      updateSliderCaption(newIndex, container, device)
    }
  })
}

const generateSliders = () => {
  $('.bxslider li').each(function (i) {
    $(this).backstretch($(this).attr('data-bg'))
  })

  const headerSmSlider = buildSlider({
    container: 'header',
    device: 'sm',
    isCaptionEnabled: false
  })

  const headerMdSlider = buildSlider({
    container: 'header',
    device: 'md',
    isCaptionEnabled: false
  })

  const unitsSmSlider = buildSlider({
    container: '#unidades',
    device: 'sm',
    isCaptionEnabled: true
  })

  const unitsMdSlider = buildSlider({
    container: '#unidades',
    device: 'md',
    isCaptionEnabled: true
  })

  sliders.push(headerSmSlider, headerMdSlider, unitsSmSlider, unitsMdSlider)
}

const buildForm = () => {
  $('form').validate({
    rules: {
      first_name: {
        required: true
      },
      last_name: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true
      },
      query: {
        required: true
      }
    },
    errorClass: 'error',
    errorPlacement: function (error, element) {
      $(element).prev().children().text(error[0].innerText)
    },
    success: function (label, element) {
      $(element).prev().children().text('')
    },
    submitHandler: function (form) {
      $('form button').text('Enviando...')
      const firstName = $('form [name="first_name"]').val()
      const lastName = $('form [name="last_name"]').val()
      const email = $('form [name="email"]').val()
      const phone = $('form [name="phone"]').val()
      const message = $('form [name="message"]').val()

      const data = `first_name=${firstName}&last_name=${lastName}&email=${email}&phone=${phone}&message=${message}`

      $.ajax({
        type: 'POST',
        url: `https://dazarealestate.com/proper-test/src/scripts/php/mailing.php`,
        data: data,
        dataType: 'json',
        success: function (response) {
          const { status, msg } = response

          $('form').hide()
          $('.response').show()
          $('.response').text(msg)

          if (status === 'OK') {
            $('form')[0].reset()
          }

          setTimeout(function () {
            $('form button').text('Enviar')
            $('.response').text('')
            $('.response').hide()
            $('form').show()
          }, 4000)
        }
      })

      return false
    }
  })
}

const setCurrentYear = () => {
  $('#current-year').text(new Date().getFullYear())
}

$(function () {
  $(document).on('scroll', onScroll)
  goToHash()
  buildMenu()
  buildForm()
  setCurrentYear()
})

$(window).on('resize', () => {
  setTimeout(function () {
    screenWidth = window.innerWidth > 0 ? window.innerWidth : screen.width
    if (screenWidth <= sm) {
      $('nav').removeClass('scrolled')
      $('nav').removeClass('visible')
    }
  }, 500)

  sliders.forEach((slider) => slider.reloadSlider())
})

$(window).on('load', () => {
  $('#loader').delay(1000).fadeOut('slow')
  onScroll()
  generateSliders()
})

const developer = {
  first_name: 'Jorman',
  last_name: 'Espinoza',
  email: 'espinoza.dev@gmail.com'
}

console.info({ developer })
