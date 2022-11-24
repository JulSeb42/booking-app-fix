/*=============================================== App ===============================================*/

import React, { useContext, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeContext, ThemeProvider, ComponentProps } from "tsx-library-julseb"
import { uuid } from "./utils"

import ProtectedRoute from "./routes/ProtectedRoute"
import AnonRoute from "./routes/AnonRoute"

import routes from "./routes/routes"
import redirects from "./routes/redirects"

const App = () => {
    const [edited, setEdited] = useState(false)
    const { theme } = useContext(
        ThemeContext
    ) as ComponentProps.ThemeContextProps

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                {routes.map(route => (
                    <Route
                        path={route.path}
                        element={
                            route.protected ? (
                                <ProtectedRoute>
                                    <route.element
                                        edited={route.edit && edited}
                                        setEdited={route.edit && setEdited}
                                    />
                                </ProtectedRoute>
                            ) : route.anon ? (
                                <AnonRoute>
                                    <route.element
                                        edited={route.edit && edited}
                                        setEdited={route.edit && setEdited}
                                    />
                                </AnonRoute>
                            ) : (
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            )
                        }
                        key={uuid()}
                    />
                ))}

                {redirects.length > 0 &&
                    redirects.map(route => (
                        <Route
                            path={route.path}
                            element={<Navigate to={route.to} />}
                            key={uuid()}
                        />
                    ))}
            </Routes>
        </ThemeProvider>
    )
}

export default App
