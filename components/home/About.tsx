import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { SiteContent } from '@/lib/content/site';

export function About({ content }: { content: SiteContent['about'] }) {
  return (
    <section className="py-24 bg-bg-elev">
      <Container size="default">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <ScrollReveal>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src={content.image}
                  alt={content.title}
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
          <div className="md:col-span-7">
            <ScrollReveal delay={0.1}>
              <SectionTitle eyebrow={content.eyebrow}>{content.title}</SectionTitle>
              <p className="mt-6 text-lg text-ink-muted leading-relaxed">{content.body}</p>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
