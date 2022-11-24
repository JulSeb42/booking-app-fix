/*=============================================== Error handling ===============================================*/

const errorHandler = (app: any) => {
    app.use((req: any, res: any, next: any) => {
        res.status(404).json({ errorMessage: "This route does not exist" })
    })

    app.use((err: any, req: any, res: any, next: any) => {
        console.error("ERROR", req.method, req.path, err)

        if (!res.headersSent) {
            res.status(500).json({
                errorMessage: "Internal server error. Check the server console",
            })
        }
    })
}

export default errorHandler
