// Properties Data
const properties = [
  {
    id: 1,
    title: "COVA Home Realty",
    price: "$710,680",
    address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    beds: 3,
    baths: 2,
    sqft: 1430,
    image: "/images/property-1.jpg",
    badge: "New",
    gallery: [
      "/images/property-1.jpg",
      "/images/modern-kitchen.jpg",
      "/images/luxury-bathroom.jpg",
      "/images/bedroom-modern.jpg",
      "/images/living-room-luxury.jpg",
      "/images/garden-view.jpg",
    ],
    videos: [
      { src: "/videos/house-tour-1.mp4", title: "Virtual Tour" },
      { src: "/videos/house-tour-2.mp4", title: "Neighborhood Overview" },
    ],
  },
  {
    id: 2,
    title: "Exit Realty",
    price: "$630,440",
    address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
    beds: 5,
    baths: 2,
    sqft: 1680,
    image: "/images/property-2.jpg",
    badge: "Hot",
    gallery: [
      "/images/property-2.jpg",
      "/images/luxury-home-1.jpg",
      "/images/modern-kitchen.jpg",
      "/images/pool-area.jpg",
    ],
    videos: [{ src: "/videos/house-tour-1.mp4", title: "Property Walkthrough" }],
  },
  {
    id: 3,
    title: "Modern Villa Estate",
    price: "$850,000",
    address: "456 Oak Avenue, Beverly Hills, CA 90210",
    beds: 4,
    baths: 3,
    sqft: 2100,
    image: "/images/property-3.jpg",
    badge: "Luxury",
    gallery: [
      "/images/property-3.jpg",
      "/images/luxury-home-2.jpg",
      "/images/luxury-bathroom.jpg",
      "/images/bedroom-modern.jpg",
      "/images/pool-area.jpg",
      "/images/garden-view.jpg",
    ],
    videos: [
      { src: "/videos/house-tour-1.mp4", title: "Luxury Tour" },
      { src: "/videos/house-tour-2.mp4", title: "Amenities Overview" },
    ],
  },
  {
    id: 4,
    title: "Cozy Family Home",
    price: "$425,000",
    address: "789 Maple Street, Austin, TX 78701",
    beds: 3,
    baths: 2,
    sqft: 1250,
    image: "/images/property-4.jpg",
    badge: "Deal",
    gallery: [
      "/images/property-4.jpg",
      "/images/modern-kitchen.jpg",
      "/images/living-room-luxury.jpg",
      "/images/garden-view.jpg",
    ],
    videos: [{ src: "/videos/house-tour-1.mp4", title: "Family Home Tour" }],
  },
]

// State
let favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
let viewMode = "grid"
let currentProperty = null
let currentImageIndex = 0

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProperties()
  setupEventListeners()
})

