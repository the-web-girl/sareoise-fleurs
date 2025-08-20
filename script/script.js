/**
 * SAREOISE FLEURS - JavaScript Complet
 * Fonctionnalités interactives et accessibilité
 */

// ===================================
// VARIABLES GLOBALES
// ===================================

// Données des compositions florales
const compositions = {
    1: {
        title: "Bouquet Romance",
        description: "Élégante composition de roses et pivoines dans des tons pastel",
        price: "45€",
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop&crop=center",
        flowers: ["Roses David Austin", "Pivoines blanches", "Eucalyptus", "Gypsophile"],
        deliveryTime: "24-48h",
        category: "bouquets"
    },
    2: {
        title: "Centre de Table Mariage",
        description: "Composition sophistiquée pour tables de réception",
        price: "75€",
        image: "https://images.unsplash.com/photo-1606218057992-b00d2e8b9def?w=400&h=300&fit=crop&crop=center",
        flowers: ["Roses blanches", "Lisianthus", "Eucalyptus", "Verdure saisonnière"],
        deliveryTime: "3-5 jours",
        category: "mariage"
    },
    3: {
        title: "Arrangement Saisonnier",
        description: "Création évolutive selon les fleurs de saison",
        price: "35€",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
        flowers: ["Fleurs de saison", "Feuillages locaux", "Branches décoratives"],
        deliveryTime: "24h",
        category: "saison"
    },
    4: {
        title: "Bouquet Champêtre",
        description: "Composition rustique avec fleurs des champs",
        price: "40€",
        image: "https://images.unsplash.com/photo-1566057634493-5b1c1db3e6bb?w=400&h=300&fit=crop&crop=center",
        flowers: ["Marguerites", "Bleuets", "Graminées", "Lavande"],
        deliveryTime: "48h",
        category: "bouquets"
    },
    5: {
        title: "Arche Florale",
        description: "Décoration majestueuse pour cérémonie",
        price: "250€",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&crop=center",
        flowers: ["Roses grimpantes", "Pivoines", "Eucalyptus", "Verdure structurée"],
        deliveryTime: "1 semaine",
        category: "evenements"
    },
    6: {
        title: "Couronne Moderne",
        description: "Décoration contemporaine pour intérieur",
        price: "55€",
        image: "https://images.unsplash.com/photo-1512838243191-db33068c2b34?w=400&h=300&fit=crop&crop=center",
        flowers: ["Eucalyptus", "Magnolia", "Branches de bouleau", "Mousses"],
        deliveryTime: "72h",
        category: "saison"
    }
};

// ===================================
// UTILITAIRES
// ===================================

/**
 * Utilitaire de debounce pour optimiser les performances
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utilitaire pour animer l'apparition des éléments
 */
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .value-card, .event-card, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

/**
 * Utilitaire pour gérer les paramètres URL
 */
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// ===================================
// NAVIGATION MOBILE
// ===================================

class MobileNavigation {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.navToggle || !this.navMenu) return;
        
        // Toggle menu
        this.navToggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Fermer le menu en cliquant sur un lien
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Fermer le menu avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
        
        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        const isOpen = this.navMenu.classList.contains('active');
        
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.navMenu.classList.add('active');
        this.navToggle.setAttribute('aria-expanded', 'true');
        
        // Focus sur le premier lien
        const firstLink = this.navMenu.querySelector('.nav-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
        }
        
        // Empêcher le scroll
        document.body.style.overflow = 'hidden';
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        
        // Restaurer le scroll
        document.body.style.overflow = '';
    }
}

// ===================================
// GALERIE ET MODAL
// ===================================

class Gallery {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.galleryButtons = document.querySelectorAll('.gallery-btn');
        this.modal = document.getElementById('composition-modal');
        this.modalOverlay = document.querySelector('.modal-overlay');
        this.modalClose = document.querySelector('.modal-close');
        
