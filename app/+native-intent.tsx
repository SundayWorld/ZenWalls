// app/+native-intent.tsx

export function redirectSystemPath({
  path,
  initial,
}: {
  path: string;
  initial: boolean;
}) {
  // Always redirect system intents back to app root
  return "/";
}


