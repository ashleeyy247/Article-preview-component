document.addEventListener('DOMContentLoaded', initialize);

function initialize() { 
  const profileContainer = document.querySelector('.profile-container'); 
  const sharing = document.querySelector('.sharing');
  const shareIcons = document.querySelectorAll('.share');

  // Hide sharing by default for mobile
  sharing.style.display = 'none';

  shareIcons.forEach(icon => {
    icon.addEventListener('click', (e) => { 
      if (window.innerWidth < 660) {
        // Mobile: toggle block
        if (profileContainer.style.display !== 'none') {
          profileContainer.style.display = 'none';
          sharing.style.display = 'flex';
        } else {
          profileContainer.style.display = 'flex';
          sharing.style.display = 'none';
        }
      } else {
        // Desktop: show tooltip
        e.stopPropagation();
        let tooltip = document.querySelector('.share-tooltip');
        if (tooltip) {
          tooltip.remove();
          return;
        }
        
        document.body.appendChild(tooltip);

        // Position tooltip above the share icon
        const rect = icon.getBoundingClientRect();
        // tooltip.style.position = 'absolute';
        // tooltip.style.left = `${rect.left + window.scrollX - 40}px`;
        // tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 20}px`;
        // tooltip.style.background = 'hsl(217, 19%, 35%)';
        // tooltip.style.color = 'hsl(212, 23%, 69%)';

        // Remove tooltip on click outside
        document.addEventListener('click', function removeTooltip(ev) {
          if (!tooltip.contains(ev.target) && ev.target !== icon) {
            tooltip.remove();
            document.removeEventListener('click', removeTooltip);
          }
        });
      }
    });
  });
}