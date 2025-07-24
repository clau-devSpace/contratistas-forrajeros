
export const handleAnimations = () => {
  const animateItems = document.querySelectorAll('.animate-item'); 

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 
  };

  const observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => { 
      if (entry.isIntersecting) { 
        const animationClass = entry.target.getAttribute('data-animation');
        
        entry.target.style.opacity = 1; 
        entry.target.classList.add('animate__animated', animationClass);

        observer.unobserve(entry.target);
      } 
    }); 
  }, options); 

  animateItems.forEach(item => {
    observer.observe(item);
  });
}; 