console.log("Hello World")

document.addEventListener("click", e => {
  let handle;
  if (e.target.matches(".carousel-controler-button")) {
    handle = e.target;
  } else {
    handle = e.target.closest(".carousel-controler-button");
  }
  if (handle != null) handleClick(handle);
})

setTimeout(() => {
  document.querySelectorAll(".carousel-progress").forEach(calculateProgressCarousel);
  console.log("pro", document.querySelectorAll(".carousel"))
}, 200);

function calculateProgressCarousel(progressCarousel) {
  console.log("bateu");
  progressCarousel.innerHTML = "";
  const slider = progressCarousel.closest(".carousel").querySelector(".carousel-slider");
  const itemsSlider = slider.children.length;
  const itemsPerPage = parseInt(getComputedStyle(document.body).getPropertyValue("--items-per-page"));
  const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
  const progressCarouselCount = Math.ceil(itemsSlider / itemsPerPage);
  if (sliderIndex >= progressCarouselCount) {
    slider.style.setProperty("--slider-index", progressCarouselCount - 1)
    sliderIndex = progressCarouselCount - 1
  }
  for(let i = 0; i < progressCarouselCount; i++) {
    const barItem = document.createElement("div");
    barItem.classList.add("progress-item");
    if(i === sliderIndex) {
      barItem.classList.add("active");
    }
    progressCarousel.append(barItem);
  }
}

function handleClick(handle) {
  const progress = handle.closest(".carousel").querySelector(".carousel-progress");
  const progressCarouselCount = progress.children.length
  const slider = handle.closest(".carousel-content").querySelector(".carousel-slider");
  const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
  if(handle.classList.contains("carousel-button-prev")) {
    if(sliderIndex - 1 < 0) {
      slider.style.setProperty("--slider-index", progressCarouselCount - 1);
      progress.children[sliderIndex].classList.remove("active");
      progress.children[progressCarouselCount - 1].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex - 1);
      progress.children[sliderIndex].classList.remove("active");
      progress.children[sliderIndex - 1].classList.add("active");
    }
  } else if(handle.classList.contains("carousel-button-next")) {
    if(sliderIndex + 1 >= progressCarouselCount) {
      slider.style.setProperty("--slider-index", 0);
      progress.children[sliderIndex].classList.remove("active");
      progress.children[0].classList.add("active");
    } else {
      slider.style.setProperty("--slider-index", sliderIndex + 1);
      progress.children[sliderIndex].classList.remove("active");
      progress.children[sliderIndex + 1].classList.add("active");
    }
  }
}
