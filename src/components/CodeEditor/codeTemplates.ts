import type { Language } from './types';

export const codeTemplates: Record<Language, string> = {
  javascript: `// JavaScript Example
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,

  python: `# Python Example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,

  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
};