import { ButtonStyle, Client } from "discord.js";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";
function shuffle(array) {
    let currentIndex = array.length;
  
  
    while (currentIndex != 0) {
  
   
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
   
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
async function ReturnShapesC(client: Client, guildid: string) {
    const row1 = new ActionRowBuilder<ButtonBuilder>()
    const row2 = new ActionRowBuilder<ButtonBuilder>()
    const row3 = new ActionRowBuilder<ButtonBuilder>()
    const lang = await client.langdata.get(guildid);
    
    var shapes = client.shapes[lang].shapes
    await shuffle(shapes);
    const Arr = []
    
    for (let i = 0; i < shapes.length; i++) {
        const element = shapes[i];
        if (i <= 2) {
            row1.addComponents(
                new ButtonBuilder()
                    .setEmoji(element.emoji)
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId(`captchashape_${element.emoji}`)
            )

        }
        else if (i <= 5 && i > 2) {
       
            row2.addComponents(
                new ButtonBuilder()
                    .setEmoji(element.emoji)
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId(`captchashape_${element.emoji}`)
            )
        } else {
        
            row3.addComponents(
                new ButtonBuilder()
                    .setEmoji(element.emoji)
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId(`captchashape_${element.emoji}`)
            )
        }
      

    }

    Arr.push(row1,row2,row3)
   
    return Arr;
}

export default { ReturnShapesC }