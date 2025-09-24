import "@testing-library/jest-dom";

if (typeof (window as any).MutationObserver === "undefined") {
  class MockMutationObserver {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_callback: MutationCallback) {}
    disconnect() {}
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    observe(_target: Node, _options?: MutationObserverInit) {}
    takeRecords(): MutationRecord[] { return []; }
  }
  (window as any).MutationObserver = MockMutationObserver as unknown as typeof MutationObserver;
}

if (!document.getSelection) {
  (document as any).getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
    toString: () => "",
    anchorNode: null,
    focusNode: null,
    rangeCount: 0,
  });
}

if (!window.getSelection) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).getSelection = document.getSelection.bind(document);
}
