export default function myImageLoader({ src, width, quality }: any) {
  return `${src}?w=${width}&q=${quality || 75}`;
}
