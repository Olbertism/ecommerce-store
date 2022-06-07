import fs from 'node:fs';
import path from 'node:path';

export function getAvailableImages() {
  const dirRelativeToPublicFolder = 'img';

  const dir = path.resolve('./public');
  const filenames = fs.readdirSync(dir);

  const images = filenames.map((name) =>
    path.join('/', dirRelativeToPublicFolder, name),
  );

  return images;
}
