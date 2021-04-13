# EpiBot

-   **Repository name:** EpiBot
-   **Language:** JavaScript

![alt text](https://media.discordapp.net/attachments/823976864245612555/831271562295509072/unknown.png)

## Requirement:

- Discord
- Discord Server
- Discord Developper APP [BOT]: https://discord.com/developers/applications

## How to install

### Step 1 : Clone the repository

```
~/> git clone https://github.com/Naikyz/EpiBot.git
```

### Step 2 : Create your Discord developper account & create your own Bot

- LINK: https://discord.com/developers/applications

- Click on "New Application", enter a name & click on create

### Step 3 : Create a file named "config.json" at the root of the repository

- Get your token in the "BOT" section of your Discord developer application

- Fill the file config.json with :
```
{
    "prefix":"[ENTER A PREFIX LIKE : "!" or "$" or "-"]",
    "token":"[YOUR TOKEN]",
    "perm":"[Name of the role that can execute the bot]"
}
```