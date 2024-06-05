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
    ],
    run: async (client: Client, interaction: any, langdata: any) => {
        const Subcommand = interaction.options.getSubcommand()

        if (Subcommand == "view") {
            await interaction.deferReply()
            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then(async (res) => {


                const imagePath = `${process.cwd()}/dist/assets/images/card.png`;
                const fontPath = `${process.cwd()}/dist/assets/fonts/digital.ttf`;
                const fontPathP = `${process.cwd()}/dist/assets/fonts/Poppins.ttf`;
                const fontPathPp = `${process.cwd()}/dist/assets/fonts/poppins.extralight.ttf`;
                const { createCanvas, loadImage } = canvass
                const canvas = createCanvas(349.92, 221.51)
                const ctx = canvas.getContext('2d')
                const number = `123456789123`.split("").join(" ")
                const cvv = `123`
                const firstname = "Sex"
                const lastname = " sad"

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

                await interaction.followUp({ content: undefined, files: [Card.attachment] })
            }).catch(async (err) => {
                console.log(err);
                await interaction.followUp({ content: langdata.captcha.errornoacc })
            })

        }
        if (Subcommand == "create") {
            const CardNumber = interaction.user.id.slice(0, 4).concat(await client.public.generateRandomGmail(8));
            const cvv = await client.public.generateRandomGmail(3);
            console.log(CardNumber, cvv);

            client.functions.get.GetUser(client.schema, {
                status: "one",
                key: "userid",
                value: interaction.user.id
            }).then(async (res) => {
                if (!res.verified || !res)
                    return await interaction.reply({ content: langdata.captcha.errornoacc, ephemeral: true })

                if (res.card.cardNumber)
                    return await interaction.reply({ content: langdata.card.errorhavecard, ephemeral: true })

                res.card.cardNumber = CardNumber;
                res.card.cvv = cvv;
                await res.save();
                await interaction.reply({ content:langdata.card.donecard,files:[(await LoadCard({first:res.firstname,last:res.lastname,CardNumber,cvv})).attachment]})

            }).catch(async (err) => {
                console.log(err);
                
                return await interaction.reply({ content: langdata.captcha.errornoacc, ephemeral: true })

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
    const cvv = data.cvv
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
