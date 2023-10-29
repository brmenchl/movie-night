interface HSOverlay {
  close(element: HTMLElement): void;
}

interface Window {
  HSOverlay: HSOverlay;
}
