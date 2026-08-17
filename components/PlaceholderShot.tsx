export default function PlaceholderShot({
  label,
  alt,
}: {
  label: string;
  alt: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="placeholder-block flex aspect-video w-full flex-col items-center justify-center text-center"
    >
      <span className="text-xs uppercase tracking-widest text-muted">
        Screenshot placeholder
      </span>
      <span className="mt-2 max-w-xs px-4 text-sm text-foreground/80">
        {label}
      </span>
    </div>
  );
}