// Render Properties
function renderProperties() {
  const grid = document.getElementById("propertiesGrid")
  grid.className = `properties-grid ${viewMode}-view`

  grid.innerHTML = properties
    .map(
      (property) => `
        <div class="property-card" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-badge">${property.badge}</div>
                <button class="property-favorite ${favorites.includes(property.id) ? "active" : ""}" 
                        onclick="toggleFavorite(event, ${property.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${favorites.includes(property.id) ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="property-info">
                <div class="property-price">${property.price}</div>
                <h3 class="property-title">${property.title}</h3>
                <p class="property-address">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${property.address}
                </p>
                <div class="property-features">
                    <div class="property-feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 17v-5h2v5h16v-5h2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path>
                            <path d="M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        ${property.beds} Bed
                    </div>
                    <div class="property-feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 0l-1 1a1.5 1.5 0 0 0 0 1L7 9"></path>
                            <path d="m15 5-1.367 1.367a1.5 1.5 0 0 0-.27.432l-1.886 4.25a1.5 1.5 0 0 0 .27 1.664l3.054 3.054a1.5 1.5 0 0 0 1.664.27l4.25-1.886a1.5 1.5 0 0 0 .432-.27L23 12"></path>
                            <path d="M9 18h6"></path>
                            <path d="M10 22v-4h4v4"></path>
                        </svg>
                        ${property.baths} Bath
                    </div>
                    <div class="property-feature">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        </svg>
                        ${property.sqft} sqft
                    </div>
                </div>
            </div>
            <div class="property-actions">
                <button class="btn btn-primary btn-block" onclick="openPropertyModal(${property.id})">
                    View Details
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Toggle Favorite
function toggleFavorite(event, id) {
  event.stopPropagation()

  if (favorites.includes(id)) {
    favorites = favorites.filter((fav) => fav !== id)
  } else {
    favorites.push(id)
  }

  localStorage.setItem("favorites", JSON.stringify(favorites))
  renderProperties()
}

// Open Property Modal
function openPropertyModal(id) {
  currentProperty = properties.find((p) => p.id === id)
  currentImageIndex = 0

  const modal = document.getElementById("propertyModal")
  const modalBody = document.getElementById("modalBody")

  modalBody.innerHTML = `
        <div class="image-gallery">
            <img src="${currentProperty.gallery[currentImageIndex]}" alt="${currentProperty.title}" class="gallery-main" id="galleryMain">
            <div class="gallery-thumbs">
                ${currentProperty.gallery
                  .map(
                    (img, index) => `
                    <img src="${img}" alt="Thumbnail ${index + 1}" class="gallery-thumb ${index === currentImageIndex ? "active" : ""}" 
                         onclick="changeGalleryImage(${index})">
                `,
                  )
                  .join("")}
            </div>
        </div>
        
        <div class="property-detail-grid">
            <div class="property-detail-info">
                <h2>${currentProperty.title}</h2>
                <div class="property-detail-price">${currentProperty.price}</div>
                <div class="property-detail-address">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    ${currentProperty.address}
                </div>
                
                <div class="property-detail-features">
                    <div class="property-detail-feature">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 17v-5h2v5h16v-5h2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path>
                            <path d="M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        ${currentProperty.beds} Bedrooms
                    </div>
                    <div class="property-detail-feature">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1 0l-1 1a1.5 1.5 0 0 0 0 1L7 9"></path>
                            <path d="m15 5-1.367 1.367a1.5 1.5 0 0 0-.27.432l-1.886 4.25a1.5 1.5 0 0 0 .27 1.664l3.054 3.054a1.5 1.5 0 0 0 1.664.27l4.25-1.886a1.5 1.5 0 0 0 .432-.27L23 12"></path>
                            <path d="M9 18h6"></path>
                            <path d="M10 22v-4h4v4"></path>
                        </svg>
                        ${currentProperty.baths} Bathrooms
                    </div>
                    <div class="property-detail-feature">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        </svg>
                        ${currentProperty.sqft} sqft
                    </div>
                </div>
                
                ${
                  currentProperty.videos && currentProperty.videos.length > 0
                    ? `
                    <div class="property-videos">
                        <h3 style="margin-bottom: 1rem;">Video Tours</h3>
                        ${currentProperty.videos
                          .map(
                            (video) => `
                            <div class="video-container" style="margin-bottom: 1rem;">
                                <video class="video-player" poster="${currentProperty.image}" controls>
                                    <source src="${video.src}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div class="video-title">${video.title}</div>
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
            </div>
            
            <div class="property-detail-actions">
                <button class="btn btn-primary btn-block btn-lg">Schedule a Tour</button>
                <button class="btn btn-outline btn-block btn-lg">Contact Agent</button>
                <button class="btn btn-outline btn-block btn-lg" onclick="toggleFavorite(event, ${currentProperty.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="${favorites.includes(currentProperty.id) ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    ${favorites.includes(currentProperty.id) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>
        </div>
    `

  modal.classList.add("active")
}

// Change Gallery Image
function changeGalleryImage(index) {
  currentImageIndex = index
  const mainImage = document.getElementById("galleryMain")
  mainImage.src = currentProperty.gallery[index]

  // Update thumbnails
  document.querySelectorAll(".gallery-thumb").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index)
  })
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  // View mode toggle
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
      viewMode = this.getAttribute("data-view")
      renderProperties()
    })
  })

  // Auth modal
  const loginBtn = document.getElementById("loginBtn")
  const registerBtn = document.getElementById("registerBtn")
  const authModal = document.getElementById("authModal")
  const authModalClose = document.getElementById("authModalClose")

  loginBtn.addEventListener("click", () => {
    authModal.classList.add("active")
    switchAuthTab("login")
  })

  registerBtn.addEventListener("click", () => {
    authModal.classList.add("active")
    switchAuthTab("register")
  })

  authModalClose.addEventListener("click", () => {
    authModal.classList.remove("active")
  })

  // Auth tabs
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      switchAuthTab(this.getAttribute("data-tab"))
    })
  })

  // Property modal close
  const modalClose = document.getElementById("modalClose")
  modalClose.addEventListener("click", () => {
    document.getElementById("propertyModal").classList.remove("active")
  })

  // Close modals on overlay click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", function () {
      this.parentElement.classList.remove("active")
    })
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header")
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)"
    }
  })
}

// Switch Auth Tab
function switchAuthTab(tab) {
  document.querySelectorAll(".auth-tab").forEach((t) => {
    t.classList.toggle("active", t.getAttribute("data-tab") === tab)
  })

  document.getElementById("loginForm").style.display = tab === "login" ? "block" : "none"
  document.getElementById("registerForm").style.display = tab === "register" ? "block" : "none"
}
