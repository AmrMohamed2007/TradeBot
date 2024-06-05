import { Client, CommandInteraction, User, ApplicationCommandType, ApplicationCommandOptionType, AttachmentBuilder } from "discord.js";
import canvass, { registerFont } from "canvas"

const terra = {
    name: "card",
    description: "show your book of terra",
    type: ApplicationCommandType.ChatInput,
    cooldown: 10000,
    databaseActions: ["blacklist", "scummer"],
    botPerms: ["AddReactions", "SendMessages"],
    options: [
        {
            name: "view",
            description: "show your card data",
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: "create",
            description: "create your card data",
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: "balance",
            description: "show your card balance",
            type: ApplicationCommandOptionType.Subcommand,

        },
        {
            name: "transfer",
            description: "transfer from card to another card",
            type: ApplicationCommandOptionType.Subcommand,
            options:[
                {name:"yourcvv",description:"type your cvv",required:true,type:10},
                {name:"cardnumber",description:"type card number for seller",required:true,type:10},
                {name:"amount",description:"amount of transfer",required:true,type:10}

            ],

        },
    ],
    run: async (client: Client, interaction: any, langdata: any) => {
        const Subcommand = interaction.options.getSubcommand()

        if (Subcommand == "view") {
            await interaction.deferReply({ephemeral:true})
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then(async (res) => {
                if (!res.card.cardNumber)
                    return await interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true })


                
                await interaction.followUp({ content: undefined, files: [(await LoadCard({first:res.firstname,last:res.lastname,CardNumber:res.card.cardNumber,cvv:res.card.cvv})).attachment] })
            }).catch(async (err) => {
                console.log(err);
                await interaction.followUp({ content: langdata.captcha.errornoacc })
            })

        }
        if(Subcommand == "balance") {
            await interaction.deferReply({ephemeral:true})
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then(async (res) => {
                if (!res.card.cardNumber)
                    return await interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true })


                
                await interaction.followUp({ content: `**${langdata.card.balance.replace("[amount]",`${res.card.coins}`).replace("[emoji]",client.config.emojis.atm)}**` })
            }).catch(async (err) => {
                console.log(err);
                await interaction.followUp({ content: langdata.captcha.errornoacc })
            })
        }

        if(Subcommand == "transfer") {
            const count = interaction.options.getNumber("amount").toFixed(1)

            const yourcvv = interaction.options.getNumber("yourcvv")
            const cardnumber = interaction.options.getNumber("cardnumber")
            await interaction.deferReply({ephemeral:true})
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then(async (res) => {
                if (!res.card.cardNumber)
                    return await interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true })
                if(res.card.cvv !== yourcvv) {
                    return await interaction.followUp({content:`${client.config.emojis.false} ${langdata.card.cvverror}`})
                } 
                if(res.card.coins < count) {
                    return await interaction.followUp({content:`${client.config.emojis.false} ${langdata.card.coinserror}`})
                }
               
               
                    client.functions.get.GetUser(client.schema,{
                    status:"one",
                    key:"card.cardNumber",
                    value:cardnumber
                }).then(async (ress) => {
                    ress.card.coins = ress.card.coins + count;
                    res.card.coins = res.card.coins - count
                    await ress.save();
                    await res.save();
                    await interaction.followUp({content:`${client.config.emojis.true} ${langdata.card.donetransfer}`})
                }).catch(async (err) => {
                    await interaction.followUp({content:`**${client.config.emojis.false} ${langdata.card.userdoesnthave} or ${langdata.card.cardnumbererror}**`})
                })


                
            }).catch(async (err) => {
                console.log(err);
                await interaction.followUp({ content: langdata.captcha.errornoacc })
            })
        }
        if (Subcommand == "create") {
            await interaction.deferReply({ephemeral:true})
            const CardNumber = interaction.user.id.slice(0, 4).concat(await client.public.generateRandomGmail(8));
            const cvv = await client.public.generateRandomGmail(3);
     

            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then(async (res) => {
                if (!res.verified || !res)
                    return await interaction.followUp({ content: langdata.captcha.errornoacc, ephemeral: true })

                if (res.card.cardNumber)
                    return await interaction.followUp({ content: langdata.card.errorhavecard, ephemeral: true })

                res.card.cardNumber = CardNumber;
                res.card.cvv = cvv;
                res.card.coins = 0;
                await res.save();
                await interaction.followUp({ content:langdata.card.donecard,files:[(await LoadCard({first:res.firstname,last:res.lastname,CardNumber,cvv})).attachment]})

            }).catch(async (err) => {
                console.log(err);
                
                return await interaction.followUp({ content: langdata.captcha.errornoacc, ephemeral: true })

            })


        }


    }
}

export default terra;

async function LoadCard(data) {
    const imagePath = `${process.cwd()}/dist/assets/images/card.png`;
    const fontPath = `${process.cwd()}/dist/assets/fonts/digital.ttf`;
    const fontPathPp = `${process.cwd()}/dist/assets/fonts/poppins.extralight.ttf`;
    const { createCanvas, loadImage } = canvass
    const canvas = createCanvas(349.92, 221.51)
    const ctx = canvas.getContext('2d')
    const number = data.CardNumber.split("").join(" ")
    const cvv = data.cvv.split("").join(" ")
    const firstname = data.first
    const lastname = ` ${data.last}`

    const image = await loadImage(imagePath);

    await ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    await registerFont(fontPath, { family: 'digital' });
    await registerFont(fontPathPp, { family: 'Poppins' });

    // Card Number
    ctx.font = `25px digital`
    ctx.fillStyle = `#ffffff`
    ctx.fillText(number, 55, 99)
    // End

    // Holder Name
    ctx.font = `12px Poppins`
    ctx.fillStyle = `#ffffff`
    ctx.fillText(firstname.concat(lastname), 30, 180, 90)
    // End

    // CVV
    ctx.font = `12px digital`
    ctx.fillStyle = `#ffffff`
    ctx.fillText(cvv, 295, 185)



    await ctx.save();

    const Card = new AttachmentBuilder(canvas.toBuffer(), { "name": "Card" })
    return Card;
}
