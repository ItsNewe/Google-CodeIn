import telegram
from telegram.ext import CommandHandler, Updater
import logging
import json
import requests

updater = Updater(token='This isn\'t a real token')
dispatcher = updater.dispatcher
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)


def getstars(bot, update):
    try:
        q = requests.get('https://api.github.com/orgs/JBossOutreach/repos')
        j = q.json()

        a = 0

        for e in j:
            stargazers = []
            name = j[a]['name']
            stars = j[a]['stargazers_count']
            s = requests.get(
                'https://api.github.com/repos/JBossOutreach/{}/stargazers'.format(name))
            sj = s.json()
            b = 0
            for f in sj:
                stargazers.append(sj[b]['login'])
                b += 1

            bot.send_message(chat_id=update.message.chat_id, text="**__[{0}](https://github.com/JBossOutreach/{0})__**\n**Stargazers:** {1}\n{2}".format(
                name, stars, ',\n'.join(stargazers)), parse_mode=telegram.ParseMode.MARKDOWN)
            a += 1

    except(Exception) as e:
        print(e)

stars_handler = CommandHandler('getstars', getstars)
dispatcher.add_handler(stars_handler)

updater.start_polling()
