const fs = require('fs');
const lines = fs.readFileSync('ThemeProvider.tsx', 'utf8').split('\n');
lines[16] = '  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");';
fs.writeFileSync('ThemeProvider.tsx', lines.join('\n'));
