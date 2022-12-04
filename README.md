# adaptive-ui-fs
NPM package that let's the user create, delete, manage  components, files, templates in the adaptive ui web master project from interintel technologies 

## Installation
**Step 1** - Clone the repository  <pre>`https://github.com/masterchiefff/adaptive-ui-fs.git`</pre> Like the following:
``` console 
foo@bar:~$ git clone https://github.com/masterchiefff/adaptive-ui-fs.git
```

**Step 2** - Navigate to the projcet.
``` console 
foo@bar:~$ cd adaptive-ui-fs
```

**Step 3** - Run <pre>`npm install`</pre> to install the packages

**Step 4** - After every package has installed run <pre>npm link</pre> in the package folder to create a symlink in the global folder that links to the package where the npm link command was executed.

**Step 4** - You are all set. You can now perfom the usage section. 

Note - You need to be in the adaptive-ui-web root folder to use the package.


## Usage
```console
foo@bar:~$ adaptive-fs <command> [name] [template] [options]
name has been created successfully
```
or

```console
foo@bar:~$ adaptive-fs 
```
and follow the instructions.


## Commands
- **Create-component** - Creates component in the theme of your choice.
- **delete-component** - Deletes component from the theme of your choice.
- **create-template**  - Creates a template.
- **Rename-component** - Renames components name plus the childs file.

## Templates
- **DSV1.0**
- **DSV2.0**
- **Bulkit**

## Options
- **-y, --yes** - Skip all the propts and use default.
- **--help**    - Logs the user guide.
- **-v**        - Logs the current package version.