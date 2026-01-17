// jQuery Ready Function
$(document).ready(function() {
    console.log('Website loaded successfully!');
    
    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Active navigation highlight
    $('.nav-link').on('click', function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();

            if (contactForm.checkValidity()) {
                // Show success toast
                showSuccessToast();
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');
            } else {
                contactForm.classList.add('was-validated');
            }
        });
    }

    // Gallery hover effects with jQuery
    $('.gallery-item').hover(
        function() {
            $(this).find('.gallery-info').css('background-color', '#f8f9fa');
        },
        function() {
            $(this).find('.gallery-info').css('background-color', 'white');
        }
    );

    // Service card animation on scroll
    $(window).on('scroll', function() {
        $('.service-card').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > elementTop) {
                $(this).addClass('animate__animated animate__fadeInUp');
            }
        });
    });

    // Counter animation for stats
    $('.stat-card h3').each(function() {
        var $this = $(this);
        var countTo = parseInt($this.text().replace(/\D/g, ''));
        
        $({ countNum: 0 }).animate({
            countNum: countTo
        }, {
            duration: 2000,
            easing: 'linear',
            step: function() {
                var suffix = $this.text().match(/[^\d]+$/);
                $this.text(Math.floor(this.countNum) + (suffix ? suffix[0] : ''));
            },
            complete: function() {
                var suffix = $this.text().match(/[^\d]+$/);
                $this.text(this.countNum + (suffix ? suffix[0] : ''));
            }
        });
    });
});

// Modal function
function showModal() {
    var modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
    modal.show();
}

// Toast functions
function showToastTop() {
    var toastEl = document.getElementById('toastTop');
    var toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000
    });
    toast.show();
}

function showToastBottom() {
    var toastEl = document.getElementById('toastBottom');
    var toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000
    });
    toast.show();
}

function showSuccessToast() {
    // Create success toast for form submission
    var toastHTML = `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="successToast" class="toast" role="alert">
                <div class="toast-header bg-success text-white">
                    <i class="fas fa-check-circle me-2"></i>
                    <strong class="me-auto">نجاح</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                </div>
            </div>
        </div>
    `;
    
    $('body').append(toastHTML);
    var toastEl = document.getElementById('successToast');
    var toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 4000
    });
    toast.show();
    
    // Remove toast element after hiding
    setTimeout(function() {
        $('#successToast').parent().remove();
    }, 5000);
}

// AJAX example for Modal
function loadModalContent() {
    $.ajax({
        url: 'modal-content.html',
        method: 'GET',
        success: function(data) {
            $('#welcomeModal .modal-body').html(data);
        },
        error: function() {
            console.log('Error loading modal content');
        }
    });
}

// Navbar scroll effect
$(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
        $('.navbar').addClass('scrolled');
    } else {
        $('.navbar').removeClass('scrolled');
    }
});

// Add smooth animations to elements
function addAnimation() {
    $('.feature-card').each(function(index) {
        $(this).css({
            'animation-delay': (index * 0.1) + 's',
            'animation': 'fadeInUp 0.6s ease forwards'
        });
    });
}

// Initialize tooltips (Bootstrap 5)
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Search functionality
function searchGallery(query) {
    $('.gallery-item').each(function() {
        var title = $(this).find('h4').text().toLowerCase();
        if (title.includes(query.toLowerCase())) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// Image lazy loading simulation
$(window).on('load', function() {
    $('.gallery-image').each(function() {
        $(this).addClass('loaded');
    });
});

// Prevent default form submission for demo
$('form').on('submit', function(e) {
    e.preventDefault();
});

// Dynamic year in footer
$('.footer-section p').html(function(i, html) {
    return html.replace('2024', new Date().getFullYear());
});

console.log('All scripts loaded successfully! 🎨');