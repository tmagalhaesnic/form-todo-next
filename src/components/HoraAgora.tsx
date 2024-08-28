// import React from "react"

// const HoraAgora: React.FC<{ titulo: string }> = ({ titulo }) => {
//     const [horaAgora, setHoraAgora] = React.useState(new Date())

//     React.useEffect(() => {
//         const intervalId = setInterval(() => {
//             setHoraAgora(new Date())
//             console.log('hora atualizada')
//         }, 1000)

//         return () => clearInterval(intervalId)
//     })
//     React.useEffect(
//         () => setHoraAgora(new Date()),
//         [titulo]
//     )

//     return null
//     return <h1> Agora o titulo é '{titulo}' para hora {horaAgora.toString()}</h1>

// }

// export default HoraAgora