        this.init();
    }
    
    init() {
        // Filtres
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilter(e.target.dataset.filter);
                this.updateActiveFilter(e.target);
            });
        });
        
        // Ouverture modal
        this.galleryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const galleryItem = e.target.closest('.gallery-item');
                const compositionId = galleryItem.dataset.id;
                this.openModal(compositionId);
            });
        });
        
        // Fermeture modal
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', () => this.closeModal());
        }
        
        // Fermeture modal avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    handleFilter(filter) {
        this.galleryItems.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'tous' || category === filter) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    if (item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    }
    
    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }
    
    openModal(compositionId) {
        const composition = compositions[compositionId];
        if (!composition || !this.modal) return;
        
        // Remplir le contenu du modal
        this.populateModal(composition);
        
        // Afficher le modal
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        
        // Focus sur le bouton de fermeture
        setTimeout(() => {
            if (this.modalClose) {
                this.modalClose.focus();
            }
        }, 100);
        
        // Empêcher le scroll
        document.body.style.overflow = 'hidden';
    }
    
    populateModal(composition) {
        const modalTitle = document.getElementById('modal-title');
        const modalImg = document.getElementById('modal-img');
        const modalDescription = document.getElementById('modal-description');
        const modalFlowers = document.getElementById('modal-flowers');
        const modalDelivery = document.getElementById('modal-delivery');
        const modalPriceValue = document.getElementById('modal-price-value');
        
        if (modalTitle) modalTitle.textContent = composition.title;
        if (modalImg) {
            modalImg.src = composition.image;
            modalImg.alt = composition.title;
        }
        if (modalDescription) modalDescription.textContent = composition.description;
        if (modalDelivery) modalDelivery.textContent = `Délai : ${composition.deliveryTime}`;
        if (modalPriceValue) modalPriceValue.textContent = composition.price;
        
        // Fleurs
        if (modalFlowers) {
            modalFlowers.innerHTML = '';
            composition.flowers.forEach(flower => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = flower;
                modalFlowers.appendChild(tag);
            });
        }
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        
        // Restaurer le scroll
        document.body.style.overflow = '';
    }
}

// ===================================
// FORMULAIRE DE CONTACT
// ===================================

class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.fields = {
            nom: document.getElementById('nom'),
            prenom: document.getElementById('prenom'),
            email: document.getElementById('email'),
            telephone: document.getElementById('telephone'),
            evenement: document.getElementById('evenement'),
            message: document.getElementById('message'),
            confidentialite: document.getElementById('confidentialite')
        };
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        // Préremplir le formulaire selon les paramètres URL
        this.prefillForm();
        
        // Validation en temps réel
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldName));
                field.addEventListener('input', debounce(() => this.validateField(fieldName), 300));
            }
        });
        
        // Soumission du formulaire
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    prefillForm() {
        // Préremplir selon les paramètres URL
        const eventParam = getURLParameter('event');
        if (eventParam && this.fields.evenement) {
            this.fields.evenement.value = eventParam;
        }
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (!field || !errorElement) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Validation selon le type de champ
        switch (fieldName) {
            case 'nom':
            case 'prenom':
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage = 'Ce champ est obligatoire';
                } else if (field.value.trim().length < 2) {
                    isValid = false;
                    errorMessage = 'Minimum 2 caractères';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage = 'L\'email est obligatoire';
                } else if (!emailRegex.test(field.value)) {
                    isValid = false;
                    errorMessage = 'Format d\'email invalide';
                }
                break;
                
            case 'telephone':
                const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
                if (field.value.trim() && !phoneRegex.test(field.value)) {
                    isValid = false;
                    errorMessage = 'Format de téléphone invalide';
                }
                break;
                
            case 'message':
                if (!field.value.trim()) {
                    isValid = false;
                    errorMessage = 'Le message est obligatoire';
                } else if (field.value.trim().length < 10) {
                    isValid = false;
                    errorMessage = 'Minimum 10 caractères';
                }
                break;
                
            case 'confidentialite':
                if (!field.checked) {
                    isValid = false;
                    errorMessage = 'Vous devez accepter les conditions';
                }
                break;
        }
        
        // Mise à jour de l'affichage
        this.updateFieldValidation(field, errorElement, isValid, errorMessage);
        
        return isValid;
    }
    
    updateFieldValidation(field, errorElement, isValid, errorMessage) {
        if (isValid) {
            field.classList.remove('invalid');
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        } else {
            field.classList.add('invalid');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }
    
    handleSubmit() {
        // Valider tous les champs
        let formIsValid = true;
        const requiredFields = ['nom', 'prenom', 'email', 'message', 'confidentialite'];
        
        requiredFields.forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                formIsValid = false;
            }
        });
        
        // Valider les champs optionnels s'ils sont remplis
        if (this.fields.telephone.value.trim()) {
            if (!this.validateField('telephone')) {
                formIsValid = false;
            }
        }
        
        if (formIsValid) {
            // Soumettre le formulaire
            this.submitForm();
        } else {
            // Focus sur le premier champ invalide
            const firstInvalidField = this.form.querySelector('.invalid');
            if (firstInvalidField) {
                firstInvalidField.focus();
                firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
    
    async submitForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Indicateur de chargement
        submitButton.innerHTML = '<span class="btn-icon">⏳</span> Envoi en cours...';
        submitButton.disabled = true;
        
        try {
            // Le formulaire se soumet naturellement avec FormSubmit
            this.form.submit();
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            
            // Restaurer le bouton
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Afficher un message d'erreur
            this.showNotification('Une erreur s\'est produite. Veuillez réessayer.', 'error');
        }
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--color-secondary)' : 'hsl(0, 70%, 70%)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-elegant);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScroll = 0;
        
        this.init();
    }
    
    init() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', debounce(() => {
            this.handleScroll();
        }, 10));
    }
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Effet de transparence
        if (currentScroll > 50) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.navbar.style.boxShadow = 'var(--shadow-soft)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            this.navbar.style.boxShadow = 'none';
        }
        
        this.lastScroll = currentScroll;
    }
}

