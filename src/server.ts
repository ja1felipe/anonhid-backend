import app from './app'

app.listen(process.env.PORT || 3333, () => {
  console.log(`server funcionando na porta ${process.env.PORT || 3333}`)
})
