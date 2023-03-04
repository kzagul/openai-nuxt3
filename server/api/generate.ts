import { Configuration, OpenAIApi } from "openai"

const config = useRuntimeConfig()

const configuration = new Configuration({
    apiKey: config.public.openaiApiKey,
})

const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {

  const { animal } = await readBody(event)

  let answer: string = ''

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    })

    answer = String(completion.data.choices[0].text)

  } catch(error) {
    console.log(error)
  }

  return {
    text: answer
  }
})

function generatePrompt(animal: any) {
  const capitalizedAnimal =
    animal[0] + animal.slice(1)
  return `Suggest three names for an animal that is a superhero.
    Animal: Cat
    Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    Animal: Dog
    Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    Animal: ${capitalizedAnimal}
    Names:`;
}
