# Universal Dev Script System

This project uses a universal development script system that works across all client projects.

## Files

- **`.devconfig.json`** - Project-specific configuration (ports, domain)
- **`dev.js`** - Universal Node.js script that reads config and starts dev server
- **`package.json`** - Updated to use `node dev.js` instead of hardcoded ports

## How It Works

When you run `npm run dev`, it:
1. Reads `.devconfig.json` to get the correct port
2. Displays project info (name, port, domain)
3. Starts Next.js dev server with the configured port

## Configuration

Edit `.devconfig.json` to change ports or domain:

```json
{
  "projectName": "stelliformdigital",
  "ports": {
    "dev": 3000,
    "prod": 3001
  },
  "domain": "stelliformdigital.com"
}
```

## Port Allocation

Current projects:
- **stelliformdigital**: 3000 (dev), 3001 (prod)
- **plastic-surgery-experts**: 3001 (dev), 3003 (prod)
- Future projects: 3002+, 3004+

## Usage

```bash
# Start dev server (reads config automatically)
npm run dev

# Or run directly
node dev.js
```

## Adding to New Projects

To use this system in a new project:

1. Copy `dev.js` to the new project root
2. Create `.devconfig.json` with project-specific settings:
   ```json
   {
     "projectName": "new-project-name",
     "ports": {
       "dev": 3002,
       "prod": 3005
     },
     "domain": "newproject.com"
   }
   ```
3. Update `package.json`:
   ```json
   "scripts": {
     "dev": "node dev.js"
   }
   ```

That's it! The same `dev.js` script works everywhere.

## Benefits

- **No hardcoded ports** in package.json
- **Single script** works across all projects
- **Clear configuration** - one file shows project setup
- **Easy to extend** - add more config options as needed
- **Consistent behavior** across all client sites
