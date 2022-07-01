# Simba CLI
This tool is a simple dev tool for easily repetitive tasks that can commonly be achieved by running the right commands from the CLI.

## Available commands
> simba --version

### Generate Schematics
> Usage: simba generate <schematic> <name> [options]
> 
> Generate alias: `g`
> 
> Schematic example, `widget`, etc

Options: 
1. --stateful (alias: --st): used to create a stateful schematic in the case of flutter's widget
2. --hooks (alias --hks): used to add lifecycle hooks to generated schematic

### Switch v4Work environment
Used to switch between production and dev invironment. Run the command in the root of v4work directory.
> Usage: simba env v4work --prod
