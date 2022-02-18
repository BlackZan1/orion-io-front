export const helloEmojies = [
    '👾',
    '🧠',
    '✌️',
    '👀',
    '😎'
]

export const randEmoji = () => {
    const randIndex = Math.floor(Math.random() * helloEmojies.length)

    return helloEmojies[randIndex]
}