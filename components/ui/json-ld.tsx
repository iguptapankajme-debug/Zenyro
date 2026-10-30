type Props = { data: Record<string, unknown> | Record<string, unknown>[] };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string; "<" is escaped so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
