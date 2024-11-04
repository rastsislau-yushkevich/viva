class BgScroll {
  constructor(element) {
    this.element = element;
    this.sections = this.element.querySelectorAll('section');
    this.observeSection = this.observeSection.bind(this);
    this.init();
  }

  observeSection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.element.style.backgroundColor = '';
      }
      this.element.style.backgroundColor = entry.className;
    });
  }  

  init() {
    const observer = new IntersectionObserver(this.observeSection, { rootMargin: '-50% 0% -50% 0%' });
    this.sections.forEach(section => {
      observer.observe(section);
    });
  }
}

// Init BgScroll
const el = document.querySelector('[data-bg-scroll]');
new BgScroll(el);