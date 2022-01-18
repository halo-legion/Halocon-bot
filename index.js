const Discord = require('discord.js');
const { Intents } = require('discord.js');
const { Permissions } = require('discord.js');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const snekfetch = require('snekfetch');
const {
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
    r1,
    r2,
    r3,
    r4,
    r5,
    r6,
    r1e,
    r2e,
    r3e,
    r4e,
    r5e,
    r6e
} = require("./config.json");
dotenv.config();
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    const guildId = '924177932056952852';
    const guild = client.guilds.cache.get(guildId);
    let commands
    if (guild) {
        commands = guild.commands;
    }
    else {
        commands = client.application?.commands;
    }
    commands?.create({
        name: 'ping',
        description: 'Sends the ping of the bot',
    })

    commands?.create({
        name: 'avatar',
        description: 'Gives the avatar of the user mentioned.',
        options: [
            {
                name: 'user',
                description: 'The user to get the avatar of.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            }
        ]
    });
    commands?.create({
        name: 'github',
        description: 'fetches the github repository of the user specified by the member.',
        options: [
            {
                name: 'user',
                description: 'provide the username of the owner of the repo',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            },
            {
                name: 'repo',
                description: 'provide the name of the repo',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    });
    commands?.create({
        name: 'cat',
        description: 'Sends image of a random cat.',
    })
    commands?.create({
        name: 'dog',
        description: 'Sends image of a random dog.',
    })
    commands?.create({
        name: 'kick',
        description: 'This command could be used by the server moderator to kick a user.',
        defaultPermission: false,
        options: [
            {
                name: 'user',
                description: 'mention the user you want to kick. ',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            },
            {
                name: 'reason',
                description: 'provide the reason for kicking the user',
                required: false,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ],
    });
    commands?.create({
        name: 'ban',
        description: 'This command could be used by the server moderator to ban a user.',
        defaultPermission: false,
        options: [
            {
                name: 'user',
                description: 'mention the user you want to kick. ',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            },
            {
                name: 'reason',
                description: 'provide the reason for kicking the user',
                required: false,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ],
    });
    commands?.create({
        name: 'purge',
        description: 'This command could be used by the server moderator to delete messages in a channel. ',
        options: [
            {
                name: 'amount',
                description: 'number of messages you want to delete. ',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.INTEGER
            }
        ]
    });
    commands?.create({
        name: 'mute',
        description: 'This command could be used by the server moderator to mute a user.',
        options: [
            {
                name: 'user',
                description: 'mention the user you want to mute. ',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            },
            {
                name: 'reason',
                description: 'provide the reason for muting the user',
                required: false,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ],
    });
    commands?.create({
        name: 'unmute',
        description: 'This command could be used by the server moderator to unmute a user.',
        options: [
            {
                name: 'user',
                description: 'mention the user you want to unmute. ',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.USER
            },
            {
                name: 'reason',
                description: 'provide the reason for unmuting the user',
                required: false,
                type: Discord.Constants.ApplicationCommandOptionTypes.STRING
            }
        ],
    });
    commands?.create({
        name: 'lock',
        description: 'This command could be used by the server moderator to lock the channel.',
        defaultPermission: false,
        defaultPermissions: [
            {
                id: 924177932056952852,
                allow: Permissions.FLAGS.MANAGE_CHANNELS,
                deny: Permissions.FLAGS.SEND_MESSAGES
            }
        ],
        options: [
            {
                name: 'channel',
                description: 'mention the channel you want to lock. ',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.CHANNEL
            }
        ],
    });
});
client.on("messageCreate", async (message) => {
    if (message.content == `.send`) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            message.channel.send(":X: | Admin Perms needed to execute this command");
        }
        if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const rw = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("r1")
                    .setLabel("Code")
                    .setStyle("PRIMARY")
                    .setEmoji(r1e),
                new MessageButton()
                    .setCustomId("r2")
                    .setLabel("Design")
                    .setStyle("PRIMARY")
                    .setEmoji(r2e),
                new MessageButton()
                    .setCustomId("r3")
                    .setLabel("Gaming")
                    .setStyle("PRIMARY")
                    .setEmoji(r3e),
                new MessageButton()
                    .setCustomId("r4")
                    .setLabel("Group Discussion")
                    .setStyle("PRIMARY")
                    .setEmoji(r4e),
                new MessageButton()
                    .setCustomId("r6")
                    .setLabel("Quiz")
                    .setStyle("PRIMARY")
                    .setEmoji(r6e)  
            );
            message.channel.send({ content: "Hi @everyone ,\n Please take your roles by clicking on the corresponding buttons below to get access in your respective events' channels.",components: [rw] });
        }
    }
});
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const { commandName, options } = interaction
        if (commandName === 'ping') {
            interaction.reply({
                content: `\nMy Latency: ` + "`" + `${client.ws.ping}ms` + "`",
                ephemeral: true,
            })
        }
        // avatar command
        if (commandName === 'avatar') {
            const user = options.getUser(`user`);
            const embed = new Discord.MessageEmbed({
                title: `${user.username}'s Avatar`,
                url: user.displayAvatarURL(),
                image: {
                    url: user.avatarURL()
                }
            });
            interaction.reply({
                ephemeral: true,
                embeds: [embed]
            })
        }
        // github commmand
        if (commandName === 'github') {
            try {
                const user = options.getString(`user`);
                const repo = options.getString(`repo`);
                const url = `https://api.github.com/repos/${user}/${repo}`
                const response = await fetch(url)
                const json = await response.json()
                const embed = new Discord.MessageEmbed({
                    title: `${json.full_name}`,
                    url: json.html_url,
                    description: `${json.description}`,
                    fields: [
                        {
                            name: `Stars`,
                            value: `${json.stargazers_count}`,
                            inline: true
                        },
                        {
                            name: `Watchers`,
                            value: `${json.watchers_count}`,
                            inline: true
                        },
                        {
                            name: `Forks`,
                            value: `${json.forks_count}`,
                            inline: true
                        }
                    ],
                    image: {
                        url: json.owner.avatar_url
                    }
                });
                interaction.reply({
                    ephemeral: true,
                    embeds: [embed]
                })
            } catch (e) {
                interaction.reply({
                    content: `\nInvalid Repo`,
                    ephemeral: true,
                })
                console.log(e)
            }
        }
        // cat command
        if (commandName === 'cat') {
            const url = `https://aws.random.cat/meow`
            const response = await fetch(url)
            const json = await response.json()
            const embed = new Discord.MessageEmbed({
                title: `Cat`,
                url: json.file,
                image: {
                    url: json.file
                }
            });
            interaction.reply({
                ephemeral: true,
                embeds: [embed]
            })
        }
        // dog command
        if (commandName === 'dog') {
            const url = `https://dog.ceo/api/breeds/image/random`
            const response = await fetch(url)
            const json = await response.json()
            const embed = new Discord.MessageEmbed({
                title: `Dog`,
                url: json.message,
                image: {
                    url: json.message
                }
            });
            interaction.reply({
                ephemeral: true,
                embeds: [embed]
            })
        }
        // kick command
        if (commandName == 'kick') {
            const guild = client.guilds.cache.get('924177932056952852');
            const user = options.getUser(`user`);
            const reason = options.getString(`reason`) || 'No reason provided.';
            const kickmember = guild.members.cache.get(user.id);
            const member = interaction.member
            const kicker = member.user
            const god = guild.members.cache.get('603494600858140673');
            if (member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
                if (!kickmember.kickable) {
                    interaction.reply({
                        content: `\nI can't kick this user.`,
                        ephemeral: true,
                    })
                    god.send(`notkickable ${kicker} tried ${kickmember} but I couldn't kick them and gave the reason ${reason} `)
                } else {
                    embed = new Discord.MessageEmbed({
                        title: `You have been kicked by ${kicker.username} from Halolegion's offical server. `,
                        description: `Reason: ${reason}`,
                    })
                    await user.send({
                        embeds: [embed]
                    })
                    kickmember.kick([`${reason}`])
                    interaction.reply({
                        content: `\n${user.username} has been kicked.`,
                        ephemeral: true,
                    })
                    god.send(`${kicker} kicked ${kickmember} and gave the reason ${reason}`)
                }
            } else {
                interaction.reply({
                    content: `\nYou don't have permission to kick users.`,
                    ephemeral: true,
                })
                god.send(`${kicker} tried to kick ${kickmember} but I couldn't kick them and gave the reason ${reason}`)
            }
        }
        // ban command
        if (commandName == 'ban') {
            const guild = client.guilds.cache.get('924177932056952852');
            const user = options.getUser(`user`);
            const reason = options.getString(`reason`) || 'No reason provided.';
            const banmember = guild.members.cache.get(user.id);
            const member = interaction.member
            const baner = member.user
            const god = guild.members.cache.get('603494600858140673');
            if (member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                if (!banmember.kickable) {
                    interaction.reply({
                        content: `\nI can't ban this user.`,
                        ephemeral: true,
                    })
                    god.send(`notbanable ${baner} tried ${banmember} but I couldn't ban them and gave the reason ${reason} `)
                } else {
                    embed = new Discord.MessageEmbed({
                        title: `You have been banned by ${baner.username} from Halolegion's offical server. `,
                        description: `Reason: ${reason}`,
                    })
                    await user.send({
                        embeds: [embed]
                    })
                    banmember.ban([`${reason}`])
                    interaction.reply({
                        content: `\n${user.username} has been banned.`,
                        ephemeral: true,
                    })
                    god.send(`${baner} banned ${banmember} and gave the reason ${reason}`)
                }
            } else {
                interaction.reply({
                    content: `\nYou don't have permission to ban users. `,
                    ephemeral: true,
                })
                god.send(`${baner} tried to ban ${banmember} but I couldn't ban them and gave the reason ${reason}`)
            }
        }
        // purge command
        if (commandName == 'purge') {
            const guild = client.guilds.cache.get('924177932056952852');
            const member = interaction.member
            const purger = member.user
            const god = guild.members.cache.get('603494600858140673');
            if (member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                const amount = options.getInteger(`amount`) || 1;
                const messages = await interaction.channel.messages.fetch({ limit: amount });
                await interaction.channel.bulkDelete(messages);
                interaction.reply({
                    content: `\n${amount} messages have been deleted.`,
                    ephemeral: true,
                })
                god.send(`${purger} deleted ${amount} messages`)
            } else {
                interaction.reply({
                    content: `\nYou don't have permission to delete messages.`,
                    ephemeral: true,
                })
                god.send(`${purger} tried to delete messages but I couldn't delete them`)
            }
        }
        // mute command
        if (commandName == 'mute') {
            const guild = client.guilds.cache.get('924177932056952852');
            const user = options.getUser(`user`);
            const reason = options.getString(`reason`) || 'No reason provided.';
            const muteMember = guild.members.cache.get(user.id);
            const member = interaction.member
            const muter = member.user
            const god = guild.members.cache.get('603494600858140673');
            if (member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                const muteRole = guild.roles.cache.find(role => role.name === 'Muted');
                if (muteMember.roles.cache.has(muteRole.id)) {
                    interaction.reply({
                        content: `\nThis user is already muted.`,
                        ephemeral: true,
                    })
                    god.send(`${muter} tried to mute ${muteMember} but I couldn't mute them and gave the reason ${reason} `)
                } else {
                    await muteMember.roles.add(muteRole);
                    const embed = new Discord.MessageEmbed({
                        title: `You have been muted by ${muter.username} from Halolegion's offical server. `,
                        description: `Reason: ${reason}`,
                    })
                    await user.send({
                        embeds: [embed]
                    })
                    interaction.reply({
                        content: `\n${user.username} has been muted.`,
                        ephemeral: true,
                    })
                    god.send(`${muter} muted ${muteMember} and gave the reason ${reason}`)
                }
            } else {
                interaction.reply({
                    content: `\nYou don't have permission to mute users.`,
                    ephemeral: true,
                })
                god.send(`${muter} tried to mute ${muteMember} but I couldn't mute them and gave the reason ${reason}`)
            }
        }
        // unmute command
        if (commandName == 'unmute') {
            const guild = client.guilds.cache.get('924177932056952852');
            const user = options.getUser(`user`);
            const reason = options.getString(`reason`) || 'No reason provided.';
            const unmuteMember = guild.members.cache.get(user.id);
            const member = interaction.member
            const unmuter = member.user
            const god = guild.members.cache.get('603494600858140673');
            if (member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                const muteRole = guild.roles.cache.find(role => role.name === 'Muted');
                if (!unmuteMember.roles.cache.has(muteRole.id)) {
                    interaction.reply({
                        content: `\nThis user is not muted.`,
                        ephemeral: true,
                    })
                    god.send(`${unmuter} tried to unmute ${unmuteMember} but I couldn't unmute them and gave the reason ${reason} `)
                } else {
                    await unmuteMember.roles.remove(muteRole);
                    const embed = new Discord.MessageEmbed({
                        title: `You have been unmuted by ${unmuter.username} from Halolegion's offical server. `,
                        description: `Reason: ${reason}`,
                    })
                    await user.send({
                        embeds: [embed]
                    })
                    interaction.reply({
                        content: `\n${user.username} has been unmuted.`,
                        ephemeral: true,
                    })
                    god.send(`${unmuter} unmuted ${unmuteMember} and gave the reason ${reason}`)
                }
            } else {
                interaction.reply({
                    content: `\nYou don't have permission to unmute users.`,
                    ephemeral: true,
                })
                god.send(`${unmuter} tried to unmute ${unmuteMember} but I couldn't unmute them and gave the reason ${reason}`)
            }
        }
        // lock command
        if (commandName == 'lock') {
            const guild = client.guilds.cache.get('924177932056952852');
            const member = interaction.member
            const locker = member.user
            const god = guild.members.cache.get('603494600858140673');
            const channel = options.getChannel(`channel`);
            if (member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
                if (channel.type === 'text') {
                    await channel.updateOverwrite(guild.roles.everyone, {
                        SEND_MESSAGES: false,
                    });
                    interaction.reply({
                        content: `\n${channel.name} has been locked.`,
                        ephemeral: true,
                    })
                    god.send(`${locker} locked ${channel.name}`)
                } else {
                    interaction.reply({
                        content: `\nThis channel is not a text channel.`,
                        ephemeral: true,
                    })
                }
            } else {
                interaction.reply({
                    content: `\nYou don't have permission to lock channels.`,
                    ephemeral: true,
                })
                god.send(`${locker} tried to lock ${channel} but I couldn't lock it`)
            }
        }
    } else if (interaction.isButton()) {
        if (interaction.customId == "r1") {
            if (interaction.member.roles.cache.some((role) => role.id == r1)) {
                interaction.reply({
                    content: `The role <@&${r1}> was removed from you`,
                    ephemeral: true,
                });
                interaction.member.roles.remove(r1);
            } else {
                interaction.member.roles.add(r1);
                await interaction.reply({
                    content: `The role <@&${r1}> was added to you`,
                    ephemeral: true,
                });
            }
        } else if (interaction.customId == "r2") {
            if (interaction.member.roles.cache.some((role) => role.id == r2)) {
                interaction.reply({
                    content: `The role <@&${r2}> was removed from you!`,
                    ephemeral: true,
                });
                interaction.member.roles.remove(r2);
            } else {
                interaction.member.roles.add(r2);
                await interaction.reply({
                    content: `The role <@&${r2}> was added to you!`,
                    ephemeral: true,
                });
            }
        } else if (interaction.customId == "r3") {
            if (interaction.member.roles.cache.some((role) => role.id == r3)) {
                interaction.reply({
                    content: `The role <@&${r3}> was removed from you!`,
                    ephemeral: true,
                });
                interaction.member.roles.remove(r3);
            } else {
                interaction.member.roles.add(r3);
                await interaction.reply({
                    content: `The role <@&${r3}> was added to you!`,
                    ephemeral: true,
                });
            }
        } else if (interaction.customId == "r4") {
            if (interaction.member.roles.cache.some((role) => role.id == r4)) {
                interaction.reply({
                    content: `The role <@&${r4}> was removed from you!`,
                    ephemeral: true,
                });
                interaction.member.roles.remove(r4);
            } else {
                interaction.member.roles.add(r4);
                await interaction.reply({
                    content: `The role <@&${r4}> was added to you!`,
                    ephemeral: true,
                });
            }
        } else if (interaction.customId == "r5") {
            if (interaction.member.roles.cache.some((role) => role.id == r5)) {
                interaction.reply({
                    content: `The role <@&${r5}> was removed from you!`,
                    ephemeral: true,
                });
                interaction.member.roles.remove(r5);
            } else {
                interaction.member.roles.add(r5);
                await interaction.reply({
                    content: `The role <@&${r5}> was added to you!`,
                    ephemeral: true,
                });
            }
        } else if (interaction.customId == "r6") {
            if (interaction.member.roles.cache.some((role) => role.id == r6)) {
                interaction.reply({
                    content: `The role <@&${r6}> was removed from you!`,
                    ephemeral: true,
                });     
                interaction.member.roles.remove(r6);
            } else {
                interaction.member.roles.add(r6);
                await interaction.reply({
                    content: `The role <@&${r6}> was added to you!`,
                    ephemeral: true,
                });
            }
        }

    }
})
client.login(process.env.TOKEN);