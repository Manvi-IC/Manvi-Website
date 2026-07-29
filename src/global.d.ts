declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      behavior?: string;
      direction?: string;
      scrollamount?: string | number;
    };
  }
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export {};
