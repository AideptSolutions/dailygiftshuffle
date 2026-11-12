// data/prices.generated.json is written by scripts/pull-prices.mjs before every
// build and dev start and is gitignored, so a fresh checkout does not have it
// until then. This declaration keeps the type checker working either way.
declare module '@/data/prices.generated.json' {
  const value: {
    pulledAt: string | null;
    prices: Record<string, [number, string]>;
  };
  export default value;
}
