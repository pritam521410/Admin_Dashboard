/**
 * Optimized Sidebar JavaScript
 * Handles sidebar functionality with modern ES6+ features and performance optimizations
 */

class SidebarManager {
  constructor() {
    this.sidebar = null;
    this.sidebarToggle = null;
    this.sidebarOverlay = null;
    this.currentPage = this.getCurrentPage();
    this.storageKey = "sidebarState";
    this.init();
  }

  /**
   * Initialize the sidebar
   */
  init() {
    this.cacheElements();
    this.setupEventListeners();
    this.restoreState();
    this.highlightCurrentPage();
    this.setupMobileHandling();
  }

  /**
   * Cache DOM elements for better performance
   */
  cacheElements() {
    this.sidebar = document.querySelector(".sidebar");
    this.sidebarToggle = document.getElementById("sidebarToggle");
    this.sidebarOverlay = document.getElementById("sidebarOverlay");
  }

  /**
   * Setup all event listeners using event delegation
   */
  setupEventListeners() {
    // Main sidebar navigation event delegation
    const sidebarNav = this.sidebar?.querySelector("nav");
    if (sidebarNav) {
      sidebarNav.addEventListener("click", this.handleNavClick.bind(this));
    }

    // Mobile sidebar toggle
    if (this.sidebarToggle) {
      this.sidebarToggle.addEventListener("click", this.openSidebar.bind(this));
    }

    // Mobile overlay close
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener(
        "click",
        this.closeSidebar.bind(this)
      );
    }

    // Handle submenu link clicks
    this.setupSubmenuLinkHandlers();

    // Handle dashboard link clicks
    this.setupDashboardHandler();

