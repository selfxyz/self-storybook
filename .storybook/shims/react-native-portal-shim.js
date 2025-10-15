// Minimal web shim for React Native portal modules used by Tamagui
export const createPortal = (_children, containerTag) => {
  if (typeof document !== 'undefined') {
    const container =
      document.querySelector(`[data-react-root-tag="${containerTag}"]`) || document.body;
    const portalEl = document.createElement('div');
    container.appendChild(portalEl);
    // Note: We can't render here without ReactDOM; Tamagui falls back if null is returned
  }
  return null;
};

export default { createPortal };