// ===================================
// SMOOTH SCROLL POUR LES ANCRES
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// LAZY LOADING IMAGES
// ===================================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===================================
// ACCESSIBILITÉ - NAVIGATION CLAVIER
// ===================================

class KeyboardNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Améliorer la navigation au clavier pour les éléments interactifs
        document.addEventListener('keydown', (e) => {
            // Échapper des modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    const closeButton = activeModal.querySelector('.modal-close');
                    if (closeButton) {
                        closeButton.click();
                    }
                }
            }
            
            // Navigation dans les filtres avec les flèches
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const activeElement = document.activeElement;
                if (activeElement.classList.contains('filter-btn')) {
                    e.preventDefault();
                    this.navigateFilters(activeElement, e.key === 'ArrowRight');
                }
            }
        });
        
        // Améliorer l'accessibilité des cartes de galerie
        document.querySelectorAll('.gallery-card').forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Voir les détails de la composition ${index + 1}`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const galleryBtn = card.querySelector('.gallery-btn');
                    if (galleryBtn) {
                        galleryBtn.click();
                    }
                }
            });
        });
    }
    
    navigateFilters(currentFilter, moveRight) {
        const filters = Array.from(document.querySelectorAll('.filter-btn'));
        const currentIndex = filters.indexOf(currentFilter);
        let nextIndex;
        
        if (moveRight) {
            nextIndex = (currentIndex + 1) % filters.length;
        } else {
            nextIndex = currentIndex === 0 ? filters.length - 1 : currentIndex - 1;
        }
        
        filters[nextIndex].focus();
    }
}

// ===================================
// NOTIFICATIONS TOAST
// ===================================

class ToastManager {
    constructor() {
        this.container = null;
        this.createContainer();
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        this.container.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(this.container);
    }
    
    show(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            background: ${this.getBackgroundColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-elegant);
            transform: translateX(100%);
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        this.container.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Suppression automatique
        setTimeout(() => {
            this.remove(toast);
        }, duration);
        
        return toast;
    }
    
    remove(toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    getBackgroundColor(type) {
        switch (type) {
            case 'success':
                return 'var(--color-secondary)';
            case 'error':
                return 'hsl(0, 70%, 60%)';
            case 'warning':
                return 'hsl(45, 90%, 60%)';
            default:
                return 'var(--color-primary)';
        }
    }
}

// ===================================
// INITIALISATION GLOBALE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier que tous les éléments de base sont chargés
    console.log('🌸 Sareoise Fleurs - Initialisation...');
    
    try {
        // Initialiser les composants principaux
        new MobileNavigation();
        new NavbarScroll();
        new KeyboardNavigation();
        
        // Initialiser la galerie si on est sur la page galerie
        if (document.querySelector('.gallery-grid')) {
            new Gallery();
        }
        
        // Initialiser le formulaire si on est sur la page contact
        if (document.querySelector('.contact-form')) {
            new ContactForm();
        }
        
        // Initialiser le toast manager globalement
        window.toastManager = new ToastManager();
        
        // Fonctionnalités générales
        initSmoothScroll();
        initLazyLoading();
        
        // Animation au scroll
        setTimeout(animateOnScroll, 100);
        
        console.log('✅ Sareoise Fleurs - Initialisation terminée');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
    }
});

// ===================================
// SERVICE WORKER (pour PWA futur)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Pour une future implémentation PWA
        console.log('🔧 Service Worker prêt pour implémentation future');
    });
}

// ===================================
// ANALYTICS ET PERFORMANCE
// ===================================

// Mesure des performances
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            // Log des métriques importantes
            if (entry.entryType === 'navigation') {
                console.log(`📊 Temps de chargement: ${entry.loadEventEnd - entry.loadEventStart}ms`);
            }
        }
    });
    
    observer.observe({ entryTypes: ['navigation'] });
}

// ===================================
// GESTION D'ERREURS GLOBALE
// ===================================

window.addEventListener('error', (e) => {
    console.error('🚨 Erreur JavaScript:', e.error);
    
    // En production, vous pourriez envoyer ces erreurs à un service de monitoring
    // comme Sentry, LogRocket, etc.
});

// Gestion des promesses rejetées
window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Promesse rejetée:', e.reason);
});

// ===================================
// EXPORTS POUR USAGE EXTERNE
// ===================================

// Exposer certaines fonctionnalités globalement si nécessaire
window.SareoiseFleurs = {
    Gallery,
    ContactForm,
    MobileNavigation,
    ToastManager,
    compositions
};