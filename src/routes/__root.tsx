import { Outlet, createRootRoute } from "@tanstack/react-router"
import { RegistryProvider } from "@effect-atom/atom-react"

import "../styles.css"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <RegistryProvider>
      <Outlet />
    </RegistryProvider>
  )
}
