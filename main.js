document.addEventListener('DOMContentLoaded', initialize);

function initialize() { 
  const profileContainer = document.querySelector('.profile-container'); 
  const sharing = document.querySelector('.sharing');
  const shareIcons = document.querySelectorAll('.share');
  const tooltip = document.querySelector('.share-tooltip');
  
  const sharingShareIcon = document.querySelector('.profile-container > .share img');
  const shareIconBorder = document.querySelector('.profile-container > .share');

  // Hide by default
  sharing.style.display = 'none';
  tooltip.style.display = 'none'; 
  sharingShareIcon.style.filter = '';

  // Track manual click state
  let tooltipLocked = false;

  shareIcons.forEach(icon => {

    // --- CLICK handler ---
    icon.addEventListener('click', (e) => { 
      e.stopPropagation();

      if (window.innerWidth < 750) { 
        // --- Mobile mode ---
        sharingShareIcon.style.filter = '';
        tooltip.style.display = 'none';
        tooltipLocked = false;

        if (profileContainer.style.display !== 'none') {
          profileContainer.style.display = 'none';
          sharing.style.display = 'flex';
        } else {
          profileContainer.style.display = 'flex';
          sharing.style.display = 'none';
        }

      } else {
        // --- Desktop mode ---
        profileContainer.style.display = 'flex';
        sharing.style.display = 'none';

        if (tooltip.style.display !== 'none') {
          hideTooltip();
          tooltipLocked = false;
        } else {
          showTooltip();
          tooltipLocked = true; // prevent hover from changing state
        }
      }
    });

    // --- HOVER handlers (desktop only) ---
    icon.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 750 && !tooltipLocked) {
        showTooltip();
      }
    });

    icon.addEventListener('mouseleave', () => {
      if (window.innerWidth >= 750 && !tooltipLocked) {
        hideTooltip();
      }
    });
  });

  // --- Helper functions ---
  function showTooltip() {
    tooltip.style.display = 'flex';
    shareIconBorder.style.backgroundColor = 'hsl(217, 19%, 35%)';
    sharingShareIcon.style.filter = 'brightness(0) invert(1)';
  }

  function hideTooltip() {
    tooltip.style.display = 'none';
    shareIconBorder.style.backgroundColor = '';
    sharingShareIcon.style.filter = '';
  }

  // --- Reset on window resize ---
  window.addEventListener('resize', () => {
    tooltipLocked = false;
    shareIconBorder.style.backgroundColor = '';
    sharingShareIcon.style.filter = '';
    tooltip.style.display = 'none';
    sharing.style.display = 'none';
    profileContainer.style.display = 'flex';
  });

  // --- Click outside to close tooltip (desktop only) ---
  document.addEventListener('click', (e) => {
    if (window.innerWidth >= 750 && tooltipLocked) {
      const inside = e.target.closest('.share') || e.target.closest('.share-tooltip');
      if (!inside) {
        hideTooltip();
        tooltipLocked = false;
      }
    }
  });
}
