import Image from 'next/image';
import { Container } from '@/components/ui/Container';

export function ProjectGallery({ images, alt }: { images: string[]; alt: string }) {
  if (images.length === 0) return null;
  return (
    <section className="py-16">
      <Container size="wide">
        <div className="grid md:grid-cols-2 gap-4">
          {images.map((src) => (
            <div key={src} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-elev">
              <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
