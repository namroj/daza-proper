import './ie10-viewport-bug-workaround.js'
import './jquery.min.js'
import './backstretch.min.js'
import './jquery.bxslider.js'
import './wow.min.js'
import './scrollTo.min.js'

const sliders = []

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
    pause: 4000,
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

const getCurrentYear = () => new Date().getFullYear()

$(function () {
  $('#current-year').text(getCurrentYear())
})

$(window).on('resize', () => {
  sliders.forEach((slider) => slider.reloadSlider())
})

$(window).on('load', () => {
  $('#loader').delay(1000).fadeOut('slow')

  generateSliders()
})

const developer = {
  first_name: 'Jorman',
  last_name: 'Espinoza',
  email: 'espinoza.dev@gmail.com'
}

console.info({ developer })
