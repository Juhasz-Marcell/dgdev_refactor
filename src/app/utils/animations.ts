export function initializeAnimations(): void {
    // Blob movement animation
    function randomizeBorderRadius(): string {
      const minPercentage = 20;
      const maxPercentage = 80;
      return `${
        minPercentage +
        Math.floor(Math.random() * (maxPercentage - minPercentage))
      }%`;
    }
  
    function applyRandomBorderRadius(element: HTMLElement): void {
      const radii = Array.from({ length: 4 }, randomizeBorderRadius);
      const horizontalRadii = radii.join(' ');
      const verticalRadii = radii.map(randomizeBorderRadius).join(' ');
      const formattedRadius = `${horizontalRadii} / ${verticalRadii}`;
      element.style.borderRadius = formattedRadius;
    }
  
    const blobs = document.querySelectorAll<HTMLElement>(
      '.blob, .mail-blob, .package-blob, .aboutus-blob, .ref-blob'
    );
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('blob-active');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
  
    blobs.forEach((blob) => {
      observer.observe(blob);
    });
  
    blobs.forEach((blob) => {
      setInterval(() => {
        applyRandomBorderRadius(blob);
      }, 2700);
    });
  
    applyFadeEffect('.submit-button', 'submit-fade-effect');
    applyFadeEffect('.package-button', 'package-fade-effect');
    applyFadeEffect('.ws_package-button', 'ws_package-fade-effect');
    applyFadeEffect('.ws_premium-button', 'ws_premium-package-fade-effect');
    applyFadeEffect(
      '.premium-button',
      'package-premium-fade-effect',
      'scale(1.02)'
    );
    applyFadeEffect('.details-button', 'fade-effect');
  
    initializeCarousel();
    initializeCardScrollAnimations();
  
    // Function for carousel initialization
    function initializeCarousel() {
      const cards = document.querySelectorAll<HTMLElement>('.carousel__card');
      const leftControl = document.querySelector<HTMLElement>(
        '.carousel__control--left'
      );
      const rightControl = document.querySelector<HTMLElement>(
        '.carousel__control--right'
      );
  
      let currentMainIndex = 2; // Start with the third card as the main one
      let isRotating = false; // Flag to prevent spamming
  
      if (leftControl) {
        leftControl.addEventListener('click', () => {
          if (!isRotating) {
            console.log('Clicked on the left control.');
            updateCarousel(-1);
          }
        });
      }
  
      if (rightControl) {
        rightControl.addEventListener('click', () => {
          if (!isRotating) {
            console.log('Clicked on the right control.');
            updateCarousel(1);
          }
        });
      }
  
      function updateCarousel(step: number) {
        isRotating = true; // Set the flag to prevent spamming
        const totalCards = cards.length;
        currentMainIndex = (currentMainIndex + step + totalCards) % totalCards;
        // console.log(`Rotating carousel by ${step} steps.`);
        // console.log(`New main index is ${currentMainIndex}.`);
  
        const visibleIndices = Array.from(
          { length: 5 },
          (_, i) => (currentMainIndex + i - 2 + totalCards) % totalCards
        );
  
        const isSmallScreen375 = window.innerWidth <= 376;
        const isSmallScreen425 =
          window.innerWidth > 374 && window.innerWidth <= 426;
  
        const positions = isSmallScreen375
          ? [
              { x: -400, z: -250, scale: 0.75, zIndex: '1' }, // Positions for 375px
              { x: -200, z: -125, scale: 0.85, zIndex: '2' },
              { x: 0, z: 0, scale: 1, zIndex: '3' },
              { x: 200, z: -125, scale: 0.85, zIndex: '2' },
              { x: 400, z: -250, scale: 0.75, zIndex: '1' },
            ]
          : isSmallScreen425
          ? [
              { x: -450, z: -300, scale: 0.8, zIndex: '1' }, // Positions for 425px
              { x: -275, z: -150, scale: 0.9, zIndex: '2' },
              { x: 0, z: 0, scale: 1, zIndex: '3' },
              { x: 275, z: -150, scale: 0.9, zIndex: '2' },
              { x: 450, z: -300, scale: 0.8, zIndex: '1' },
            ]
          : [
              { x: -900, z: -400, scale: 0.9, zIndex: '1' }, // Default positions for larger screens
              { x: -550, z: -200, scale: 0.99, zIndex: '2' },
              { x: 0, z: 0, scale: 1, zIndex: '3' },
              { x: 550, z: -200, scale: 0.99, zIndex: '2' },
              { x: 900, z: -400, scale: 0.9, zIndex: '1' },
            ];
  
        // First, hide all cards and remove visible class
        cards.forEach((card) => {
          card.classList.add('hidden');
          card.classList.remove('visible');
          card.style.transform = `translateX(-2000px)`;
          card.style.transform = `scale(0.2)`;
        });
  
        // Then update positions and show visible cards
        cards.forEach((card, index) => {
          const visibleIndex = visibleIndices.indexOf(index);
          if (visibleIndex !== -1) {
            const position = positions[visibleIndex];
            card.style.transform = `translateX(${position.x}px) translateZ(${position.z}px) scale(${position.scale})`;
            card.style.zIndex = position.zIndex;
            card.classList.remove('hidden');
            card.classList.add('visible');
            // console.log(
            //   `Card ${index + 1} - X: ${position.x}, Z: ${position.z}, Scale: ${
            //     position.scale
            //   }, Z-Index: ${position.zIndex}`
            // );
          }
        });
  
        // Re-enable the controls after the transition
        setTimeout(() => {
          isRotating = false; // Reset the flag after the transition is complete
        }, 350); // Adjust the timeout to match the transition duration (500ms) plus some buffer
      }
  
      // Initialize the carousel
      updateCarousel(0);
    }
  
    // Function for card scroll animations
    function initializeCardScrollAnimations() {
      const packageCards =
        document.querySelectorAll<HTMLElement>('.package-card');
      const wsPackageCards =
        document.querySelectorAll<HTMLElement>('.ws_package-card');
      const servicesCards =
        document.querySelectorAll<HTMLElement>('.services-card');
  
      const createObserver = (
        cards: NodeListOf<HTMLElement>,
        rootMargin: string,
        delay: number
      ) => {
        const options = {
          root: null,
          rootMargin: rootMargin,
          threshold: 0.1,
        };
  
        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const card = entry.target as HTMLElement;
              const index = Array.from(cards).indexOf(card);
              setTimeout(() => {
                card.classList.add('animate');
              }, index * delay);
              observer.unobserve(card);
            }
          });
        }, options);
  
        cards.forEach((card) => observer.observe(card));
      };
  
      createObserver(packageCards, '0px 0px 50% 0px', 200);
      // createObserver(wsPackageCards, '0px 0px 25% 0px', 200);
      createObserver(servicesCards, '0px 0px 50% 0px', 200);
    }
  }
  
  export function InitializeNavBarFadeEffect() {
    applyFadeEffect('.nav-link', 'nav-link-fade-effect');
  }
  
  export function applyFadeEffect(
    buttonClass: string,
    fadeEffectClass: string,
    initialScale = 'scale(1)',
    activeClass = 'active' // Parameter for the active class
  ) {
    const buttons = document.querySelectorAll(buttonClass);
    let hasOpened = false; // Track whether the navbar has been opened once
  
    // Function to apply the fade effect
    const triggerFadeEffect = (button: Element, x?: number, y?: number) => {
      const existingEffect = button.querySelector(`.${fadeEffectClass}`);
      if (existingEffect) {
        existingEffect.remove();
      }
  
      const fadeEffect = document.createElement('div');
      fadeEffect.className = fadeEffectClass;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 3;
  
      fadeEffect.style.width = `${size}px`;
      fadeEffect.style.height = `${size}px`;
  
      // Apply effect based on cursor position if provided, otherwise center it (for active link)
      if (x !== undefined && y !== undefined) {
        fadeEffect.style.left = `${x - size / 2}px`;
        fadeEffect.style.top = `${y - size / 2}px`;
      } else {
        fadeEffect.style.left = `${rect.width / 2 - size / 2}px`;
        fadeEffect.style.top = `${rect.height / 2 - size / 2}px`;
      }
  
      button.appendChild(fadeEffect);
  
      setTimeout(() => {
        fadeEffect.style.transform = initialScale;
      }, 50);
    };
  
    // Function to handle fade out from the center
    const triggerFadeOutEffect = (button: Element) => {
      const fadeEffect = button.querySelector(
        `.${fadeEffectClass}`
      ) as HTMLElement;
      if (fadeEffect) {
        const rect = button.getBoundingClientRect();
        fadeEffect.style.left = `${
          rect.width / 2 - fadeEffect.offsetWidth / 2
        }px`;
        fadeEffect.style.top = `${
          rect.height / 2 - fadeEffect.offsetHeight / 2
        }px`;
        fadeEffect.style.transform = 'scale(0)'; // Shrink towards the center
  
        fadeEffect.addEventListener('transitionend', () => {
          fadeEffect.remove();
        });
      }
    };
  
    // Apply the fade effect to active buttons on page load
    window.addEventListener('DOMContentLoaded', () => {
      buttons.forEach((button) => {
        if (button.classList.contains(activeClass)) {
          // Trigger fade effect on page load for the active link
          triggerFadeEffect(button);
        }
      });
    });
  
    // Add listener for the Bootstrap navbar toggle event
    const navbar = document.querySelector('.navbar-collapse'); // Assuming your navbar has this class
    if (navbar) {
      navbar.addEventListener('shown.bs.collapse', () => {
        if (!hasOpened) {
          // Only apply the fade effect the first time the navbar is opened
          buttons.forEach((button) => {
            if (button.classList.contains(activeClass)) {
              triggerFadeEffect(button); // Trigger the fade effect only once
            }
          });
          hasOpened = true; // Mark that the navbar has been opened once
        }
      });
    }
  
    buttons.forEach((button) => {
      // MutationObserver to handle the removal of the active class
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            if (!button.classList.contains(activeClass)) {
              // Trigger the fade-out effect from the middle when the active class is removed
              triggerFadeOutEffect(button);
            } else {
              // Trigger fade effect again when the active class is added
              triggerFadeEffect(button);
            }
          }
        });
      });
  
      observer.observe(button, { attributes: true });
  
      // Helper function to check if the screen is larger than 1024px
      const isLargeScreen = () => window.innerWidth > 1024;
  
      // Set a timer for delay (only for large screens)
      let hoverDelayTimeout: number | undefined;
  
      button.addEventListener('mouseenter', (e) => {
        if (!isLargeScreen()) return;
  
        // Prevent retriggering the animation if the button is already active
        if (button.classList.contains(activeClass)) {
          return;
        }
  
        hoverDelayTimeout = window.setTimeout(() => {
          const existingEffect = button.querySelector(`.${fadeEffectClass}`);
          if (existingEffect) {
            existingEffect.remove();
          }
  
          const rect = button.getBoundingClientRect();
          const x = (e as MouseEvent).clientX - rect.left;
          const y = (e as MouseEvent).clientY - rect.top;
  
          triggerFadeEffect(button, x, y);
        }, 80); // 80ms delay for larger screens
      });
  
      button.addEventListener('mouseleave', (leaveEvent) => {
        if (hoverDelayTimeout) {
          clearTimeout(hoverDelayTimeout); // Cancel the delayed fade effect if mouse leaves quickly
        }
  
        const fadeEffect = button.querySelector(
          `.${fadeEffectClass}`
        ) as HTMLElement;
        if (fadeEffect && !button.classList.contains(activeClass)) {
          const rect = button.getBoundingClientRect();
          const leaveX = (leaveEvent as MouseEvent).clientX - rect.left;
          const leaveY = (leaveEvent as MouseEvent).clientY - rect.top;
  
          // Fade out based on cursor position
          fadeEffect.style.left = `${leaveX - fadeEffect.offsetWidth / 2}px`;
          fadeEffect.style.top = `${leaveY - fadeEffect.offsetHeight / 2}px`;
          fadeEffect.style.transform = 'scale(0)';
  
          fadeEffect.addEventListener('transitionend', () => {
            fadeEffect.remove();
          });
        }
      });
  
      // Touch event handlers for tap interactions (supporting tap on mobile)
      button.addEventListener('touchstart', (e) => {
        if (button.classList.contains(activeClass)) {
          return;
        }
  
        const existingEffect = button.querySelector(`.${fadeEffectClass}`);
        if (existingEffect) {
          existingEffect.remove();
        }
  
        const rect = button.getBoundingClientRect();
        const touch = (e as TouchEvent).touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
  
        triggerFadeEffect(button, x, y);
      });
  
      button.addEventListener('touchend', () => {
        const fadeEffect = button.querySelector(
          `.${fadeEffectClass}`
        ) as HTMLElement;
        if (fadeEffect && !button.classList.contains(activeClass)) {
          const rect = button.getBoundingClientRect();
  
          // Fade out towards the center for taps
          fadeEffect.style.left = `${
            rect.width / 2 - fadeEffect.offsetWidth / 2
          }px`;
          fadeEffect.style.top = `${
            rect.height / 2 - fadeEffect.offsetHeight / 2
          }px`;
          fadeEffect.style.transform = 'scale(0)';
  
          fadeEffect.addEventListener('transitionend', () => {
            fadeEffect.remove();
          });
        }
      });
    });
  }
  