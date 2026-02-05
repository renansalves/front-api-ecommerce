export function centsStringToBRL(
  centsInput: string | number | null | undefined,
  currency = "BRL",
  locale = "pt-BR"
): string {
  // Se vier null/undefined, mostra traço
  if (centsInput === null || centsInput === undefined) {
    return "—";
  }

  const raw = typeof centsInput === "string" ? centsInput : String(centsInput).trim();

  const isPureInteger = /^-?\d+$/.test(raw);

  if (isPureInteger) {
    const neg = raw.startsWith("-");
    const digits = neg ? raw.slice(1) : raw;

    const padded = digits.padStart(3, "0");
    const integer = padded.slice(0, -2);
    const fractional = padded.slice(-2);
    const decimalStr = `${neg ? "-" : ""}${integer}.${fractional}`;
    const n = Number(decimalStr); // agora é número pequeno com 2 casas
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
  }

  const normalized = raw.replace(",", "."); // tolera vírgula decimal
  const n = Number(normalized);
  if (!Number.isFinite(n)) {
    return "—";
  }
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(n);
}

