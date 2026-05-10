import Image from 'next/image';
import type { Hobby } from '@/lib/content/hobbies';

type Props = { hobby: Hobby; size?: 'tall' | 'wide' | 'square' };

const ASPECTS = { tall: 'aspect-[4/5]', wide: 'aspect-[16/10]', square: 'aspect-square' };

export function HobbyCard({ hobby, size = 'tall' }: Props) {
  return (
    <article className="group h-full">
      <div className={`relative ${ASPECTS[size]} rounded-2xl overflow-hidden bg-bg-elev`}>
        <Image src={hobby.image} alt={hobby.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/60 via-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-ink-inverse">
          <h3 className="font-display font-bold text-xl">{hobby.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-muted leading-relaxed">{hobby.description}</p>
    </article>
  );
}
