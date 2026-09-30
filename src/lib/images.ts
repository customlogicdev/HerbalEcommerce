/**
 * Build an optimized Pexels image URL for a given photo id.
 * Docs: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg
 */
export function px(id: number, w = 800, h?: number): string {
  const base = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
  return h ? `${base}&h=${h}&fit=crop` : base;
}
