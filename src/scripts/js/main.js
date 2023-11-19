import './ie10-viewport-bug-workaround.js'
import './jquery.min.js'
import './backstretch.min.js'
import './jquery.bxslider.js'
import './wow.min.js'
import './scrollTo.min.js'

const sliders = []

const updateSliderCaption = (index) => {
  const caption = $('.bxslider li:not(.bx-clone)').eq(index).data('caption')
  $('.slider .caption').text(caption)
}

const generateSliders = () => {
  $('.bxslider li').each(function (i) {
    $(this).backstretch($(this).attr('data-bg'))
  })

  const smSlider = $('.bxslider.sm').bxSlider({
    auto: $('.bxslider.sm li').length > 1,
    controls: false,
    keyboardEnabled: true,
    mode: 'horizontal',
    pager: true,
    pause: 40000,
    responsive: true,
    speed: 1000,
    onSliderLoad: (currentIndex) => {
      updateSliderCaption(currentIndex)
    },
    onSlideAfter: (slideElement, oldIndex, newIndex) => {
      updateSliderCaption(newIndex)
    }
  })

  sliders.push(smSlider)
}

const getCurrentYear = () => new Date().getFullYear()

$(function () {
  $('#current-year').text(getCurrentYear())
})

$(window).on('resize', () => {
  sliders.forEach((slider) => slider.reloadSlider())
})

$(window).on('load', () => {
  generateSliders()
})

const developer = {
  first_name: 'Jorman',
  last_name: 'Espinoza',
  email: 'espinoza.dev@gmail.com'
}

console.info({ developer })
