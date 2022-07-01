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

### Switch or update project environment settings
> Usage: simba env <project> --prod --deploy-version=<deploy-version> --version-number=<version>

where:
  1. project = project source locator like v4work, vt-app
  2. deploy-version = the deployment version number used for tracking different deployments within a version
  3. version-number = the new version of the application used for the stores etc
