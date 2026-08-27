import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-svh flex-col items-center justify-center gap-6 text-center">
      <span className="display text-[clamp(4rem,18vw,10rem)]">404</span>
      <p className="max-w-[36ch] text-[16px] text-white/55">
        That page has been unplugged. Let&apos;s get you back to something that
        works.
      </p>
      <Button as="a" href="/" variant="ghost" tone="onDark">
        Back home
      </Button>
    </Container>
  );
}
