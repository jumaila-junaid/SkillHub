/**
 * ============================================================================
 * SkillHub — Smart Learning & Course Discovery Platform
 * Client-Side JavaScript (js/script.js) — Version 2.0 Refinement
 * Clean, Modular, Vanilla JavaScript (ES6+)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. LocalStorage Bookmark / Save Course System
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'skillhub_saved_courses';

  /**
   * Retrieves saved course IDs array from localStorage
   * @returns {string[]} Array of saved course IDs
   */
  const getSavedCourses = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('LocalStorage access issue:', e);
      return [];
    }
  };

  /**
   * Persists saved course IDs array into localStorage
   * @param {string[]} courses Array of course IDs
   */
  const setSavedCourses = (courses) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    } catch (e) {
      console.warn('LocalStorage save issue:', e);
    }
  };

  const savedCountBadge = document.getElementById('savedCountBadge');
  const bookmarkButtons = document.querySelectorAll('.btn-course-bookmark');

  /**
   * Updates all bookmark button icons and the saved count badge
   */
  const refreshBookmarkUI = () => {
    const saved = getSavedCourses();

    if (savedCountBadge) {
      savedCountBadge.textContent = saved.length;
    }

    bookmarkButtons.forEach(btn => {
      const courseId = btn.getAttribute('data-course-id');
      const isBookmarked = saved.includes(courseId);

      if (isBookmarked) {
        btn.classList.add('is-bookmarked');
        btn.innerHTML = '<i class="bi bi-bookmark-fill" aria-hidden="true"></i>';
        btn.setAttribute('aria-label', 'Remove from saved courses');
        btn.setAttribute('title', 'Saved Course');
      } else {
        btn.classList.remove('is-bookmarked');
        btn.innerHTML = '<i class="bi bi-bookmark" aria-hidden="true"></i>';
        btn.setAttribute('aria-label', 'Save course');
        btn.setAttribute('title', 'Save Course');
      }
    });
  };

  /**
   * Toggles a course's saved state
   * @param {string} courseId The ID of the course
   */
  const toggleBookmark = (courseId) => {
    let saved = getSavedCourses();
    if (saved.includes(courseId)) {
      saved = saved.filter(id => id !== courseId);
    } else {
      saved.push(courseId);
    }
    setSavedCourses(saved);
    refreshBookmarkUI();

    // If currently viewing the "Saved" category tab, re-filter the list
    if (currentCategory === 'saved') {
      filterCourses();
    }
  };

  // Attach event listener to bookmark buttons
  bookmarkButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const courseId = btn.getAttribute('data-course-id');
      if (courseId) {
        toggleBookmark(courseId);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 2. Navbar Scroll Effect & Mobile Collapse Handling
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('mainNavbar');
  const navCollapse = document.getElementById('navbarContent');
  const navLinks = document.querySelectorAll('.sh-navbar .nav-link');

  // Add subtle shadow when page is scrolled down
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // Automatically close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Active Navigation Link Highlighting on Scroll (ScrollSpy effect)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightCurrentSection = () => {
    const scrollPos = window.scrollY + 130;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightCurrentSection, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Course Discovery: Live Search & Category Filter
  // --------------------------------------------------------------------------
  const searchInput = document.getElementById('courseSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const courseItems = document.querySelectorAll('.course-item');
  const courseCountDisplay = document.getElementById('courseCountDisplay');
  const activeFilterDesc = document.getElementById('activeFilterDesc');
  const quickResetFilterBtn = document.getElementById('quickResetFilterBtn');
  const noCoursesFound = document.getElementById('noCoursesFound');
  const resetFilterBtn = document.getElementById('resetFilterBtn');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  /**
   * Formats a user-friendly label for the current filter state
   */
  const updateFilterDescription = (visibleCount) => {
    let desc = '';
    const hasSearch = currentSearchQuery.length > 0;
    const hasCategory = currentCategory !== 'all';

    if (hasSearch && hasCategory) {
      if (currentCategory === 'saved') {
        desc = `in Saved matching "${currentSearchQuery}"`;
      } else {
        const catBtn = document.querySelector(`.filter-btn[data-filter="${currentCategory}"]`);
        const catName = catBtn ? catBtn.textContent.trim() : currentCategory;
        desc = `in ${catName} matching "${currentSearchQuery}"`;
      }
    } else if (hasSearch) {
      desc = `matching "${currentSearchQuery}"`;
    } else if (hasCategory) {
      if (currentCategory === 'saved') {
        desc = `in Saved Courses`;
      } else {
        const catBtn = document.querySelector(`.filter-btn[data-filter="${currentCategory}"]`);
        const catName = catBtn ? catBtn.textContent.trim() : currentCategory;
        desc = `in ${catName}`;
      }
    }

    if (activeFilterDesc) {
      activeFilterDesc.textContent = desc;
    }

    // Toggle quick reset button in status bar
    if (quickResetFilterBtn) {
      if (hasSearch || hasCategory) {
        quickResetFilterBtn.classList.remove('d-none');
      } else {
        quickResetFilterBtn.classList.add('d-none');
      }
    }
  };

  /**
   * Evaluates each course against current category and search keyword
   */
  const filterCourses = () => {
    let visibleCount = 0;
    const savedCourses = getSavedCourses();

    courseItems.forEach(item => {
      const itemCourseId = item.getAttribute('data-course-id') || '';
      const itemCategory = (item.getAttribute('data-category') || '').toLowerCase();
      const itemCategoryClean = itemCategory.replace(/-/g, ' ');
      const itemCategoryBadge = (item.querySelector('.course-category-badge')?.textContent || '').toLowerCase();
      const itemTitle = (item.querySelector('.course-title')?.textContent || '').toLowerCase();
      const itemDesc = (item.querySelector('.course-desc')?.textContent || '').toLowerCase();

      // Check category match (including 'saved' category filter)
      let matchesCategory = false;
      if (currentCategory === 'all') {
        matchesCategory = true;
      } else if (currentCategory === 'saved') {
        matchesCategory = savedCourses.includes(itemCourseId);
      } else {
        matchesCategory = (itemCategory === currentCategory);
      }

      // Check search query match (title, description, or category)
      const descMatches = currentSearchQuery.length <= 2
        ? new RegExp(`\\b${currentSearchQuery}\\b`, 'i').test(itemDesc)
        : itemDesc.includes(currentSearchQuery);

      const matchesSearch = !currentSearchQuery || 
                            itemTitle.includes(currentSearchQuery) || 
                            descMatches ||
                            itemCategory.includes(currentSearchQuery) ||
                            itemCategoryClean.includes(currentSearchQuery) ||
                            itemCategoryBadge.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    // Update count display
    if (courseCountDisplay) {
      courseCountDisplay.textContent = visibleCount;
    }

    updateFilterDescription(visibleCount);

    // Toggle empty state message
    if (noCoursesFound) {
      if (visibleCount === 0) {
        noCoursesFound.style.display = 'block';
      } else {
        noCoursesFound.style.display = 'none';
      }
    }
  };

  // Search input live typing event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      
      // Show or hide clear button
      if (searchClearBtn) {
        searchClearBtn.style.display = currentSearchQuery.length > 0 ? 'block' : 'none';
      }

      filterCourses();
    });

    // Enter-key handler: explicitly runs filterCourses() without reloading or form submission
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        currentSearchQuery = searchInput.value.trim().toLowerCase();
        
        if (searchClearBtn) {
          searchClearBtn.style.display = currentSearchQuery.length > 0 ? 'block' : 'none';
        }

        filterCourses();
      }
    });
  }

  // Clear search input button
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearchQuery = '';
        searchInput.focus();
      }
      searchClearBtn.style.display = 'none';
      filterCourses();
    });
  }

  /**
   * Resets active category filter to 'all' while preserving current search text
   */
  const resetCategoryToAll = () => {
    if (currentCategory === 'all') return;

    currentCategory = 'all';
    filterButtons.forEach(b => b.classList.remove('active'));
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) {
      allBtn.classList.add('active');
    }

    filterCourses();
  };

  // Category filter button click (with toggle-to-All on second click)
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const clickedCategory = (btn.getAttribute('data-filter') || 'all').toLowerCase();

      if (clickedCategory === currentCategory && clickedCategory !== 'all') {
        // Clicking the currently active category filter again resets to 'All'
        resetCategoryToAll();
      } else {
        // Activating a different filter or clicking 'All'
        currentCategory = clickedCategory;
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterCourses();
      }
    });
  });

  // Empty page area click listener: resets category filter to 'All' without refreshing the page
  document.addEventListener('click', (e) => {
    // Only active when a specific category is selected
    if (currentCategory === 'all') {
      return;
    }

    // Do NOT reset when clicking on buttons, links, search input, course cards, nav, forms, or modals
    const isInteractiveOrContent = e.target.closest(
      'button, a, input, select, textarea, label, [role="button"], ' +
      '.filter-buttons-wrapper, .filter-btn, ' +
      '.search-box-wrapper, #courseSearchInput, #searchClearBtn, ' +
      '.course-card, .course-item, .btn-course-bookmark, .btn-course-details, ' +
      '.navbar, nav, header, ' +
      'form, .contact-form-card, .contact-info-card, ' +
      '.modal, .modal-dialog, .modal-content, ' +
      '.category-card, .why-card, .about-badge-card, .about-quote-box'
    );

    if (isInteractiveOrContent) {
      return;
    }

    // Genuinely empty page / background area clicked: reset category to 'All' immediately
    resetCategoryToAll();
  });

  /**
   * Resets all search and filter conditions back to default
   */
  const resetAllFilters = () => {
    currentCategory = 'all';
    currentSearchQuery = '';

    if (searchInput) {
      searchInput.value = '';
    }
    if (searchClearBtn) {
      searchClearBtn.style.display = 'none';
    }

    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === 'all') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    filterCourses();
  };

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', resetAllFilters);
  }

  if (quickResetFilterBtn) {
    quickResetFilterBtn.addEventListener('click', resetAllFilters);
  }

  // Connect "Learning Categories" cards to auto-select filter in Discovery section
  const categoryExploreLinks = document.querySelectorAll('[data-select-category]');
  categoryExploreLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetCategory = link.getAttribute('data-select-category');
      if (!targetCategory) return;

      const matchingFilterBtn = document.querySelector(`.filter-btn[data-filter="${targetCategory}"]`);
      if (matchingFilterBtn) {
        filterButtons.forEach(b => b.classList.remove('active'));
        matchingFilterBtn.classList.add('active');
        currentCategory = targetCategory.toLowerCase();
        filterCourses();
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Course Details Modal Dynamic Content Binding & Inquiry Flow
  // --------------------------------------------------------------------------
  const courseDetailModal = document.getElementById('courseDetailModal');
  const modalInquireBtn = document.getElementById('modalInquireBtn');
  let currentModalCategory = '';

  if (courseDetailModal) {
    courseDetailModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (!button) return;

      const title = button.getAttribute('data-title') || 'Course Details';
      const category = button.getAttribute('data-category') || 'Technology';
      const desc = button.getAttribute('data-desc') || '';
      const level = button.getAttribute('data-level') || 'All Levels';
      const duration = button.getAttribute('data-duration') || 'Self-Paced';
      const rating = button.getAttribute('data-rating') || '4.8 / 5.0';
      const modulesRaw = button.getAttribute('data-modules') || '';

      currentModalCategory = category;

      // Populate modal fields
      document.getElementById('modalCourseTitle').textContent = title;
      document.getElementById('modalCourseCategory').textContent = category;
      document.getElementById('modalCourseDesc').textContent = desc;
      document.getElementById('modalCourseLevel').textContent = level;
      document.getElementById('modalCourseDuration').textContent = duration;
      document.getElementById('modalCourseRating').textContent = rating;

      // Populate modules list
      const modulesContainer = document.getElementById('modalCourseModules');
      modulesContainer.innerHTML = '';

      if (modulesRaw) {
        const modulesList = modulesRaw.split(',').map(m => m.trim());
        modulesList.forEach((modText, idx) => {
          const li = document.createElement('li');
          li.className = 'list-group-item d-flex align-items-center gap-2 px-0 py-2';
          li.innerHTML = `
            <span class="badge bg-light text-primary border">${idx + 1}</span>
            <span class="small text-dark fw-medium">${modText}</span>
          `;
          modulesContainer.appendChild(li);
        });
      }
    });

    // Inquire action in modal: Closes modal and smoothly scrolls to contact form
    if (modalInquireBtn) {
      modalInquireBtn.addEventListener('click', () => {
        const bsModal = bootstrap.Modal.getInstance(courseDetailModal);
        if (bsModal) {
          bsModal.hide();
        }

        // Pre-select category in contact form
        const categorySelect = document.getElementById('interestedCategory');
        if (categorySelect && currentModalCategory) {
          for (let i = 0; i < categorySelect.options.length; i++) {
            if (categorySelect.options[i].text.toLowerCase().includes(currentModalCategory.toLowerCase())) {
              categorySelect.selectedIndex = i;
              categorySelect.classList.remove('is-invalid');
              break;
            }
          }
        }

        // Smooth scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          setTimeout(() => {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            const messageInput = document.getElementById('messageText');
            if (messageInput) {
              messageInput.focus();
            }
          }, 350);
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. Contact / Join Form Validation & Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const fullName = document.getElementById('fullName');
      const email = document.getElementById('emailAddress');
      const category = document.getElementById('interestedCategory');
      const message = document.getElementById('messageText');

      let isValid = true;

      // Validate Full Name
      if (!fullName.value.trim()) {
        fullName.classList.add('is-invalid');
        isValid = false;
      } else {
        fullName.classList.remove('is-invalid');
        fullName.classList.add('is-valid');
      }

      // Validate Email (Standard pattern check)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
      } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
      }

      // Validate Category
      if (!category.value) {
        category.classList.add('is-invalid');
        isValid = false;
      } else {
        category.classList.remove('is-invalid');
        category.classList.add('is-valid');
      }

      // Validate Message (Min 10 characters)
      if (!message.value.trim() || message.value.trim().length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
      } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
      }

      // If form is valid, show success message and reset form
      if (isValid) {
        if (formSuccessAlert) {
          formSuccessAlert.classList.remove('d-none');
          formSuccessAlert.classList.add('d-flex');
        }

        contactForm.reset();
        
        // Clear validation classes
        [fullName, email, category, message].forEach(el => {
          el.classList.remove('is-valid');
          el.classList.remove('is-invalid');
        });

        // Hide success alert after 6 seconds
        setTimeout(() => {
          if (formSuccessAlert) {
            formSuccessAlert.classList.add('d-none');
            formSuccessAlert.classList.remove('d-flex');
          }
        }, 6000);
      }
    });

    // Remove invalid class on input
    ['fullName', 'emailAddress', 'interestedCategory', 'messageText'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) {
            input.classList.remove('is-invalid');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Initial State Initialization
  // --------------------------------------------------------------------------
  refreshBookmarkUI();
  filterCourses();

});
