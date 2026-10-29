const fs = require('fs');
const lines = fs.readFileSync('ThemeProvider.tsx', 'utf8').split('\n');
// Fix line 17: change ("dark") to ("dark")
lines[16] = '  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");';
fs.writeFileSync('ThemeProvider.tsx', lines.join('\n'));
console.log('Fixed line 17');
