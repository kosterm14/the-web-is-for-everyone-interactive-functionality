var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "none") {
            content.style.display = "flex";
        } else {
            content.style.display = "none";
        }
    });
}

const track = document.querySelector('.carousel-list')
const slides = Array.from(track.children)
const nextButton = document.querySelector('.carousel-button-right')
const prevButton = document.querySelector('.carousel-button-left')

const slideWidth = slides[0].getBoundingClientRect().width

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'
}

slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    currentSlide.classList.remove('current-slide')
    targetSlide.classList.add('current-slide')
}

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const prevSlide = currentSlide.previousElementSibling

    moveToSlide(track, currentSlide, prevSlide)
})

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide')
    const nextSlide = currentSlide.nextElementSibling

    moveToSlide(track, currentSlide, nextSlide)
})

function search() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("methodList");
    li = ul.getElementsByTagName('li');
    cat = document.getElementById('categories');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            cat.style.display = "";
        } else {
            li[i].style.display = "none";
            cat.style.display = "none";
        }
    }
}

function rotate() {
    var button = document.getElementById("button");
    button.classList.toggle("rotate");
}