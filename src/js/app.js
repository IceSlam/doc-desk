// Imports of styles
import '../scss/app.scss'

// JS files and code
// System
import './toggler'
import './scrolltop'

// UIKit
import './uikit'
import './uikit.icons'

(function() {
    'use strict';

    var scrollTopBtn = document.querySelector('.scroll-to-top');
    function topScroll() {
        let scrolled = window.pageYOffset;
        let coords = document.documentElement.clientHeight;

        if (scrolled > coords) {
            scrollTopBtn.classList.add('show');
        }
        if (scrolled < coords) {
            scrollTopBtn.classList.remove('show');
        }
    }

    function scrollToTop() {
        if (window.pageYOffset > 30) {
            window.scrollBy(0, -40);
            setTimeout(scrollToTop, 0);
        }
    }
    window.addEventListener('scroll', topScroll);
})();

