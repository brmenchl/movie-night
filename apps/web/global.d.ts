interface HSOverlay {
  open(element: HTMLElement): void;
  close(element: HTMLElement): void;
  on(event: 'close', cb: (HTMLElement) => void);
}

interface Window {
  HSOverlay: HSOverlay;
}
