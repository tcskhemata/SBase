/**
 *
 * Testimonial component
 *
 * */
import { SkhemataBase, html, property, CSSResult } from '@skhemata/skhemata-base';

// Import custom style elements

// Import element dependencies
import { stringToHtml } from '@skhemata/skhemata-base/dist/directives/stringToHtml.js';

// Import Icon
import { faUser, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@riovir/wc-fontawesome';
import { SkhemataTestimonialStyle } from './style/SkhemataTestimonialStyle';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
export class SkhemataTestimonial extends SkhemataBase {
  // Component specific properties
  @property({ type: Number, attribute: 'interval' })
  carouselInterval = 5000;

  @property({ type: Number, attribute: 'active-testimonial' })
  activeTestimonial = 0;

  static get scopedElements() {
    return {
      'fa-icon': FontAwesomeIcon,
    };
  }

  static get styles() {
    return <CSSResult[]>[...super.styles, SkhemataTestimonialStyle];
  }

  async firstUpdated() {
    await super.firstUpdated();
    if (this.configData?.length && this.carouselInterval > 0) {
      setInterval(() => {
        this.activeTestimonial =
          (this.activeTestimonial + 1) % this.configData.length;
        this.makeActive(`#slide-${this.activeTestimonial}`);
      }, this.carouselInterval);
    }
  }

  /**
   * Click function for carousel dots
   * */
  handleCarouselDotClick = (event: any) => {
    event.preventDefault();
    const elementId = event.target.value;
    this.makeActive(elementId);
  };

  /**
   * Make a testimonial active
   */
  makeActive = (elementId: any) => {
    this.activeTestimonial = parseInt(
      elementId.substring(elementId.length - 1, elementId.length),
      10
    );

    if (this.shadowRoot) {
      const selectedElement = this.shadowRoot.querySelector(elementId);
      const carouselElement = this.shadowRoot.querySelector(
        '.testimonials-carousel'
      );
      if (carouselElement !== null) {
        carouselElement.scroll(
          carouselElement.clientWidth * this.activeTestimonial,
          0
        );
      }

      // Add/remove class from slide elements

      const carouselItems =
        this.shadowRoot.querySelectorAll('.testimonial-item');
      for (let index = 0; index < carouselItems.length; index += 1) {
        if (carouselItems[index].classList.contains('is-active')) {
          carouselItems[index].classList.remove('is-active');
        }
      }

      selectedElement.classList.add('is-active');

      // Add/remove class from dot navigation
      const carouselDots =
        this.shadowRoot.querySelectorAll('.carousel-dots li');
      for (let index = 0; index < carouselDots.length; index += 1) {
        // Remove is-active from all elements
        if (index === this.activeTestimonial) {
          carouselDots[index].classList.add('is-active');
        } else if (carouselDots[index].classList.contains('is-active')) {
          carouselDots[index].classList.remove('is-active');
        }
      }

      // selectedElement.parentNode.classList.add('is-active');
    }
  };

  /**
   * Template for carousel items
   * */
  carouselItem = (testimonials: any = []) => html`
    <div class="testimonials-carousel">
      ${testimonials.map(
        (testimonial: any, index: number) => html`
          <div
            class="testimonial-item ${index === 0 ? 'is-active' : ''}"
            id="slide-${index}"
          >
            <div class="flex-card card-overflow raised">
              <div class="testimonial-avatar">
                ${testimonial.avatar
                  ? html`
                      <img
                        src="${testimonial.avatar}"
                        alt="${testimonial.name}"
                      />
                    `
                  : html`
                      <div class="testimonial-avatar-placeholder">
                        <fa-icon
                          class="avatar-placeholder"
                          .icon=${faUser}
                        ></fa-icon>
                      </div>
                    `}
              </div>
              <div class="testimonial-name">
                <h3 class="title is-4">${testimonial.name}</h3>
              </div>
              <div class="testimonial-content">
                <fa-icon class="quote" .icon=${faQuoteLeft}></fa-icon>
                ${stringToHtml(testimonial.comment)}
              </div>
            </div>
          </div>
        `
      )}
    </div>
  `;

  /**
   * Template for carousel dots
   * */
  carouselDots = (data: any = []) => html`
    <ul class="carousel-dots">
      ${data.map(
        (_data: any, index: number) => html`
          <li class="${index === 0 ? 'is-active' : ''}">
            <button
              value="#slide-${index}"
              @click=${this.handleCarouselDotClick}
            ></button>
          </li>
        `
      )}
    </u>
  `;

  render() {
    return html`
      <div class="testimonials">
          ${this.carouselItem(this.configData)}
        </div>
        
        <div class="testimonial-carousel-buttons">
          ${this.carouselDots(this.configData)}
        </div>
      </div>
    `;
  }
}
