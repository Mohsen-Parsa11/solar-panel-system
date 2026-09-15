import Image from 'next/image';

const thumbnailStyles: Record<string, string> = {
  panel: 'from-[#f8d9a5] via-[#204967] to-[#081522]',
  panelWarm: 'from-[#ffcf83] via-[#234d67] to-[#142031]',
  battery: 'from-[#edf6f9] via-[#78909a] to-[#1c3038]',
  inverter: 'from-[#edf6f4] via-[#aebcc4] to-[#506b73]',
  batteryDark: 'from-[#253641] via-[#0d1720] to-black',
};

export function ProductThumbnail({ imageUrl, type }: { imageUrl?: string; type: string }) {
  if (imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http'))) {
    return (
      <Image
        width={100}
        height={100}
        src={imageUrl}
        alt="Product"
        className="size-14 shrink-0 rounded-lg object-cover"
      />
    );
  }

  return (
    <div className={`relative size-14 overflow-hidden rounded-lg bg-linear-to-br ${thumbnailStyles[type] ?? thumbnailStyles.panel}`}>
      <div className="absolute -inset-x-3 top-4 h-px rotate-[-17deg] bg-white/60" />
      <div className="absolute -inset-x-2 top-7 h-px rotate-[-17deg] bg-white/30" />
      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-black/15" />
      {type.includes('battery') && <div className="absolute inset-3 rounded-sm border border-white/35 bg-white/20 shadow-inner" />}
      {type === 'inverter' && <div className="absolute inset-x-3 top-2 bottom-2 rounded border border-[#dce7ea] bg-white/65 shadow-inner" />}
    </div>
  );
}
