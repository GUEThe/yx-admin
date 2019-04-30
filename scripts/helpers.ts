import { exec } from 'child_process';

export function sh(cmd: string) {
  exec(cmd, (err: any, stdout: string, stderr: string) => {
    if (err) {
      console.error('Failed to execute cmd:', cmd, ' error:', err);
      return;
    }
    if (stdout) {
      console.info(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
  });
}

export function camelizeWord(word: string) {
  return word[0].toUpperCase() + word.substring(1);
}

export function snakelizeWord(word: string) {
  return word[0].toLowerCase() + word.substring(1);
}

export function snakelizeName(...parts: string[]) {
  if (parts.length === 1) {
    return parts[0];
  }
  for (let i = 1; i < parts.length; i++) {
    parts[i] = camelizeWord(parts[i]);
  }
  return parts.join('');
}

export function camelizeName(...parts: string[]) {
  for (let i = 0; i < parts.length; i++) {
    parts[i] = camelizeWord(parts[i]);
  }
  return parts.join('');
}

export function camelizePath(path: string) {
  const parts = path.split('/').filter(p => p.length > 1 && p[0] !== '{');
  return camelizeName(...parts);
}
