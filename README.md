# Instagram Planner
A bot to schedule your posts on Instagram.

## Getting started
Use git to clone the bot.

```bash
git clone https://github.com/JMax45/instagram-planner
```

Install dependencies.
```bash
npm install
```

Set the environment variables (create an .env file or configure them depending on the server type).
```
TOKEN= # Your bot token
IG_USERNAME= # Your Instagram username
IG_PASSWORD= # Your Instagram password
DB_URL= # Your database url
DB_NAME= # Your database name
```

## Usage
Run the bot using ```npm start```.

## Making yourself an admin
The /schedule command has a private access so only the admins can execute it.
To register yourself as an admin write /admin to the bot, it will work only if
there are no other administrators to prevent other people from making themselves an admin.

## Schedule posts
Send ```/schedule``` to the bot.
The rest of the process is guided.

## License
[MIT](https://choosealicense.com/licenses/mit/)