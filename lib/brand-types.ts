export type Brand = {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  assets: {
    icon: string;
    background: string;
  };
  /**
   * Raw column data keyed by the exact column title.
   * Used for filters and future feature work.
   */
  columns: Record<string, string>;
};