    // Keyboard navigation
    document.addEventListener("keydown", this.handleKeyboard.bind(this));
  }

  /**
   * Handle navigation clicks with event delegation
   */
  handleNavClick(event) {
    const menuBtn = event.target.closest(".menu-btn");
    if (!menuBtn) return;

    const menuItem = menuBtn.closest(".menu-item.has-submenu");
    if (!menuItem) return;

    this.toggleSubmenu(menuItem);
  }

  /**
   * Toggle submenu with smooth animations
   */
  toggleSubmenu(menuItem) {
    const submenu = menuItem.querySelector(".submenu");
    const chevron = menuItem.querySelector(".submenu-chevron");
    const isOpen = submenu.classList.contains("open");

    // Close all other submenus
    this.closeAllSubmenus(menuItem);

    // Toggle current submenu
    if (isOpen) {
      this.closeSubmenu(submenu, chevron);
    } else {
      this.openSubmenu(submenu, chevron);
    }

    // Save state
    this.saveState();
  }

  /**
   * Open submenu with animation
   */
  openSubmenu(submenu, chevron) {
    submenu.classList.add("open");
    if (chevron) {
      chevron.style.transform = "rotate(180deg)";
    }
  }

  /**
   * Close submenu with animation
   */
  closeSubmenu(submenu, chevron) {
    submenu.classList.remove("open");
    if (chevron) {
      chevron.style.transform = "rotate(0deg)";
    }
  }

  /**
   * Close all submenus except the specified one
   */
  closeAllSubmenus(exceptMenuItem = null) {
    const allSubmenus = document.querySelectorAll(".sidebar .submenu");
    const allChevrons = document.querySelectorAll(".sidebar .submenu-chevron");

    allSubmenus.forEach((submenu, index) => {
      const menuItem = submenu.closest(".menu-item");
      if (menuItem !== exceptMenuItem) {
        this.closeSubmenu(submenu, allChevrons[index]);
      }
    });
  }

  /**
   * Setup submenu link click handlers
   */
  setupSubmenuLinkHandlers() {
    const submenuLinks = document.querySelectorAll(".submenu li a");

    submenuLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleSubmenuLinkClick(e, link);
      });
    });
  }

  /**
   * Handle submenu link clicks
   */
  handleSubmenuLinkClick(event, link) {
    // Remove active from all submenu links
    document.querySelectorAll(".submenu li a").forEach((l) => {
      l.classList.remove("active");
      l.style.background = "";
      l.style.color = "";
    });

    // Add active to clicked link
    link.classList.add("active");
    link.style.background = "#2563eb";
    link.style.color = "#fff";

    // Store active state
    const href = link.getAttribute("href");
    if (href) {
      localStorage.setItem("lastActiveSubmenu", this.getFileName(href));
    }

    // Keep parent submenu open
    const parentSubmenu = link.closest(".submenu");
    if (parentSubmenu) {
      this.openSubmenu(
        parentSubmenu,
        parentSubmenu.parentElement.querySelector(".submenu-chevron")
      );
    }

    // Mobile: close sidebar after navigation
    if (window.innerWidth < 900) {
      this.closeSidebar();
    }

    // Visual feedback before navigation
    event.preventDefault();
    setTimeout(() => {
      window.location.href = href;
    }, 120);
  }

  /**
   * Setup dashboard link handler
   */
  setupDashboardHandler() {
    const dashboardLink = document.querySelector(
      '.sidebar a[href="dashboard.php"]'
    );
    if (dashboardLink) {
      dashboardLink.addEventListener("click", () => {
        this.closeAllSubmenus();
        this.saveState();
      });
    }
  }

  /**
   * Mobile sidebar handling
   */
  setupMobileHandling() {
    // Close sidebar on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900) {
        this.closeSidebar();
      }
    });

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && window.innerWidth < 900) {
        this.closeSidebar();
      }
    });
  }

  /**
   * Open mobile sidebar
   */
  openSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.add("open");
    }
    if (this.sidebarOverlay) {
      this.sidebarOverlay.classList.remove("hide");
    }
  }

  /**
   * Close mobile sidebar
   */
  closeSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.remove("open");
    }
    if (this.sidebarOverlay) {
      this.sidebarOverlay.classList.add("hide");
    }
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboard(event) {
    // Tab navigation within sidebar
    if (event.key === "Tab" && this.sidebar?.contains(document.activeElement)) {
      const focusableElements = this.sidebar.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Get current page name
   */
  getCurrentPage() {
    const path = window.location.pathname;
    return path
      .split("/")
      .pop()
      .replace(/\.(php|html)$/, "");
  }

  /**
   * Get filename from URL
   */
  getFileName(url) {
    if (!url) return "";
    return url.split("/").pop().split("?")[0].split("#")[0];
  }

  /**
   * Highlight current page in sidebar
   */
  highlightCurrentPage() {
    // Remove all active states
    document.querySelectorAll(".sidebar a, .submenu li a").forEach((link) => {
      link.classList.remove("active");
      link.style.background = "";
      link.style.color = "";
    });

    // Find and highlight current page
    const currentLink = document.querySelector(
      `.sidebar a[href*="${this.currentPage}"]`
    );
    if (currentLink) {
      currentLink.classList.add("active");
      currentLink.style.background = "#2563eb";
      currentLink.style.color = "#fff";

      // Open parent submenu if it's a submenu link
      const parentSubmenu = currentLink.closest(".submenu");
      if (parentSubmenu) {
        this.openSubmenu(
          parentSubmenu,
          parentSubmenu.parentElement.querySelector(".submenu-chevron")
        );
      }
    }

    // Restore last active submenu from localStorage
    this.restoreLastActiveSubmenu();
  }

  /**
   * Restore last active submenu from localStorage
   */
  restoreLastActiveSubmenu() {
    const lastActive = localStorage.getItem("lastActiveSubmenu");
    if (lastActive && this.currentPage !== "dashboard") {
      const submenuLink = document.querySelector(
        `.submenu li a[href*="${lastActive}"]`
      );
      if (submenuLink) {
        submenuLink.classList.add("active");
        submenuLink.style.background = "#2563eb";
        submenuLink.style.color = "#fff";

        const parentSubmenu = submenuLink.closest(".submenu");
        if (parentSubmenu) {
          this.openSubmenu(
            parentSubmenu,
            parentSubmenu.parentElement.querySelector(".submenu-chevron")
          );
        }
      }
    }
  }

  /**
   * Save sidebar state to localStorage
   */
  saveState() {
    const state = {
      openSubmenus: [],
      lastActiveSubmenu: localStorage.getItem("lastActiveSubmenu"),
    };

    document.querySelectorAll(".sidebar .submenu.open").forEach((submenu) => {
      const menuItem = submenu.closest(".menu-item");
      const label = menuItem.querySelector(".menu-label")?.textContent;
      if (label) {
        state.openSubmenus.push(label);
      }
    });

    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  /**
   * Restore sidebar state from localStorage
   */
  restoreState() {
    try {
      const savedState = localStorage.getItem(this.storageKey);
      if (savedState) {
        const state = JSON.parse(savedState);

        // Restore open submenus
        if (state.openSubmenus) {
          state.openSubmenus.forEach((label) => {
            const menuItem = document
              .querySelector(`.menu-label:contains("${label}")`)
              ?.closest(".menu-item");
            if (menuItem) {
              const submenu = menuItem.querySelector(".submenu");
              const chevron = menuItem.querySelector(".submenu-chevron");
              this.openSubmenu(submenu, chevron);
            }
          });
        }
      }
    } catch (error) {
      console.warn("Failed to restore sidebar state:", error);
    }
  }

  /**
   * Public method to refresh sidebar state
   */
  refresh() {
    this.highlightCurrentPage();
    this.saveState();
  }

  /**
   * Public method to reset sidebar state
   */
  reset() {
    this.closeAllSubmenus();
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem("lastActiveSubmenu");
  }
}

// Initialize sidebar when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.sidebarManager = new SidebarManager();
});

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = SidebarManager;
}
