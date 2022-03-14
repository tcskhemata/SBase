/**
 * 
 * Lit Blog Post Styles
 * 
 **/

import { css } from 'https://cdn.skypack/dev/lit';

export const SkhemataTestimonialStyle = css`
  :host {
    display: block;
    
    --default-text-color: var(--skhemata-testimonial-text-color, rgb(100,100,100));
    --light-grey-color: #969ea2;
    --lighter-grey-color: #dce3e6;
    
    color: var(--default-text-color);
  }

  *,
  *::before,
  *::after {
    -webkit-box-sizing : border-box;
    box-sizing : border-box;
  }
  
  html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure, fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3, h4, h5, h6, strong, em {
    color: var(--default-text-color);
  }

  a {
    color: #3295dc;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }

  a:hover {
    color: #1c77b9;
  }


  .testimonials {
    max-width: 480px;
    margin: 0 auto;
    overflow: hidden;
  }

  .testimonials-carousel {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow-x: hidden;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    padding: 40px 10px;
  }

  .testimonials-carousel::-webkit-scrollbar {
    display: none;
  }
  
  .testimonial-item {
    scroll-snap-align: center;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    max-width: 480px;
    width: 100%;

  }
  
  .testimonials .flex-card {
    -webkit-box-shadow: none;
    box-shadow: 1px 2px 9px -1px #d9d9d9;
    background-color: var(--skhemata-testimonial-background-color, rgba(25, 118, 210, 0.05));
    border: 1px solid rgba(25, 118, 210, 0.1);
    height: 100%;
  }

  .testimonials .testimonial-avatar img {
    background: #ffffff;
    border: 1px solid rgba(25, 118, 210, 0.1);
  }

  @media (max-width: 768px) {
    .testimonial-item .testimonial-content p {
      padding: 20px !important;
    }
  }

  .testimonials {
    position: relative;
    width: 100%;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .testimonial-item {
    margin-right: 40px;
    outline: none !important;
  }

  .testimonial-item:last-child {
    margin-right: 0;
  }
  
  .testimonial-avatar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .testimonial-avatar-placeholder,
  .testimonial-avatar img {
    border-radius: 100px;
    width: 75px;
    height: 75px;
    position: relative;
    top: -40px;
  }

  .testimonial-name {
    text-align: center;
    font-weight: 900
  }

  .testimonial-name h3 {
    font-weight: bold;
    font-size: 18px;
    color: var(--skhemata-testimonial-title-color, rgb(68,79,86));
    position: relative;
    top: -20px;
  }

  .testimonial-name span {
    font-size: 14px;
    color: #A9ABAC;
    position: relative;
    top: -15px;
  }

  .testimonial-content {
    display:flex;
  }

  .testimonial-content .quote {
    font-size: 2rem;
    margin: 25px 10px 0 20px;
    color: #DCE2E6;

  }
  .avatar-placeholder {
    color: white;
    font-size: 2.5rem;
  }

  .testimonial-content p {
    padding: 20px 30px 20px 0;
    color: var(--default-text-color);
    line-height:1.3rem;
  }

  .testimonial-avatar-placeholder {
    background: #cccccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .testimonial-avatar-placeholder i.fa-icon {
    width: 40px;
    display: inline-block;
    color: #ffffff;
  }

  .testimonial-carousel-buttons {
    margin-top: 15px;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
  }
  
  .carousel-dots li {
    margin: 0 6px;
  }

  .carousel-dots li.is-active button {
    background-color: var(--skhemata-testimonial-dot-color-active, rgba(136, 136, 136, 1));
  }
  
  .carousel-dots button {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: var(--skhemata-testimonial-dot-color, rgba(136, 136, 136, 0.5));
    border-radius: 100%;
    border: none;
  }
`;
