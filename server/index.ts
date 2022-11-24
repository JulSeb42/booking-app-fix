/*=============================================== Server ===============================================*/

import app from "./app"

import { PORT } from "./utils/consts"

app.listen(PORT, () => {
    console.log(`🚀 Server listening on port http://localhost:${PORT}`)
})
